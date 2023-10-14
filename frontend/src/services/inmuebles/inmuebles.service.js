import axios from "axios";

const urlResource = "http://localhost:4000/api/inmuebles";

async function Buscar(Ubicacion,Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: {Ubicacion, Activo,Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.Numero_Catastral);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.Numero_Catastral);
}

async function Grabar(item) {
  if (item.Numero_Catastral === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.Numero_Catastral, item);
  }
}

export const inmueblesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
