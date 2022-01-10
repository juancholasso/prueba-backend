
# Prueba de Backend NodeJS

Para la ejecución se deberá configurar las credenciales de la base de datos en los archivos  
/src/config/database.js y /src/config/config.json

Ejecutar npm i 
para instalar las librerias

Posteriormente se debe ejecutar en la ruta /src del proyecto el comando
npx sequelize-cli db:migrate
para ejecutar las migraciones que crearán las tablas en la base de datos

Finalmente ejecutar node app.js para correr el servidor



El WS tiene un middleware que proteje las rutas, por lo que es necesario primero autenticarse (o registrarse en caso de no tener usuario) y luego con el JWT podrá consumir los demás servicios.