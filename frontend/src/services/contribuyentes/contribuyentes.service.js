import axios from "axios";

const urlResource = "http://localhost:4000/api/contribuyentes";

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.Nro_Contribuyente);
  return resp.data;
}

async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.Nro_Contribuyente);
}

async function Grabar(item) {
  if (item.Nro_Contribuyente === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.Nro_Contribuyente, item);
  }
}

export const contribuyentesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
