/* =====================================================================
   DATOS DEL PORTAFOLIO
   ---------------------------------------------------------------------
   Todo el contenido que cambia seguido vive aquí. Para agregar una
   orden (proyecto) o una certificación no hace falta tocar el HTML:
   copia un bloque { ... }, cambia los valores y guarda.
   ===================================================================== */

/* ---------------------------------------------------------------------
   ESTILO
   - portada: "arco", "titulo" o "gafete"
   - fondo:   "menta", "durazno", "lavanda" o "cielo"
     (quien visite el sitio puede cambiar el fondo con el botón "Color")
   --------------------------------------------------------------------- */
const ESTILO = {
  portada: "gafete",
  fondo: "menta",
};

const PERFIL = {
  nombre: "Verónica Acuña",
  apodo: "Roni",
  correo: "veronicaacuna0327@gmail.com",
  github: "https://github.com/V-ac",
  linkedin: "https://linkedin.com/in/verónica-acuña",
  // Si prefieres no mostrar dónde trabajas, deja empresa en "".
  puesto: "Soporte técnico",
  empresa: "Soluciones Empresariales C&T",
  // Sube tu CV a esta ruta y el botón "Descargar CV" aparece solo.
  cv: "asset/cv/CV_Veronica_Acuna.pdf",
};

/* ---------------------------------------------------------------------
   SOBRE MÍ — cada texto es un párrafo
   --------------------------------------------------------------------- */
const SOBRE_MI = [
  "Me gusta resolver cosas. En el trabajo eso significa conectarme por remoto con alguien que tiene un problema con su sistema y no soltarlo hasta que quede. Fuera del trabajo significa abrir el editor y preguntarme: ¿y si esto lo hace una app?",
  "Así nacieron casi todos mis proyectos: el chat de cada sesión de soporte guardado en su orden, una bitácora con las versiones de CONTPAQi, un editor de PDF y hasta un generador de mapas. Ninguno empezó como proyecto de portafolio; empezaron porque los necesitaba.",
  "Estudié Ingeniería en Sistemas en el IPN y empecé haciendo videojuegos educativos. Hoy le estoy entrando al desarrollo móvil con Flutter. Aprendo mejor viendo, así que me encanta ver cómo una pantalla toma forma mientras la programo.",
  "Cuando no estoy frente a la compu, toco la guitarra. Y sí, a mi coro también le estoy haciendo una app 🎶",
  "Si buscas a alguien con paciencia de soporte y ganas de construir, platiquemos.",
];

/* ---------------------------------------------------------------------
   ÓRDENES DE SERVICIO (proyectos)
   - estado: "uso" (en uso), "desarrollo" (en desarrollo) o "publicado"
   - tipo:   "oficina", "app" o "juego" (sirve para los filtros)
   - ilustracion: dibujo que se muestra si no hay capturas
     ("chats", "bitacora", "mapas", "coro", "rocola", "pdf")
   - galeria: capturas reales [ruta, descripción]. Si agregas capturas
     a un proyecto que hoy usa ilustración, se muestran en su lugar.
   --------------------------------------------------------------------- */
