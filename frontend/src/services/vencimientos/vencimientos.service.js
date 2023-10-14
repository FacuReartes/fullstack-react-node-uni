import axios from "axios";

const urlResource = "http://localhost:4000/api/vencimientos";

async function Buscar(Descripcion, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Descripcion, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.Nro_Cuota);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.Nro_Cuota);
}

async function Grabar(item) {
  if (item.Nro_Cuota === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.Nro_Cuota, item);
  }
}

export const vencimientosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
