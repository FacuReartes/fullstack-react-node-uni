import React from "react";
import { useForm } from "react-hook-form";

export default function VencimientosRegistro({
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

          {/* campo descripcion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Descripcion">
                Descripcion<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("Descripcion", {
                    required: { value: true, message: "Descripcion es requerida" },
                    minLength: {
                    value: 4,
                    message: "Descripcion debe tener al menos 4 caracteres",
                    },
                    maxLength: {
                    value: 55,
                    message: "Descripcion debe tener como máximo 55 caracteres",
                    },
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Descripcion ? "is-invalid" : "")
                }
            />
            {errors?.Descripcion && touchedFields.Descripcion && (
            <div className="invalid-feedback">
                {errors?.Descripcion?.message}
            </div>
          )}

            </div>
          </div>

          {/* campo Año */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Año">
                Año<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("Año", {
                    required: { value: true, message: "Año es requerida" },
                    minLength: {
                    value: 4,
                    message: "Año debe tener 4 caracteres",
                    },
                    maxLength: {
                    value: 4,
                    message: "Año debe tener 4 caracteres",
                    },
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Año ? "is-invalid" : "")
                }
            />
            {errors?.Año && touchedFields.Año && (
            <div className="invalid-feedback">
                {errors?.Año?.message}
            </div>
          )}

            </div>
          </div>    

          {/* campo 1er Vencimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Fecha_1er_vencimiento">
                1er Vencimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="date"
                {...register("Fecha_1er_vencimiento", {
                    required: { value: true, message: "1er Vencimiento es requerida" },
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Fecha_1er_vencimiento ? "is-invalid" : "")
                }
            />
            {errors?.Fecha_1er_vencimiento && touchedFields.Fecha_1er_vencimiento && (
            <div className="invalid-feedback">
                {errors?.Fecha_1er_vencimiento?.message}
            </div>
          )}

            </div>
          </div>    

          {/* campo 2do Vencimiento */}

          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Fecha_2do_vencimiento">
                2do Vencimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="date"
                {...register("Fecha_2do_vencimiento", {
                    required: { value: true, message: "2do Vencimiento es requerida" }
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Fecha_2do_vencimiento ? "is-invalid" : "")
                }
            />
            {errors?.Fecha_2do_vencimiento && touchedFields.Fecha_2do_vencimiento && (
            <div className="invalid-feedback">
                {errors?.Fecha_2do_vencimiento?.message}
            </div>
          )}

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