const PROYECTOS = [
  {
    id: "chats-ordenes",
    linea: "Liga el chat de cada sesión remota con su orden de servicio. La usamos a diario en la oficina.",
    folio: "OS-008",
    titulo: "ChatsOrdenesUV",
    subtitulo: "Registro de chats de soporte remoto",
    estado: "uso",
    tipo: "oficina",
    destacado: true,
    año: 2026,
    problema:
      "Cada sesión de soporte por UltraViewer o AnyDesk deja un chat con el cliente, pero esa conversación se perdía o había que copiarla a mano en el CRM, sin quedar ligada a la orden de servicio.",
    solucion:
      "Una app local que recupera los chats de cada sesión y los liga con su orden de servicio. Mi compañero y yo la usamos a diario con perfiles propios, y se va a integrar al CRM de la oficina.",
    funciones: [
      ["Chats ligados a cada orden", "Recupera las conversaciones de las sesiones remotas y las guarda dentro de su orden."],
      ["Perfiles para el equipo", "Una sola base compartida con filtro de órdenes propias, de mi compañero o de todos."],
      ["Matriz y sucursales", "En órdenes con varios equipos marca cuál es la matriz y cuáles las sucursales, o el servidor y las terminales."],
      ["Calendario y papelera", "Busca órdenes por fecha y recupera lo que se borró por error."],
      ["Limpieza programada", "Avisa de las conversaciones con más de 6 meses; nunca borra nada sola."],
      ["Versiones de CONTPAQi", "Un botón con las descargas, parches y cartas técnicas de cada sistema."],
    ],
    tecnologias: ["Python", "HTML", "CSS", "JavaScript", "Base de datos local"],
    ilustracion: "chats",
    galeria: [],
    demo: { url: "", texto: "" },
    codigo: { url: "" },
  },
  {
    id: "proyecto-mapas",
    linea: "Convierte las capas AP, SA y AI en mapas y tablas de transectos.",
    folio: "OS-007",
    titulo: "Proyecto_mapas",
    subtitulo: "Generador de mapas y tablas de transectos",
    estado: "desarrollo",
    tipo: "oficina",
    año: 2026,
    problema:
      "En los estudios de impacto ambiental, los mapas y las tablas de transectos del área del proyecto, el sistema ambiental y el área de influencia se arman a mano, en parte en ArcGIS.",
    solucion:
      "Mi propio editor: cargo las capas AP, SA y AI y la herramienta procesa los datos para generar mapas, tablas de transectos y resúmenes de superficie.",
    funciones: [
      ["Tres capas, un flujo", "Recibe las capas de Área del Proyecto, Sistema Ambiental y Área de Influencia."],
      ["Geoprocesamiento", "Recortes y cruces con capas del INEGI, respetando los nombres de campo originales."],
      ["Mapas y tablas", "La meta: mapas con mi plantilla y tablas de superficie y transectos exportadas a Excel."],
      ["Interfaz de escritorio", "Una app de Windows con pantallas para cada proceso."],
    ],
    tecnologias: ["Python", "PySide6", "GeoPandas", "Shapefiles"],
    ilustracion: "mapas",
    galeria: [],
    demo: { url: "", texto: "" },
    codigo: { url: "" },
  },
  {
    id: "bitacora",
    linea: "Versiones, parches y cartas técnicas de CONTPAQi en un solo lugar.",
    folio: "OS-006",
    titulo: "Bitácora CONTPAQi",
    subtitulo: "Mi bitácora de soporte",
    estado: "uso",
    tipo: "oficina",
    año: 2026,
    problema:
      "En soporte, cada instalación o actualización necesita la versión, el parche o la carta técnica correcta de cada sistema CONTPAQi.",
    solucion:
      "Una bitácora en Python que concentra las descargas de versiones, parches y cartas técnicas por sistema, ordenados del más nuevo al más antiguo.",
    funciones: [
      ["Versiones por sistema", "Las descargas agrupadas por cada sistema CONTPAQi."],
      ["Parches en orden", "Del más reciente al más antiguo, para no instalar uno viejo por error."],
      ["Reutilizable", "Su módulo de versiones ya vive también dentro de ChatsOrdenesUV."],
    ],
    tecnologias: ["Python"],
    ilustracion: "bitacora",
    galeria: [],
    demo: { url: "", texto: "" },
    codigo: { url: "" },
  },
  {
    id: "cancionero",
    linea: "App en Flutter para coro que recibe cambios de canto aun sin internet.",
    folio: "OS-005",
    titulo: "Cancionero del Coro",
    subtitulo: "App de cantos para coro",
    estado: "desarrollo",
    tipo: "app",
    año: 2026,
    problema:
      "Tres coros se juntan cada domingo y los cantos cambian a última hora. En el templo no hay internet, así que una app en la nube no basta.",
    solucion:
      "Una app en Flutter donde quienes administran arman el esquema de cada misa y los cambios llegan a los teléfonos del coro, aun sin internet.",
    funciones: [
      ["Esquema de la semana", "Entrada, Gloria, Comunión y demás momentos, con aviso de cambios de último minuto."],
      ["Colores litúrgicos", "La app cambia de color según el tiempo litúrgico, calculado en el propio teléfono."],
      ["Funciona sin internet", "Los cantos se guardan en cada teléfono y los cambios se comparten por la red local."],
      ["Celular y escritorio", "Pensada para Android y también para la computadora."],
    ],
    tecnologias: ["Flutter", "Dart", "Sincronización sin internet", "Diseño de interfaz"],
    ilustracion: "coro",
    galeria: [],
    demo: { url: "", texto: "" },
    codigo: { url: "" },
  },
  {
    id: "editor-pdf",
    linea: "Reordena, rota y cambia fechas en PDFs sin subirlos a internet.",
    folio: "OS-004",
    titulo: "Editor de PDF",
    subtitulo: "Herramienta de escritorio para documentos",
    estado: "desarrollo",
    tipo: "oficina",
    año: 2026,
    problema:
      "Necesitaba una herramienta propia para arreglar PDFs del trabajo: reordenar, rotar, quitar páginas y corregir fechas.",
    solucion:
      "Un editor de escritorio que trabaja con el documento abierto y todo pasa en la computadora, sin subir archivos a ningún lado.",
    funciones: [
      ["Ordenar páginas", "Arrastra miniaturas para reordenar; rota y elimina páginas."],
      ["Cambiar fechas", "Reemplaza fechas que se repiten en el documento sin encimar texto."],
      ["Exportar páginas", "Saca solo las páginas marcadas a un PDF nuevo."],
      ["Sin pérdidas", "Avisa antes de cerrar con cambios sin guardar y conserva marcadores."],
    ],
    tecnologias: ["Python", "PySide6", "PyMuPDF"],
    ilustracion: "pdf",
    galeria: [],
    demo: { url: "", texto: "" },
    codigo: { url: "" },
  },
  {
    id: "mi-rocola",
    linea: "Música local y Spotify en una app instalable para Android.",
    folio: "OS-003",
    titulo: "Mi Rocola",
    subtitulo: "Reproductor de música instalable",
    estado: "desarrollo",
    tipo: "app",
    año: 2026,
    problema:
      "Quería escuchar mi música local y Spotify en un solo lugar desde el celular, sin depender de varias apps.",
    solucion:
      "Una app web instalable en Android que guarda música local sin conexión y se conecta a Spotify Premium.",
    funciones: [
      ["Música sin conexión", "Importa canciones al teléfono y lee portada, artista y álbum."],
      ["Spotify integrado", "Inicio de sesión seguro y reproducción desde la misma app."],
      ["Instalable", "Se agrega a la pantalla de inicio como cualquier app."],
    ],
    tecnologias: ["JavaScript", "PWA", "IndexedDB", "Spotify SDK"],
    ilustracion: "rocola",
    galeria: [],
    demo: { url: "", texto: "" },
    codigo: { url: "" },
  },
  {
    id: "math-adventure",
    linea: "Juego para aprender a trazar números con cuentos. Mi titulación.",
    folio: "OS-002",
    titulo: "Math Adventure",
    subtitulo: "Videojuego educativo para Android",
    estado: "publicado",
    tipo: "juego",
    año: 2023,
    problema:
      "Hay pocas herramientas digitales que acompañen a peques de 5 a 7 años con los números. Proyecto de titulación en el IPN UPIIZ.",
    solucion:
      "Un juego que une el trazo de números con cuentos animados, para que practicar se sienta como jugar.",
    funciones: [
      ["Trazo con retroalimentación", "Evalúa el trazado de cada número en tiempo real y muestra qué corregir."],
      ["10 cuentos interactivos", "Cada número llega dentro de una historia."],
      ["Avatares personalizables", "Cada jugador arma su personaje: peinado y ropa."],
      ["Para manos pequeñas", "Botones grandes y controles que se entienden sin leer. 60 FPS en celulares de gama media y baja."],
    ],
    tecnologias: ["Unity", "C#", "Android", "UX infantil"],
    ilustracion: "",
    cubierta: {
      lema: "Aprender números jugando",
      foto: 0,
      color: "#FFC83D",
      calcomanias: ["✏️ Trazo de números", "📚 10 cuentos", "🎓 Mi titulación", "🤖 Android"],
    },
    galeria: [
      ["asset/proyectos/math-adventure/portada.webp", "Pantalla de título de Math Adventure"],
      ["asset/proyectos/math-adventure/inicio.webp", "Menú de inicio"],
      ["asset/proyectos/math-adventure/avatar-pelo.webp", "Editor de avatar: elegir peinado"],
      ["asset/proyectos/math-adventure/avatar-ropa.webp", "Editor de avatar: elegir ropa"],
      ["asset/proyectos/math-adventure/mapa.webp", "Mapa de niveles"],
      ["asset/proyectos/math-adventure/cuento.webp", "Escena de un cuento animado"],
      ["asset/proyectos/math-adventure/exito.webp", "Trazo correcto de un número"],
      ["asset/proyectos/math-adventure/felicidades.webp", "Pantalla de felicitación"],
      ["asset/proyectos/math-adventure/configuracion.webp", "Configuración del juego"],
    ],
    demo: { url: "", texto: "" },
    codigo: { url: "" },
  },
  {
    id: "crack-the-code",
    linea: "Juego de lógica para el CIMAT Zacatecas. Se juega en línea.",
    folio: "OS-001",
    titulo: "Crack the Code",
    subtitulo: "Juego de lógica · CIMAT Zacatecas",
    estado: "publicado",
    tipo: "juego",
    año: 2023,
    problema:
      "El CIMAT Zacatecas buscaba una forma divertida de practicar pensamiento crítico. Lo hice como servicio social.",
    solucion:
      "Un juego de detective: descifras una combinación secreta con intentos limitados y pistas que guían sin dar la respuesta.",
    funciones: [
      ["Contra la computadora", "Combinaciones nuevas en cada partida."],
      ["Modo personalizado", "Una persona elige la clave y otra la descifra."],
      ["3 niveles", "Cambian el largo de la clave y los intentos."],
      ["Pistas, no respuestas", "Después de cada intento indica qué va bien y qué no."],
    ],
    tecnologias: ["Unity", "C#", "Algoritmos", "Lógica"],
    ilustracion: "",
    cubierta: {
      lema: "Descifra la clave secreta",
      foto: 2, // qué captura de la galería se usa (0 = la primera)
      color: "#5B8DEF",
      calcomanias: ["🔐 Adivina la clave", "🕵️ Modo detective", "🏛️ CIMAT Zacatecas", "🎮 Juega en línea"],
    },
    galeria: [
      ["asset/proyectos/crack-the-code/portada.webp", "Menú principal de Crack the Code"],
      ["asset/proyectos/crack-the-code/partida.webp", "Inicio de una partida"],
      ["asset/proyectos/crack-the-code/primer-intento.webp", "Primer intento con pistas"],
      ["asset/proyectos/crack-the-code/combinacion.webp", "Probando una combinación"],
      ["asset/proyectos/crack-the-code/gano.webp", "Pantalla de victoria"],
      ["asset/proyectos/crack-the-code/perdio.webp", "Pantalla de derrota"],
    ],
    demo: { url: "https://mrtako.itch.io/crack-the-code?secret=GkodTfa17DIpNbercGvicHUdU4", texto: "Jugar en itch.io" },
    codigo: { url: "" },
  },
];

