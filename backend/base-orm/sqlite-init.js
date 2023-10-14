// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/TPI.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'localidades'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table localidades( 
              CodigoPostal INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre_Localidad text NOT NULL UNIQUE
            , FechaFundacion text NOT NULL 
            , Activo boolean
          );`
    );

    console.log("tabla localidades creada!");
    await db.run(
      `INSERT INTO localidades (Nombre_Localidad, FechaFundacion, Activo)
      VALUES	
      ('Cordoba','02/06/1460',1),
      ('La Calera','15/11/1500',1),
      ('Carlos Paz','19/08/1463',0),
      ('La Falda','30/07/1560',1),
      ('Embalse','24/10/1680',0),
      ('Villa General Belgrano','25/09/1670',0),
      ('Rio Cuarto','04/08/1570',1),
      ('San Francisco','26/03/1620',0),
      ('Río Seco','19/12/1460',1),
      ('Villa Dolores','14/29/1620',1);`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'contribuyentes'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table contribuyentes( 
              Nro_Contribuyente INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL
            , Domicilio text
            , CodigoPostal integer
            , Barrio text
            , FechaDeAlta text
            , Activo boolean
            , FOREIGN KEY (CodigoPostal) REFERENCES localidades(CodigoPostal)
            );`
    );
    console.log("tabla contribuyentes creada!");

    await db.run(
      `insert into contribuyentes values
      (1, 'Juan Pérez', 'Calle 123', 1, 'Barrio A', '2022-01-01', 1),
      (2, 'María Rodríguez', 'Avenida 456', 2, 'Barrio B', '2022-02-02', 1),
      (3, 'Carlos Gómez', 'Calle Principal 789', 3, 'Barrio C', '2022-03-03', 1),
      (4, 'Laura Fernández', 'Calle Secundaria 456', 4, 'Barrio D', '2022-04-04', 1),
      (5, 'Pedro Sánchez', 'Avenida Central 789', 5, 'Barrio E', '2022-05-05', 0),
      (6, 'Ana López', 'Calle Central 111', 6, 'Barrio A', '2022-06-06', 1),
      (7, 'Luisa Torres', 'Avenida Principal 222', 7, 'Barrio B', '2022-07-07', 0),
      (8, 'Roberto Medina', 'Calle Central 333', 8, 'Barrio C', '2022-08-08', 0),
      (9, 'Lucía Herrera', 'Avenida 444', 9, 'Barrio D', '2022-09-09', 1),
      (10, 'Javier García', 'Calle Principal 555', 10, 'Barrio E', '2022-10-10', 0)
      ;`
    );
  }
  
  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'inmuebles'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table inmuebles( 
              Numero_Catastral INTEGER PRIMARY KEY AUTOINCREMENT
            , Ubicacion text NOT NULL
            , Zona text
            , Tipo text
            , Numero_Contribuyente integer
            , FechaRegCatastro text
            , Activo boolean
            , FOREIGN KEY (Numero_Contribuyente) REFERENCES contribuyentes(Nro_Contribuyente)
            );`
    );
    console.log("tabla inmuebles creada!");

    await db.run(
      `INSERT INTO inmuebles (Ubicacion,Zona,Tipo,Numero_Contribuyente,FechaRegCatastro,Activo)
      VALUES
      ('Calle Gran Vía Ciudad A', 'Residencial', 'Casa', 1, '2023-05-15',1),
      ('Avenida Juarez Ciudad B', 'Comercial', 'Local comercial', 2, '2023-04-10',1),
      ('Calle Reforma Ciudad A', 'Residencial', 'Apartamento', 3, '2023-06-25',1),
      ('Avenida Independencia Ciudad C', 'Industrial', 'Bodega', 4, '2023-03-05',1),
      ('Calle Hidalgo Ciudad B', 'Residencial', 'Casa', 5, '2023-02-12',0),
      ('Avenida Paseo de la Reforma Ciudad A', 'Comercial', 'Oficina', 6, '2023-07-20',1),
      ('Calle Madero Ciudad C', 'Residencial', 'Apartamento', 7, '2023-09-08',1),
      ('Avenida Insurgentes Ciudad B', 'Comercial', 'Local comercial', 8, '2023-04-30',1),
      ('Calle Serapio Rendón Ciudad A', 'Residencial', 'Casa', 9, '2023-03-17',0),
      ('Avenida Revolución Ciudad C', 'Industrial', 'Bodega', 10, '2023-06-05',0);`
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'vencimientos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table vencimientos( 
              Nro_Cuota INTEGER PRIMARY KEY AUTOINCREMENT
            , Año text NOT NULL
            , Fecha_1er_vencimiento text
            , Fecha_2do_vencimiento text
            , Descripcion text
            , Activo boolean
            );`
    );
    console.log("tabla vencimientos creada!");

    await db.run(
      `insert into vencimientos values
      (1, '2020', '2023-06-01', '2023-06-15', 'Descripción 1', 1),
      (2, '2022', '2023-07-01', '2023-07-15', 'Descripción 2', 0),
      (3, '2021', '2023-08-01', '2023-08-15', 'Descripción 3', 1),
      (4, '2022', '2023-09-01', '2023-09-15', 'Descripción 4', 1),
      (5, '2023', '2023-10-01', '2023-10-15', 'Descripción 5', 0),
      (6, '2022', '2024-01-01', '2024-01-15', 'Descripción 6', 1),
      (7, '2021', '2024-02-01', '2024-02-15', 'Descripción 7', 1),
      (8, '2020', '2024-03-01', '2024-03-15', 'Descripción 8', 0),
      (9, '2020', '2024-04-01', '2024-04-15', 'Descripción 9', 1),
      (10, '2022', '2024-05-01', '2024-05-15', 'Descripción 10', 1);`
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;