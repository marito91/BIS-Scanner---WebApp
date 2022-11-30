# Aplicación Knowledge Centre Device Manager

Esta aplicación tiene como objetivo administrar el proceso de alquiler y devolución de dispositivos en el British International School. La persona que maneje esta aplicación podrá scanear los códigos de barra de los miembros de la comunidad y asignar un dispositivo a esa persona.

Por otro lado también podrá registrar la devolución de los equipos respectivos. La aplicación podrá brindar un historial de alquileres y devoluciones para que se pueda revisar la estadística y el uso que se le da a los dispositivos.

La aplicación conecta con un servidor backend donde se hace el manejo de todos los datos y se conecta a una base de datos que registra todos los procesos que se realicen.

## Herramientas disponibles

Esta aplicación permite hacer los siguientes procesos:

### Alquiler

Habilita la cámara del computador para leer los códigos de barra. Al registrar el código (documento del usuario), se le puede asignar un tipo de dispositivo y el número respectivo.

### Devolución

Componente que recibe el tipo de dispositivo y su respectivo número para registrar la devolución. Este componente debe indicar solamente si la devolución fue exitosa o si hubo algún inconveniente.

### Descargar Registros

Este componente permite al usuario descargar un historial de alquileres y devoluciones. En esta primera versión podrá descargar un documento general con el historial de registros. En versiones posteriores se pretende que el usuario pueda filtrar información según estudiante, dispositivo, fecha, etc...

## Otras especificaciones

## Hostbase

El servidor backend es privado por ende no se puede compartir en esta aplicación.

## Dispositivos móviles

Si bien esta aplicación utiliza la cámara para escanear equipos, esta versión no permite el acceso a la cámara en dispositivos móviles, con el fin de evitar inconvenientes con el acceso que puedan tener los estudiantes.
