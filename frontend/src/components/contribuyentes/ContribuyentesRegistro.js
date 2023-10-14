import React from "react";
import { useForm } from "react-hook-form";

export default function ContribuyentesRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });
  const onSubmit = (data) => {
    Grabar(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("Nombre", {
                    required: { value: true, message: "Nombre es requerido" },
                    minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
                    },
                    maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                    },
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
            />
            {errors?.Nombre && touchedFields.Nombre && (
            <div className="invalid-feedback">
                {errors?.Nombre?.message}
            </div>
          )}

            </div>
          </div>

          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Barrio">
              Barrio<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("Barrio", {
                    required: { value: true, message: "Barrio es requerido" },
                    minLength: {
                    value: 4,
                    message: "Barrio debe tener al menos 4 caracteres",
                    },
                    maxLength: {
                    value: 55,
                    message: "Barrio debe tener como máximo 55 caracteres",
                    },
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Barrio ? "is-invalid" : "")
                }
            />
            {errors?.Barrio && touchedFields.Barrio && (
            <div className="invalid-feedback">
                {errors?.Barrio?.message}
            </div>
          )}

            </div>
          </div>
          
          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Domicilio">
              Domicilio<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("Domicilio", {
                    required: { value: true, message: "Domicilio es requerido" },
                    minLength: {
                    value: 4,
                    message: "Domicilio debe tener al menos 4 caracteres",
                    },
                    maxLength: {
                    value: 55,
                    message: "Domicilio debe tener como máximo 55 caracteres",
                    },
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Domicilio ? "is-invalid" : "")
                }
            />
            {errors?.Domicilio && touchedFields.Domicilio && (
            <div className="invalid-feedback">
                {errors?.Domicilio?.message}
            </div>
          )}

            </div>
          </div>
          {/* campo Numero_Contribuyente */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="CodigoPostal">
              CodigoPostal<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("CodigoPostal", {
                  required: { value: true, message: "CodigoPostal es requerido" },
                  min: {
                    value: 0,
                    message: "CodigoPostal debe ser mayor a 0",
                  },
                  max: {
                    value: 99999,
                    message: "CodigoPostal debe ser menor o igual a 999999",
                  },
                })}
                className={
                  "form-control " + (errors?.CodigoPostal ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.CodigoPostal?.message}</div>
            </div>
          </div>
          </fieldset>
        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
            <div className="row alert alert-danger mensajesAlert">
                <i className="fa fa-exclamation-sign"></i>
                Revisar los datos ingresados...
            </div>
        )}

      </div>
    </form>
  );
}
