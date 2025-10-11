/// Base de datos de proyectos - VERSIÓN OPTIMIZADA PARA RECLUTADORES
const proyectosDB = [
    {
        id: 1,
        titulo: "Math Adventure",
        descripcionCorta: "🎮 Videojuego educativo en Unity/Android para niños de 5-7 años",
        descripcionLarga: `
            <div class="proyecto-header">
                <h3>🚀 Transformando la Educación Matemática con Tecnología</h3>
                <p class="proyecto-contexto"><strong>Contexto:</strong> Desarrollado como proyecto de titulación universitaria para abordar la brecha en herramientas educativas 
                digitales para niños en edad preescolar/primaria.</p>
            </div>

            <div class="proyecto-impacto">
                <h4>🎯 Impacto y Propuesta de Valor</h4>
                <p>Math Adventure representa una <strong>innovación</strong> que combina <strong>trazo de números</strong> con <strong>cuentos animados 
                interactivos</strong> para hacer las matemáticas divertidas para niños en edad preescolar/primaria.</p>
            </div>

            <div class="proyecto-caracteristicas">
                <h4>💡 Características Destacadas</h4>
                <div class="caracteristicas-grid">
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">👶</span>
                        <div>
                            <strong>Interfaz Age-Appropriate</strong>
                            <p>Diseñada específicamente para niños de 5-7 años con elementos visuales grandes y controles intuitivos</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">✍️</span>
                        <div>
                            <strong>Sistema de Trazo Inteligente</strong>
                            <p>Algoritmo que evalúa y corrige el trazado de números en tiempo real con retroalimentación visual</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">📚</span>
                        <div>
                            <strong>Narrativa Educativa</strong>
                            <p>10 cuentos interactivos que contextualizan el aprendizaje y mantienen la motivación</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">🎭</span>
                        <div>
                            <strong>Personalización Avanzada</strong>
                            <p>Sistema de avatares customizables que fomenta la identificación emocional con el contenido</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="proyecto-logros">
                <h4>🏆 Logros Técnicos</h4>
                <ul>
                    <li><strong>Arquitectura Escalable:</strong> Base modular que permite añadir nuevos contenidos sin modificar el core del sistema</li>
                    <li><strong>Optimización de Rendimiento:</strong> 60 FPS estables en dispositivos de gama media-baja</li>
                </ul>
            </div>

            <div class="proyecto-habilidades">
                <h4>💪 Habilidades Demostradas</h4>
                <div class="habilidades-list">
                    <span class="habilidad-badge">Desarrollo de Videojuegos Educativos</span>
                    <span class="habilidad-badge">Diseño de UX para Niños</span>
                    <span class="habilidad-badge">Optimización para Móviles</span>
                    <span class="habilidad-badge">Gestión de Proyectos Complejos</span>
                </div>
            </div>
        `,
        imagen: "MathAdventure.jpeg",
        tecnologias: ["Unity", "Android", "C#", "UI/UX Infantil", "Gamificación", "Educación STEM"],
        año: 2023,
        categoria: ["Educación", "Juegos"],
        destacado: true,
        enlaces: {
            demo: {
                disponible: false,
                url: "",
                plataforma: null
            },
            codigo: {
                disponible: false,
                url: "",
                plataforma: null
            }
        }
    },
    {
        id: 2,
        titulo: "Crack the Code",
        descripcionCorta: "🧩 Videojuego educativo de acertijos con combinaciones estratégicas",
        descripcionLarga: `
            <div class="proyecto-header">
                <h3>🔍 Revolucionando el Aprendizaje de Lógica mediante Gamificación</h3>
                <p class="proyecto-contexto"><strong>Contexto:</strong> Desarrollado como servicio social para el <strong>CIMAT Zacatecas</strong>, es videojuego educativo desarrollado en Unity donde 
                los jugadores se convierten en <strong>detectives del conocimiento</strong> que deben descifrar acertijos mediante combinaciones limitadas.</p>
            </div>

            <div class="proyecto-impacto">
                <h4>🎯 Impacto Social y Educativo</h4>
                <p>Crack the Code democratiza el acceso al desarrollo de habilidades de pensamiento crítico y resolución de problemas mediante pistas.</p>
            </div>

            <div class="proyecto-caracteristicas">
                <h4>💡 Mecánicas de Juego Innovadoras</h4>
                <div class="caracteristicas-grid">
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">⚔️</span>
                        <div>
                            <strong>Modo VS CPU</strong>
                            <p>Algoritmo inteligente que genera combinaciones únicas adaptándose al nivel del jugador</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">👥</span>
                        <div>
                            <strong>Modo Personalizado</strong>
                            <p>Flexibilidad total para crear experiencias de aprendizaje colaborativo entre pares</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">📈</span>
                        <div>
                            <strong>Sistema de Dificultad Progresiva</strong>
                            <p>3 niveles de complejidad que desafían diferentes habilidades cognitivas</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">🎯</span>
                        <div>
                            <strong>Feedback Inteligente</strong>
                            <p>Sistema de pistas que guía el aprendizaje sin revelar soluciones directamente</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="proyecto-logros">
                <h4>🏆 Logros Técnicos</h4>
                <ul>
                    <li><strong>Algoritmo de Generación Adaptativa:</strong> Sistema que crea puzzles equilibrados según el perfil de usuario</li>
                    <li><strong>Arquitectura Multi-modal:</strong> Diseño flexible que soporta tanto juego individual como colaborativo</li>
                    <li><strong>Optimización de Experiencia:</strong> Interfaz minimalista que reduce la carga cognitiva</li>
                </ul>
            </div>

            <div class="proyecto-habilidades">
                <h4>💪 Habilidades Demostradas</h4>
                <div class="habilidades-list">
                    <span class="habilidad-badge">Desarrollo de Algoritmos</span>
                    <span class="habilidad-badge">Gamificación Educativa</span>
                    <span class="habilidad-badge">Trabajo con Instituciones</span>
                    <span class="habilidad-badge">Desarrollo para Impacto Social</span>
                    <span class="habilidad-badge">Optimización de Experiencia de Usuario</span>
                </div>
            </div>

            <div class="proyecto-disponibilidad">
                <h4>🎮 Disponible para Jugar</h4>
                <p>El juego está publicado y disponible para su uso educativo y de entretenimiento.</p>
            </div>
        `,
        imagen: "CrackTheCodeInicio.jpg",
        tecnologias: ["Unity", "C#", "Algoritmos", "Gamificación", "Lógica", "Educación"],
        año: 2023,
        categoria: ["Educación", "Juegos"],
        destacado: true,
        enlaces: {
            demo: {
                disponible: true,
                url: "https://mrtako.itch.io/prueba?secret=BzFQLb6KD3Lxx75TD7xyVrbl8U",
                plataforma: "Web"
            },
            codigo: {
                disponible: false,
                url: "",
                plataforma: null
            }
        }
    }, {
        id: 3,
        titulo: "Math Adventure",
        descripcionCorta: "🎮 Videojuego educativo en Unity/Android para niños de 5-7 años",
        descripcionLarga: `
            <div class="proyecto-header">
                <h3>🚀 Transformando la Educación Matemática con Tecnología</h3>
                <p class="proyecto-contexto"><strong>Contexto:</strong> Desarrollado como proyecto de titulación universitaria para abordar la brecha en herramientas educativas 
                digitales para niños en edad preescolar/primaria.</p>
            </div>

            <div class="proyecto-impacto">
                <h4>🎯 Impacto y Propuesta de Valor</h4>
                <p>Math Adventure representa una <strong>innovación</strong> que combina <strong>trazo de números</strong> con <strong>cuentos animados 
                interactivos</strong> para hacer las matemáticas divertidas para niños en edad preescolar/primaria.</p>
            </div>

            <div class="proyecto-caracteristicas">
                <h4>💡 Características Destacadas</h4>
                <div class="caracteristicas-grid">
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">👶</span>
                        <div>
                            <strong>Interfaz Age-Appropriate</strong>
                            <p>Diseñada específicamente para niños de 5-7 años con elementos visuales grandes y controles intuitivos</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">✍️</span>
                        <div>
                            <strong>Sistema de Trazo Inteligente</strong>
                            <p>Algoritmo que evalúa y corrige el trazado de números en tiempo real con retroalimentación visual</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">📚</span>
                        <div>
                            <strong>Narrativa Educativa</strong>
                            <p>10 cuentos interactivos que contextualizan el aprendizaje y mantienen la motivación</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">🎭</span>
                        <div>
                            <strong>Personalización Avanzada</strong>
                            <p>Sistema de avatares customizables que fomenta la identificación emocional con el contenido</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="proyecto-logros">
                <h4>🏆 Logros Técnicos</h4>
                <ul>
                    <li><strong>Arquitectura Escalable:</strong> Base modular que permite añadir nuevos contenidos sin modificar el core del sistema</li>
                    <li><strong>Optimización de Rendimiento:</strong> 60 FPS estables en dispositivos de gama media-baja</li>
                </ul>
            </div>

            <div class="proyecto-habilidades">
                <h4>💪 Habilidades Demostradas</h4>
                <div class="habilidades-list">
                    <span class="habilidad-badge">Desarrollo de Videojuegos Educativos</span>
                    <span class="habilidad-badge">Diseño de UX para Niños</span>
                    <span class="habilidad-badge">Optimización para Móviles</span>
                    <span class="habilidad-badge">Gestión de Proyectos Complejos</span>
                </div>
            </div>
        `,
        imagen: "MathAdventure.jpeg",
        tecnologias: ["Unity", "Android", "C#", "UI/UX Infantil", "Gamificación", "Educación STEM"],
        año: 2023,
        categoria: ["Educación", "Juegos"],
        destacado: true,
        enlaces: {
            demo: {
                disponible: false,
                url: "",
                plataforma: null
            },
            codigo: {
                disponible: false,
                url: "",
                plataforma: null
            }
        }
    }, {
        id: 4,
        titulo: "Math Adventure",
        descripcionCorta: "🎮 Videojuego educativo en Unity/Android para niños de 5-7 años",
        descripcionLarga: `
            <div class="proyecto-header">
                <h3>🚀 Transformando la Educación Matemática con Tecnología</h3>
                <p class="proyecto-contexto"><strong>Contexto:</strong> Desarrollado como proyecto de titulación universitaria para abordar la brecha en herramientas educativas 
                digitales para niños en edad preescolar/primaria.</p>
            </div>

            <div class="proyecto-impacto">
                <h4>🎯 Impacto y Propuesta de Valor</h4>
                <p>Math Adventure representa una <strong>innovación</strong> que combina <strong>trazo de números</strong> con <strong>cuentos animados 
                interactivos</strong> para hacer las matemáticas divertidas para niños en edad preescolar/primaria.</p>
            </div>

            <div class="proyecto-caracteristicas">
                <h4>💡 Características Destacadas</h4>
                <div class="caracteristicas-grid">
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">👶</span>
                        <div>
                            <strong>Interfaz Age-Appropriate</strong>
                            <p>Diseñada específicamente para niños de 5-7 años con elementos visuales grandes y controles intuitivos</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">✍️</span>
                        <div>
                            <strong>Sistema de Trazo Inteligente</strong>
                            <p>Algoritmo que evalúa y corrige el trazado de números en tiempo real con retroalimentación visual</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">📚</span>
                        <div>
                            <strong>Narrativa Educativa</strong>
                            <p>10 cuentos interactivos que contextualizan el aprendizaje y mantienen la motivación</p>
                        </div>
                    </div>
                    <div class="caracteristica-item">
                        <span class="caracteristica-icono">🎭</span>
                        <div>
                            <strong>Personalización Avanzada</strong>
                            <p>Sistema de avatares customizables que fomenta la identificación emocional con el contenido</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="proyecto-logros">
                <h4>🏆 Logros Técnicos</h4>
                <ul>
                    <li><strong>Arquitectura Escalable:</strong> Base modular que permite añadir nuevos contenidos sin modificar el core del sistema</li>
                    <li><strong>Optimización de Rendimiento:</strong> 60 FPS estables en dispositivos de gama media-baja</li>
                </ul>
            </div>

            <div class="proyecto-habilidades">
                <h4>💪 Habilidades Demostradas</h4>
                <div class="habilidades-list">
                    <span class="habilidad-badge">Desarrollo de Videojuegos Educativos</span>
                    <span class="habilidad-badge">Diseño de UX para Niños</span>
                    <span class="habilidad-badge">Optimización para Móviles</span>
                    <span class="habilidad-badge">Gestión de Proyectos Complejos</span>
                </div>
            </div>
        `,
        imagen: "MathAdventure.jpeg",
        tecnologias: ["Unity", "Android", "C#", "UI/UX Infantil", "Gamificación", "Educación STEM"],
        año: 2023,
        categoria: ["Educación", "Juegos"],
        destacado: true,
        enlaces: {
            demo: {
                disponible: false,
                url: "",
                plataforma: null
            },
            codigo: {
                disponible: false,
                url: "",
                plataforma: null
            }
        }
    }
];