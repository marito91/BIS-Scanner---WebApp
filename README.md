# Aplicación Knowledge Centre Device Manager

Esta aplicación tiene como objetivo administrar el proceso de alquiler y devolución de dispositivos en el British International School. La persona que maneje esta aplicación podrá scanear los códigos de barra de los miembros de la comunidad y asignar un dispositivo a esa persona.

Por otro lado también podrá registrar la devolución de los equipos respectivos. La aplicación podrá brindar un historial de alquileres y devoluciones para que se pueda revisar la estadística y el uso que se le da a los dispositivos.

La aplicación conecta con un servidor backend donde se hace el manejo de todos los datos y se conecta a una base de datos que registra todos los procesos que se realicen.

## Herramientas disponibles

Esta aplicación permite hacer los siguientes procesos:

### Alquiler

Por medio de un lector de códigos de barra o scanner se podrán leer los códigos de barra de los estudiantes/usuarios. Al registrar el código (documento del usuario), se le puede asignar un tipo de dispositivo y el número respectivo.

### Devolución

Al seleccionar un estudiante, se podrá registrar el tipo de dispositivo y su respectivo número que recibe el usuario para así poder gestionar la devolución. Esto habilita el dispositivo para alquiler y libera al estudiante de la lista de usuarios activos.

### Descargar Registros

Esta herramienta permite al usuario descargar un historial de alquileres y devoluciones filtrando ya sea por fecha o por usuario. En versiones posteriores se pretende que el usuario pueda filtrar información según dispositivo, rango de fechas, todos los registros, etc...

### Notificar Usuarios

La aplicación permite al usuario notificar a modo de recordatorio a todos los estudiantes activos, o si prefiere, a alguno en específico, de que debe retornar el dispositivo al finalizar la jornada escolar. También notifica a los estudiantes por correo cada vez que alquilan o devuelven un dispositivo para que tengan evidencia del movimiento.

### Verificación de usuarios

La primera sección de la aplicación permite al usuario revisar quiénes tienen dispositivos alquilados actualmente. También se brindará toda la información pertinente del estudiante para poder hacer seguimiento.

## Otras especificaciones

## Hostbase

El servidor backend es privado por ende no se puede compartir en esta aplicación. Por ese motivo se debe crear un archivo hostbase.js en la versión backend donde se conecte a una base de datos MongoDB para que funcione.

## Dispositivos móviles

Esta aplicación puede ser utilizada en dispositivos móviles siempre y cuando se conecte el scanner o lector de códigos de barras por medio de un adaptador. No se permite ingresar los documentos de los estudiantes manualmente por motivos de seguridad (evitar que un estudiante utilice el documento de otro si logra obtener acceso a la aplicación).

## Open SSL

En algunos dispositivos es posible que sea necesario utilizar el comando SET NODE_OPTIONS=--openssl-legacy-provider para poder poner en funcionamiento la aplicación. Esto se debe a que utilizaba la cámara como componente principal, sin embargo ya no debería aparecer este error.

## Browser

En "package.json-"start": "BROWSER=Firefox-developer-edition react-scripts start"" probablemente sea necesario cortar y dejar solamente react-scripts start para que no arroje un error en caso de no contar con el navegador especificado.
