# Notes App with Nodejs "Ganymede"
Tecnologias Utilizadas para el proyecto:
"node": "8.12.0",
"npm": "6.4.1"
"axios": "^0.19.0",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"lodash": "^4.17.15",
"mongoose": "^5.7.13",


 ## Instalación del proyecto
 Direccion github: https://github.com/pepecachivache/ganymede.git
 Pasos:
 Crear un directorio nuevo.
 Para clonar el repositorio escribir en consola el siguiente comando:
 ```
 git clone https://github.com/pepecachivache/ganymede.git
 ```
 
 Para instalar las librerias, ir al directorio principal y ejecutar.

 ```
 npm i
 ```
 o
 ```
 npm install
 ```
 
 Crear archivo .env en el directorio raiz y escribir en el mismo:
 
 ```
 NODE_ENV = development
 ```
 
 Crear dentro del directorio app, la carpeta config y dentro un archivo config.js para configurar los accesos a las bases de datos.
 
 formato json ejemplo:
 
```
 const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    development: {
        connectionLimit: 10,
        database: process.env.DATABASE || <'Escribir credenciales MongoDB'>,    
    },
   
```
 
 Luego ir al directorio principal y ejecutar.
 
 Para correr el servidor localmente ejecutar el siguiente comando:
 
```
 npm run dev
```

El servidor comenzara a escuchar en el puerto 3000.

## Local api test
 
 Para testear la api localmente pueden utilizar POSTMAN.
 Link de descarga: https://www.getpostman.com/downloads/
 