/* ---------------------------------------------------------------------
   BITÁCORA (trayectoria), de lo más antiguo a lo más reciente
   --------------------------------------------------------------------- */
const TRAYECTORIA = [
  {
    cuando: "2019 – 2023", titulo: "Ingeniería en Sistemas Computacionales", lugar: "IPN · UPIIZ, Zacatecas",
    texto: "Ingeniería de software, algoritmos, bases de datos, redes y arquitectura de sistemas."
  },
  {
    cuando: "2023", titulo: "Servicio social en el CIMAT", lugar: "Crack the Code",
    texto: "Mi primer juego publicado: un reto de lógica hecho en Unity."
  },
  {
    cuando: "2023", titulo: "Titulación", lugar: "Math Adventure",
    texto: "Videojuego para Android que enseña a trazar números con cuentos animados."
  },
  {
    cuando: "2025", titulo: "Oracle Next Education G9", lugar: "Alura Latam + Oracle",
    texto: "Formación en programación y desarrollo personal: JavaScript, HTML y CSS, Git e IA generativa."
  },
  {
    cuando: "Hoy", titulo: "Soporte técnico CONTPAQi", lugar: "Soluciones Empresariales C&T · Zacatecas y Aguascalientes",
    texto: "Atiendo clientes por soporte remoto: instalaciones, actualizaciones y dudas. Y construyo herramientas para que el equipo trabaje mejor."
  },
  {
    cuando: "Hoy", titulo: "Desarrollo móvil con Flutter", lugar: "Aprendiendo",
    texto: "Cancionero del Coro y un armario virtual donde se pueden encimar prendas."
  },
];

