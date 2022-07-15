# Proyecto de EXPO (Λ) con Firebase (🔥) para Programación III
En un modelo **MVC**, React y React-Native toman el rol de la vista con la que interactúa el usuario. Darle profundidad requiere vincular esa interfaz con una plataforma que tenga la capacidad de gestionar la información que genera. El propósito de este proyecto era desarrollar una *mobile app*, al estilo de una red social contemporánea, que valide esa afirmación. Nuestro tech stack incluía [**EXPO**](https://expo.dev) de React-Native como framework del front end y Google’s [Firebase](https://firebase.google.com) actuando de back end, en este caso siendo un *BaaS*.

![img0](https://user-images.githubusercontent.com/63103853/179120410-408e40c8-930e-474c-9e76-96c8ac51873e.JPEG)

En otras palabras, queríamos que la aplicación cuente con todas las funcionalidades que uno vendría a esperar de una red social interactiva. Esto implica aspectos de la interfaz como las publicaciones, likes y comentarios; así como también funciones de servidor como una base de datos, almacenamiento de archivos e imágenes y gestión y autenticación de usuarios.

# Firestore
El método **CRUD** asume un rol central en las funcionalidades interactivas de nuestra aplicación. La capacidad de concebir, modificar y descartar contenido por el propio usuario sería el fundamento principal del proyecto. Si uno desea publicar una foto o comentario, se necesitaría crear un nuevo registro en una base de datos no relacional detrás de escenas. En tal caso, añadir u obtener registros de Firestore se hace a través del método `db.collection` y `add()` o `onSnapshot()`, dependiendo de qué se quiera hacer en particular. A partir de la obtención de datos, se pushean aquellos registros filtrados a una variable y se cambia el estado a esa nueva variable.

![img1](https://user-images.githubusercontent.com/63103853/179124315-1520f1ee-a4a5-497d-9b4b-1c5e5e9106d1.JPEG)

Asimismo, el método `auth` de Firebase permite crear funciones respecto al acceso y autenticacióon de cuenta, a modo de avisar a React sobre el estado de sesión del usuario y actuar en base al resultado, sea para su registro o quizás un *Remember Me*.

# Formularios
Aparte de componentes propios y comunitarios, se usó también un conjunto de componentes core de React-Native, dentro de los cuales se incluyen *FlatList*, *DrawerNavigation*, *StyleSheet*, entre otros. En cuanto al envío de formularios, dado que el framework no tiene un componente nativo para llevarlo a cabo, se usó *TextInput* y *TouchableOpacity* junto con las funciones `onTextChange` y `onSubmit` respectivamente con tal de simular el procedimiento de un *form* genérico. Sería una manera indirecta de enviar información a la base de datos.

![gif0](https://user-images.githubusercontent.com/63103853/179120442-760cd38a-4e79-40bd-a715-5f44939fff1a.GIF)

# Cámara
El componente **MyCamera** incluye las numerosas etapas detrás de la toma y almacenamiento de fotos previo a su publicación. A modo de resumen, el método `takePictureAsync()` nos permite tomar la foto y guardarla en una uri, la cual es una URL interna temporal. Luego, `savePhoto()` contrae esa uri y la sube a la base de datos de Firebase como dirección y archivo .jpg a través de `storage.ref`.

![img2](https://user-images.githubusercontent.com/63103853/179123893-1cd1f112-c08d-468a-b23d-86225e1c8579.JPEG)

*Este proyecto es en colaboración con la [Universidad de San Andrés](https://udesa.edu.ar/) y [Digital House](https://www.digitalhouse.com/ar).*
