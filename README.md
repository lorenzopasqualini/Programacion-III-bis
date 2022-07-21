# Proyecto de EXPO (Λ) con Firebase (🔥) para Programación III

<p align="center">
  <img src="https://user-images.githubusercontent.com/63103853/180076683-fdf8eab1-ff4c-4520-b7dd-192f1c76473b.png" width="400" />
  <img src="https://user-images.githubusercontent.com/63103853/180078784-03f22692-6e3c-45dd-ac9e-439f8fddbd0a.png" width="350"/>
 </p>

En un modelo **MVC**, React y React-Native toman el rol de la vista con la que interactúa el usuario. Darle profundidad requiere vincular esa interfaz con una plataforma que tenga la capacidad de gestionar la información que genera. El propósito de este proyecto era desarrollar una *mobile app*, al estilo de una red social contemporánea, que valide esta afirmación. Nuestro tech-stack incluía [**EXPO**](https://expo.dev) de React-Native como framework del front end y Google’s [Firebase](https://firebase.google.com) actuando de back end, en este caso siendo un *BaaS*.

En otras palabras, queríamos que la aplicación cuente con todas las funcionalidades que uno vendría a esperar de una red social interactiva. Esto implica aspectos de la interfaz como las publicaciones, likes y comentarios; así como también funciones de servidor como una base de datos, almacenamiento de archivos e imágenes y gestión y autenticación de usuarios.

# Firestore
El método **CRUD** asume un rol central en las funcionalidades interactivas de nuestra aplicación. La capacidad de concebir, modificar y descartar contenido por el propio usuario sería el fundamento principal del proyecto. Si uno desea publicar una foto o comentario, se necesitaría crear un nuevo registro en una base de datos, en este caso no relacional, detrás de escenas. En tal situación, añadir u obtener registros de Firestore se hace a través del método `db.collection` y `add()` o `onSnapshot()`, dependiendo de qué se quiera hacer en particular. A partir de la obtención de datos, se pushean aquellos registros filtrados o alterados a una variable y se cambia el estado a esa nueva variable.

![gif0](https://user-images.githubusercontent.com/63103853/180216651-faf8a83a-5559-43f4-99b2-a76e142067c3.GIF)

# Cámara
El componente **MyCamera** incluye las distintas etapas detrás de la toma y almacenamiento de fotos previo a su publicación. A modo de resumen, el método `takePictureAsync()` nos permite tomar la foto y guardarla en una *uri*, la cual es una URL interna temporal. Luego, `savePhoto()` contrae esa *uri* y la sube a la base de datos de Firebase como dirección y archivo .jpg a través de `storage.ref`.

# Formularios
Aparte de componentes propios y comunitarios, se usó también un conjunto de componentes core de React-Native, dentro de los cuales se incluyen *FlatList*, *DrawerNavigation*, *StyleSheet*, entre otros. En cuanto al envío de formularios, dado que el framework no tiene un componente nativo para llevarlo a cabo, se usó *TextInput* y *TouchableOpacity* junto con las funciones `onTextChange` y `onSubmit` respectivamente, con tal de simular el procedimiento de un *form* genérico. Sería una manera indirecta de enviar información a la base de datos.

![gif1](https://user-images.githubusercontent.com/63103853/180216710-3713ca63-4882-403e-8abc-babd8454b631.GIF)

De forma análoga, el método `auth` de Firebase permite crear funciones respecto al acceso y autenticacióon de cuenta, a modo de avisar a React sobre el estado de sesión del usuario y actuar en base al resultado, sea para su registro o quizás un *Remember Me*. Arriba se observa el método `signInWithEmailAndPassword` a la hora iniciar sesión como usuario previamente registrado en Firebase.
