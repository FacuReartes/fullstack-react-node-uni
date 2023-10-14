import React, { useState } from "react";
import moment from "moment";
import VencimientosBuscar from "./VencimientosBuscar";
import ListadoVencimientos from "./ListadoVencimientos";
import VencimientosRegistro from "./VencimientosRegistro";
//import { articulosFamiliasMockService as articulosfamiliasService } from "../../services/articulosFamilias-mock-service";
import { vencimientosService } from "../../services/vencimientos/vencimientos.service";
//import { articulosfamiliasService } from "../../services/articulosFamilias.service";
import modalDialogService from "../../services/ModalDialog";

function Vencimientos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Descripcion, setDescripcion] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

//  const [ArticulosFamilias, setArticulosFamilias] = useState(null);
/*
  useEffect(() => {
    async function BuscarArticulosFamilas() {
      let data = await articulosfamiliasService.Buscar();
      setArticulosFamilias(data);
    }
    BuscarArticulosFamilas();
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

    const data = await vencimientosService.Buscar(Descripcion, Activo, _pagina);
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
    const data = await vencimientosService.BuscarPorId(item);
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
      Nro_Cuota: 0,
      Año: null,
      Fecha_1er_vencimiento: null,
      Fecha_2do_vencimiento: null,
      Descripcion: null,
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
            await vencimientosService.ActivarDesactivar(item);
            await Buscar();
            }
        );
  
    }
  

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await vencimientosService.Grabar(item);
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
        Vencimientos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC=== "L" &&<VencimientosBuscar
        Descripcion={Descripcion}
        setDescripcion={setDescripcion}
        Activo={Activo}
        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar}
        />
       }

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && <ListadoVencimientos
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
      {AccionABMC !== "L" && <VencimientosRegistro
        {...{ AccionABMC, Item, Grabar, Volver }}
      />
      }
    </div>
  );
}
export { Vencimientos };
