# Notes App with Nodejs "Ganymede"
Tecnologias Utilizadas para el proyecto:
"node": "8.12.0",
"npm": "6.4.1"
"axios": "^0.19.0",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"lodash": "^4.17.15",
"mongoose": "^5.7.13",

- Base de datos: mongoDB.

## Funcionalidad de la App:

Ganymede recibe una "orden" en formato json con la siguiente estructura:

La orden es validada, y es guardaba en la base de datos, con estado "received".
Luego es enviada a Themisto, y su estado es actualizado a "proccessing", para realizar la query del producto enviada en la orden en Mercadolibre.
Themisto devuelve los resultados a Ganymede para ser procesados, en caso de traer resultados de las busquedas realizadas por
Themisto atraves de Puppeteer, la orden es actualizada a estado "fullfilled", como así también los resultados de la búsqueda.
En caso de no recibir resultados, su estado para a  ser "failed".
Finalemente Ganymede hace una request a la url enviada en el callback de la orden, donde se retorna en caso de ser "failed",
solo el estado de la orden, y en caso de ser "Fullfilled", retorna la dirección de la orden correspondiente para ver los resultados de la búsqueda.


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
 
 Antes de crear los accesos a la base de datos, hay que crear una base de datos Mongo.
 
 Yo utilice AtlasDB:
 1. Crear Cuenta.
 2. Crear un CLuster.
 3.Crear la base de datos.
 
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
 
 1. Colocar la url local: http://localhost:3000/api/product/search (POST) 
 
 2. En el header colocar:
 
 key: Content-type  value: application/json
 
 3. En la solapa body:
 Seleccionar formato raw y seleccionar el formato a enviar (JSON(Application/json))
 
 ```
{
	"query": "Silla",
	"provider": "easy",
	"options": {
		"user": "user",
		"password": "pass"
	},
	"callbackUrl": "http://localhost:3000/api/results"

}
```

Si valida correctamente, el servicio retornará a modo de ejemplo:

```
{
    "order": {
        "options": {
            "user": "user",
            "password": "pass"
        },
        "query": "Silla",
        "provider": "easy",
        "callbackurl": "http://localhost:3000/api/results"
    },
    "status": "received",
    "results": [],
    "_id": "5de90f087b21fe001752ad6c"
}
```

Como prueba se creo en la base de datos una collection "users",user:"admin: y pass: "admin".
Para esto cree una migration, que crea el usuario en la base de datos automaticamente.
Este se puede realizar corriendo el comando node user.js dentro del directorio app/seeds/.


## Heroku:
### Ganymede
Url api: https://ganymede.herokuapp.com/
Url api Product search: https://ganymede.herokuapp.com/api/product/search



Imagenes respuesta servidor Heroku:

### Themisto sending proccesed data to Gaymede:
https://ia601509.us.archive.org/33/items/capturadepantalla20191205alas11.56.20/Captura%20de%20pantalla%202019-12-05%20a%20las%2011.56.20.png

### Ganymede sending Fullfilled order to callback:
https://archive.org/download/capturadepantalla20191205alas11.56.20/Captura%20de%20pantalla%202019-12-05%20a%20las%2011.56.08.png





 
