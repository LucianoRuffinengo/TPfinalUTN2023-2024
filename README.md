El presente proyecto utilizamos un api de la página https://draftbit.com/ que consiste en un arreglo de objetos de tipo Libros. A su vez, usamos un archivo json para unir ciertos aspectos que la estructura del api no contenía, como stock y precio. Y se relacionan mediante el ID.
Con estas características, procedemos a la maquetación e implementación de funcionalidades para el desarrollo de la página, tanto el listado, como inicio de sesión, compras, carrito y perfil de administrador

ASPECTOS MEJORADOS DESDE EL 16 DE NOVIEMBRE:
-	Cambios en la paleta de colores
-	Mejora de maquetado HTML y estilo CSS
-	Diseño responsive a partir de los 1400px (desktop first)
-	Creación de enlaces a páginas en construcción
-	Búsqueda mediante barra de búsqueda
-	Filtro por genero
-	Creación de filtro por autores
-	Creación de página de búsqueda
-	Creación de página de contacto
-	Modificaciones lógicas de código en inicio de sesión y compras


Comienzo:

Para poder hacer funcionar la página web primero se debe, ingresar en la consola los siguientes comandos: npm run backend1, npm run backend2, npm run backend3, ng server –o.

Navegación: En este programa usted puede visualizar los libros recomendados en cada visita a la pagina, luego tiene la opción para observar los productos ofrecidos o bien puede dirigirse al enlace de Libros en el cual puede visualizar todos los catálogos de libros de la pagina.

Filtros: También puede utilizar filtros de búsqueda tanto para autores como para géneros, la idea a futuro es establecer un filtro de precios y combinar todos para tener un filtro mas especifico. También se puede buscar un libro introduciendo su nombre o palabras claves.

Inicio de sesión:

Usted puede utilizar el programa, aunque no haya iniciado sesión, pero ciertas funcionalidades serán deshabilitadas. Para iniciar sesión presione el botón “Iniciar Sesión/Registrarse” que se encuentra en la parte superior. Esté le permitirá iniciar sesión en una cuenta ya creada o, por el contrario, crear una cuenta y acceder automáticamente. Sepa que no podrá creara una cuenta con una dirección de correo que ya haya sido utilizada previamente por otro usuario.
Un usuario que puede usar para acceder es:

Usuario: katznacho@gmail.com             Pass:123

Una vez haya iniciado sesión, verá que el botón mencionado previamente cambió y ahora dice “Mi cuenta”. Si lo presiona podrá visualizar sus datos, así como modificar los mismo, ver su historial de compras, cerrar sesión o hasta borrar permanentemente su cuenta.

Historial:

Tras realizar una compra, esta se agregará a un historial donde podrá ver en que fecha realizó la compra, los libros que compro y el monto que tuvo que pagar por los mismos.

Lista de deseados:
A su vez se le permitirá agregar libros a su lista de favoritos, por si le interesa un libro en particular, pero no desea comprarlo en el momento. Seleccione un libro y verá un botón que dice “Agregar a favoritos”, al presionarlo se agregara el libro a la lista de favoritos. Presionarlo removerá el libro de la lista. 
Puede visualizar su lista de favoritos con el botón “Lista de deseados” que se encuentra en la parte superior. En esta usted podrá eliminar un libro de esta lista con la cruz que se encuentra al lado. Por otro lado, puede presionar sobre la imagen del libro para poder acceder a la página de visualización de este.

Carrito:

Para poder agregar un libro al carrito, ingrese a la página del libro deseado y aprete el botón de comprar y ya va a estar agregado, si vuelve apretar el botón se agregara por segunda ves.
Ya en el carrito podrás eliminar un elemento con el botón en forma de “x” o poder vaciar todo el carrito con el botón de “vaciar carrito”. Ya para comprar presione el botón de “compra”, pero ojo, no se va poder comprar sin un usuario iniciado o creado.

Compra:

Ya con un usuario, en la sección de compra podrás visualizar tus productos con la cantidad, subtotal y el precio total. Para poder comprar presione el botón de “comprar”, pero si no ingreso una tarjeta a la hora de comprar saltara una alerta y te re direccionará a la página de agregar tarjeta. Para agregar una tarjeta puedes seleccionar el botón “cambiar” dónde te re direccionará a la página de agregar tarjeta. Ya con una tarjeta podrás comprar tus productos. Si no puedes rechazar la compra y te re direccionará al carrito donde puedes hacer todos los cambios que desees.

Administración: La sección de administración se puede acceder en el enlace del footer llamado Acceso, usa un archivo json para la autenticación, un usuario y contraseña que puede usar es

Usuario: gchaldu               Pass:201123

Aunque puede agregar cualquier en el archivo json, a futuro se podrá implementar creaciones de mas administradores así el administrador principal lo desease.
Esta sección permite tener un control sobre los datos de los usuarios y los datos de los libros. Al ser una api publica, solo se permite leer, por lo tanto, los únicos datos que se pueden modificar en la sección de los productos es el precio y el stock que al instante se verán reflejados en el sistema del lado del usuario
