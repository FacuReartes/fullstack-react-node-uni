import React, { useState } from "react";
import moment from "moment";
import ContribuyentesBuscar from "./ContribuyentesBuscar";
import ListadoContribuyentes from "./ListadoContribuyentes";
import ContribuyentesRegistro from "./ContribuyentesRegistro";
//import { articulosFamiliasMockService as articulosfamiliasService } from "../../services/articulosFamilias-mock-service";
import  {contribuyentesService}  from "../../services/contribuyentes/contribuyentes.service";
//import { articulosfamiliasService } from "../../services/articulosFamilias.service";
import modalDialogService from "../../services/ModalDialog";

function Contribuyentes() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

 // const [ArticulosFamilias, setArticulosFamilias] = useState(null);
/*
  useEffect(() => {
    async function BuscarLocalidades() {
      let data = await articulosfamiliasService.Buscar();
      setArticulosFamilias(data);
    }
    BuscarLocalidades();
  }, []);

*/
  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await contribuyentesService.Buscar(Nombre, Activo, _pagina);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }


  async function BuscarPorId(item, accionABMC) {
    const data = await contribuyentesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
        modalDialogService.Alert("No puede modificarse un registro Inactivo.");
        return;
      }
      BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
    }
  

  function Agregar() {
    setAccionABMC("A");
    setItem({
      Nro_Contribuyente: 0,
      Nombre: null,
      FechaDeAlta: moment(new Date()).format("YYYY-MM-DD"),
      Barrio: null, //Math.random().toString(36).substring(2, Math.floor(Math.random() * 56) + 5),
      CodigoPostal: null,
      Domicilio: null, //Math.random().toString(36).substring(2, Math.floor(Math.random() * 56) + 5),
      Activo: true,
    });
  }



  async function ActivarDesactivar(item) {
        modalDialogService.Confirm(
            "Esta seguro que quiere " +
            (item.Activo ? "desactivar" : "activar") +
            " el registro?",
            undefined,
            undefined,
            undefined,
            async () => {
            await contribuyentesService.ActivarDesactivar(item);
            await Buscar();
            }
        );
  
    }


  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await contribuyentesService.Grabar(item);
    }
    catch (error)
    {
      alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }
  

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Contribuyentes <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC=== "L" &&<ContribuyentesBuscar
        Nombre={Nombre}
        setNombre={setNombre}
        Activo={Activo}
        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar}
        />
       }

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && <ListadoContribuyentes
        {...{
          Items,
          Consultar,
          Modificar,
          ActivarDesactivar,
          Pagina,
          RegistrosTotal,
          Paginas,
          Buscar,
        }}
      />
    }

    {   AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...
      </div>
    }

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && <ContribuyentesRegistro
        {...{ AccionABMC, Item, Grabar, Volver }}
      />
      }
    </div>
  );
}
export {Contribuyentes};