/* ---------------------------------------------------------------------
   APRENDIENDO AHORA — actualiza el porcentaje cuando avances
   --------------------------------------------------------------------- */
const EN_PROGRESO = [
  { titulo: "Flutter – Móvil: de cero a experto", avance: 6 },
  { titulo: "UI/UX Design for Developers", avance: 40 },
  { titulo: "Emprendimiento, Agilidad y Protagonismo Profesional G9 – ONE", avance: 18 },
];

/* ---------------------------------------------------------------------
   HABILIDADES
   --------------------------------------------------------------------- */
const HABILIDADES = [
  { grupo: "Soporte", nota: "Mi día a día", items: ["Soporte remoto", "UltraViewer", "AnyDesk", "Sistemas CONTPAQi", "Instalación y actualización", "Atención a clientes", "Diagnóstico de equipos"] },
  { grupo: "Python", nota: "Mis herramientas", items: ["Python", "PySide6", "PyMuPDF", "GeoPandas", "Apps locales con HTML"] },
  { grupo: "Móvil", nota: "Lo que estoy aprendiendo", items: ["Flutter", "Dart", "Firebase", "Material 3", "Android"] },
  { grupo: "Web", nota: "", items: ["HTML", "CSS", "JavaScript", "Apps instalables (PWA)", "Diseño responsivo"] },
  { grupo: "Videojuegos", nota: "Donde empecé", items: ["Unity", "C#", "Gamificación", "UX para niños"] },
  { grupo: "Herramientas", nota: "", items: ["Git", "GitHub", "VS Code", "Prompting con IA", "Canva"] },
];

