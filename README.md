Para ejecutar la aplicacion en un contenedor:
1- Se debe descargar el proyecto que se encuentra en la rama master.
2- Abrir una terminal y ubicarse en la raiz del proyecto. 
4- Ejecutar el comando: docker build -t <nombre_de_la_imagen> .
5- Una vez creada la imagen ejecutar el comando: docker run -p 4201:4200 <nombre_de_la_imagen>
6- Abrir un navegador web en http://localhost:4201
