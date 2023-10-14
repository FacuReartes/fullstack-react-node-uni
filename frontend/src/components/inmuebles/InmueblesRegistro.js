import React from "react";
import { useForm } from "react-hook-form";

export default function InmueblesRegistro({
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

          {/* campo Ubicacion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Ubicacion">
              Ubicacion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("Ubicacion", {
                    required: { value: true, message: "Ubicacion es requerido" },
                    minLength: {
                    value: 4,
                    message: "Ubicacion debe tener al menos 4 caracteres",
                    },
                    maxLength: {
                    value: 55,
                    message: "Ubicacion debe tener como máximo 55 caracteres",
                    },
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Ubicacion ? "is-invalid" : "")
                }
            />
            {errors?.Ubicacion && touchedFields.Ubicacion && (
            <div className="invalid-feedback">
                {errors?.Ubicacion?.message}
            </div>
            )}

            </div>
          </div>

          {/* campo Zona */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Zona">
              Zona<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("Zona", {
                    required: { value: true, message: "Zona es requerido" },
                    minLength: {
                    value: 4,
                    message: "Zona debe tener al menos 4 caracteres",
                    },
                    maxLength: {
                    value: 55,
                    message: "Zona debe tener como máximo 55 caracteres",
                    },
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Zona ? "is-invalid" : "")
                }
            />
            {errors?.Zona && touchedFields.Zona && (
            <div className="invalid-feedback">
                {errors?.Zona?.message}
            </div>
            )}

            </div>
          </div>

          {/* campo Tipo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Tipo">
              Tipo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("Tipo", {
                    required: { value: true, message: "Tipo es requerido" },
                    minLength: {
                    value: 4,
                    message: "Tipo debe tener al menos 4 caracteres",
                    },
                    maxLength: {
                    value: 55,
                    message: "Tipo debe tener como máximo 55 caracteres",
                    },
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Tipo ? "is-invalid" : "")
                }
            />
            {errors?.Tipo && touchedFields.Tipo && (
            <div className="invalid-feedback">
                {errors?.Tipo?.message}
            </div>
            )}

            </div>
          </div>
          
          {/* campo Numero_Contribuyente */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Numero_Contribuyente">
              Numero_Contribuyente<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Numero_Contribuyente", {
                  required: { value: true, message: "Numero_Contribuyente es requerido" },
                  min: {
                    value: 0,
                    message: "Numero_Contribuyente debe ser mayor a 0",
                  },
                  max: {
                    value: 99999,
                    message: "Numero_Contribuyente debe ser menor o igual a 999999",
                  },
                })}
                className={
                  "form-control " + (errors?.Numero_Contribuyente ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.Numero_Contribuyente?.message}</div>
            </div>
          </div>

          {/* campo FechaRegCatastro */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaRegCatastro">
              FechaRegCatastro<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaRegCatastro", {
                  required: { value: true, message: "FechaRegCatastro es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaRegCatastro ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaRegCatastro?.message}
              </div>
            </div>
          </div>

          {/* campo Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Activo">
                Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="Activo"
                {...register("Activo", {
                  required: { value: true, message: "Activo es requerido" },
                })}
                className={
                  "form-control" + (errors?.Activo ? " is-invalid" : "")
                }
                disabled
              >
                <option value={null}></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.Activo?.message}</div>
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