/* ---------------------------------------------------------------------
   CERTIFICACIONES
   - tipo: "formacion" (programa de varios cursos) o "curso"
   - area: "tecnica" o "personal"
   - destacada: true → aparece en la página de inicio
   --------------------------------------------------------------------- */
const CERTIFICACIONES = [
  {
    titulo: "Principiante en Programación G9 – ONE", tipo: "formacion", area: "tecnica", horas: 78, cursos: 10, fecha: "2025",
    imagen: "asset/certificaciones/principiante-programacion-g9.webp", destacada: true,
    url: "https://app.aluracursos.com/degree/certificate/bbae76af-2887-41c3-9c6a-2821bf80e520?lang",
    temas: ["Lógica de programación", "HTML y CSS", "JavaScript", "Git y GitHub", "IA generativa"]
  },
  {
    titulo: "Desarrollo Personal G9 – ONE", tipo: "formacion", area: "personal", horas: 43, cursos: 5, fecha: "2025",
    imagen: "asset/certificaciones/desarrollo-personal-g9.webp", destacada: true,
    url: "https://app.aluracursos.com/degree/certificate/12227bc4-b631-4719-a764-62a3f5e142f6?lang=es",
    temas: ["Marca personal", "LinkedIn", "Hábitos y metas", "Aprendizaje con IA"]
  },
  {
    titulo: "Lógica de programación con JavaScript", tipo: "formacion", area: "tecnica", horas: 24, cursos: 3, fecha: "2025",
    imagen: "asset/certificaciones/logica-javascript-formacion.webp", destacada: true,
    url: "https://app.aluracursos.com/degree/certificate/b09d6cea-24c2-429d-9211-f932b3aa609a?lang",
    temas: ["Algoritmos", "Estructuras de datos", "Git y GitHub"]
  },

  { titulo: "Lógica de programación: sumérgete en la programación con JavaScript", tipo: "curso", area: "tecnica", fecha: "2025", imagen: "asset/certificaciones/logica-javascript.webp" },
  { titulo: "Practicando lógica de programación: Challenge Amigo Secreto", tipo: "curso", area: "tecnica", horas: 10, fecha: "2025", imagen: "asset/certificaciones/challenge-amigo-secreto.webp" },
  { titulo: "Git y GitHub: repositorio, commit y versiones", tipo: "curso", area: "tecnica", fecha: "2025", imagen: "asset/certificaciones/git-github.webp" },
  { titulo: "HTML y CSS: ambientes de desarrollo, estructura de archivos y tags", tipo: "curso", area: "tecnica", fecha: "2025", imagen: "asset/certificaciones/html-css-ambientes.webp" },
  { titulo: "HTML y CSS: clases, posicionamiento y Flexbox", tipo: "curso", area: "tecnica", fecha: "2025", imagen: "asset/certificaciones/html-css-flexbox.webp" },
  { titulo: "HTML y CSS: header, footer y variables CSS", tipo: "curso", area: "tecnica", fecha: "2025", imagen: "asset/certificaciones/html-css-header-footer.webp" },
  { titulo: "HTML y CSS: trabajando con responsividad y publicación de proyectos", tipo: "curso", area: "tecnica", fecha: "2025", imagen: "asset/certificaciones/html-css-responsividad.webp" },
  { titulo: "IA: explorando el potencial de la inteligencia artificial generativa", tipo: "curso", area: "tecnica", fecha: "2025", imagen: "asset/certificaciones/ia-generativa.webp" },
  { titulo: "Ingeniería de prompt: creando prompts eficaces para la IA generativa", tipo: "curso", area: "tecnica", fecha: "2025", imagen: "asset/certificaciones/ingenieria-prompt.webp" },

  { titulo: "Aprender a aprender: técnicas para tu autodesarrollo", tipo: "curso", area: "personal", fecha: "2025", imagen: "asset/certificaciones/aprender-a-aprender.webp" },
  { titulo: "Aprendizaje con IA: personalizando tu rutina con ChatGPT", tipo: "curso", area: "personal", fecha: "2025", imagen: "asset/certificaciones/aprendizaje-con-ia.webp" },
  { titulo: "Foco: enfocarse trae más resultados para el día a día", tipo: "curso", area: "personal", fecha: "2025", imagen: "asset/certificaciones/foco.webp" },
  { titulo: "Hábitos: ser productivo para cumplir sus metas personales", tipo: "curso", area: "personal", fecha: "2025", imagen: "asset/certificaciones/habitos.webp" },
  { titulo: "LinkedIn para profesionales: construye tu marca y genera oportunidades", tipo: "curso", area: "personal", fecha: "2025", imagen: "asset/certificaciones/linkedin-profesionales.webp" },
];
