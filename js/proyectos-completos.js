// proyectos-completos.js
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const proyectosContainer = document.getElementById('proyectosCompletos');
    const filtrosContainer = document.querySelector('.filtros-proyectos');
    let proyectosCargados = [];

    // Inicializar la página
    function inicializar() {
        cargarProyectos();
        configurarFiltros();
        inicializarModalProyectos();
    }

    // Inicializar modal específico para proyectos completos
    function inicializarModalProyectos() {
        const modal = document.getElementById('modal-proyecto');
        const btnCerrar = document.getElementById('modalCerrar');

        if (!modal || !btnCerrar) {
            console.warn('Modal no encontrado en la página de proyectos');
            return;
        }

        // Cerrar modal con botón
        btnCerrar.addEventListener('click', cerrarModalProyectos);

        // Cerrar modal haciendo click fuera
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                cerrarModalProyectos();
            }
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('mostrar')) {
                cerrarModalProyectos();
            }
        });
    }

    function abrirModalProyectos(proyectoId) {
        const proyecto = proyectosDB.find(p => p.id === proyectoId);
        if (!proyecto) return;

        // Llenar modal con datos del proyecto
        document.getElementById('modalTitulo').textContent = proyecto.titulo;
        document.getElementById('modalImagen').src = `./asset/proyectos/${proyecto.imagen}`;
        document.getElementById('modalImagen').alt = proyecto.titulo;
        document.getElementById('modalAño').textContent = proyecto.año;

        // Tecnologías
        const tecnologiasContainer = document.getElementById('modalTecnologias');
        tecnologiasContainer.innerHTML = proyecto.tecnologias.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        // Descripción larga
        document.getElementById('modalDescripcion').innerHTML = proyecto.descripcionLarga;

        // Actualizar enlaces del modal
        actualizarEnlacesModalProyectos(proyecto);

        // Mostrar modal
        document.getElementById('modal-proyecto').classList.add('mostrar');
        document.body.style.overflow = 'hidden';
    }

    function cerrarModalProyectos() {
        document.getElementById('modal-proyecto').classList.remove('mostrar');
        document.body.style.overflow = '';
    }

    // Función específica para actualizar enlaces en proyectos completos
    function actualizarEnlacesModalProyectos(proyecto) {
        const demoContainer = document.getElementById('modalDemo');
        const codigoContainer = document.getElementById('modalCodigo');

        if (!demoContainer || !codigoContainer) {
            console.warn('Contenedores de enlaces del modal no encontrados');
            return;
        }

        // Limpiar contenedores
        demoContainer.innerHTML = '';
        codigoContainer.innerHTML = '';

        // Remover clases previas
        demoContainer.classList.remove('no-disponible');
        codigoContainer.classList.remove('no-disponible');

        // ===== MANEJO DE DEMO =====
        if (proyecto.enlaces && proyecto.enlaces.demo && proyecto.enlaces.demo.disponible) {
            demoContainer.innerHTML = crearEnlaceDemoProyectos(proyecto.enlaces.demo);
        } else {
            demoContainer.innerHTML = crearMensajeNoDisponibleProyectos('demo');
            demoContainer.classList.add('no-disponible');
        }

        // ===== MANEJO DE CÓDIGO =====
        if (proyecto.enlaces && proyecto.enlaces.codigo && proyecto.enlaces.codigo.disponible) {
            codigoContainer.innerHTML = crearEnlaceCodigoProyectos(proyecto.enlaces.codigo);
        } else {
            codigoContainer.innerHTML = crearMensajeNoDisponibleProyectos('codigo');
            codigoContainer.classList.add('no-disponible');
        }
    }

    // Funciones auxiliares específicas para proyectos completos
    function crearEnlaceDemoProyectos(enlaceDemo) {
        const iconosPlataformas = {
            'Google Play': '📱',
            'App Store': '🍎',
            'Web': '🌐',
            'APK': '📦',
            'Video': '🎬',
            'default': '🎮'
        };

        const icono = iconosPlataformas[enlaceDemo.plataforma] || iconosPlataformas.default;

        return `
            <a href="${enlaceDemo.url}" class="enlace-demo" target="_blank" rel="noopener">
                ${icono} Ver Demo
                ${enlaceDemo.plataforma ? `<span class="plataforma-badge">${enlaceDemo.plataforma}</span>` : ''}
            </a>
        `;
    }

    function crearEnlaceCodigoProyectos(enlaceCodigo) {
        const iconosPlataformas = {
            'GitHub': '🐙',
            'GitLab': '🦊',
            'Bitbucket': '🗑️',
            'CodePen': '🖊️',
            'default': '📁'
        };

        const icono = iconosPlataformas[enlaceCodigo.plataforma] || iconosPlataformas.default;

        return `
            <a href="${enlaceCodigo.url}" class="enlace-codigo" target="_blank" rel="noopener">
                ${icono} Ver Código
                ${enlaceCodigo.plataforma ? `<span class="plataforma-badge">${enlaceCodigo.plataforma}</span>` : ''}
            </a>
        `;
    }

    function crearMensajeNoDisponibleProyectos(tipo) {
        const mensajes = {
            'demo': '🚫 Demo no disponible',
            'codigo': '🔒 Código no disponible'
        };

        return `<div class="no-disponible-texto">${mensajes[tipo]}</div>`;
    }

    // Cargar y mostrar todos los proyectos
    function cargarProyectos() {
        // Limpiar estado de carga
        proyectosContainer.innerHTML = '';

        // Verificar si hay proyectos
        if (!proyectosDB || proyectosDB.length === 0) {
            mostrarEstadoVacio();
            return;
        }

        // Guardar referencia a los proyectos
        proyectosCargados = proyectosDB;

        // Mostrar todos los proyectos
        mostrarProyectos(proyectosDB);

        // Actualizar contador de filtros
        actualizarContadorFiltros('todos');
    }

    // Mostrar proyectos en el grid
    function mostrarProyectos(proyectos) {
        if (proyectos.length === 0) {
            mostrarEstadoSinResultados();
            return;
        }

        const proyectosHTML = proyectos.map(proyecto => crearTarjetaProyecto(proyecto)).join('');
        proyectosContainer.innerHTML = proyectosHTML;

        // Añadir event listeners para los botones de detalles
        configurarBotonesDetalles();
    }

    // Crear tarjeta de proyecto individual
    function crearTarjetaProyecto(proyecto) {
        const tecnologiasHTML = proyecto.tecnologias.map(tech =>
            `<span class="tech-tag-completo">${tech}</span>`
        ).join('');

        // Generar etiquetas de categoría
        const categoriasHTML = Array.isArray(proyecto.categoria)
            ? proyecto.categoria.map(cat => `<span class="etiqueta-categoria">${cat}</span>`).join('')
            : `<span class="etiqueta-categoria">${proyecto.categoria}</span>`;

        return `
            <article class="proyecto-card-completo" data-categorias="${Array.isArray(proyecto.categoria) ? proyecto.categoria.join(',') : proyecto.categoria}" data-id="${proyecto.id}">
                <div class="proyecto-header-completo">
                    <img src="./asset/proyectos/${proyecto.imagen}" alt="${proyecto.titulo}" class="proyecto-imagen-completa">
                    <div class="etiquetas-proyecto">
                        ${categoriasHTML}
                        <span class="etiqueta-año">${proyecto.año}</span>
                    </div>
                </div>
                
                <div class="proyecto-contenido-completo">
                    <h3 class="proyecto-titulo-completo">${proyecto.titulo}</h3>
                    <p class="proyecto-descripcion-completa">${proyecto.descripcionCorta}</p>
                    
                    <div class="proyecto-tech-completo">
                        ${tecnologiasHTML}
                    </div>
                    
                    <div class="proyecto-enlaces">
                        <button class="ver-detalles" onclick="abrirModalProyectos(${proyecto.id})">
                            🔍 Ver detalles completos
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    // Configurar sistema de filtros
    function configurarFiltros() {
        const filtros = document.querySelectorAll('.filtro');

        filtros.forEach(filtro => {
            filtro.addEventListener('click', function () {
                // Remover clase activa de todos los filtros
                filtros.forEach(f => f.classList.remove('activo'));

                // Añadir clase activa al filtro clickeado
                this.classList.add('activo');

                // Obtener categoría seleccionada
                const categoria = this.dataset.categoria;

                // Filtrar proyectos
                filtrarProyectos(categoria);

                // Actualizar contador
                actualizarContadorFiltros(categoria);
            });
        });
    }

    // Filtrar proyectos por categoría
    function filtrarProyectos(categoriaSeleccionada) {
        const todasLasTarjetas = document.querySelectorAll('.proyecto-card-completo');

        if (categoriaSeleccionada === 'todos') {
            // Mostrar todos los proyectos
            todasLasTarjetas.forEach(tarjeta => {
                tarjeta.classList.remove('oculto');
                tarjeta.classList.add('visible');
            });
        } else {
            // Filtrar por categoría específica
            todasLasTarjetas.forEach(tarjeta => {
                const categoriasProyecto = tarjeta.dataset.categorias.split(',');

                if (categoriasProyecto.includes(categoriaSeleccionada)) {
                    tarjeta.classList.remove('oculto');
                    tarjeta.classList.add('visible');
                } else {
                    tarjeta.classList.remove('visible');
                    tarjeta.classList.add('oculto');
                }
            });
        }
    }

    // Actualizar contador de proyectos visibles
    function actualizarContadorFiltros(categoria) {
        const contador = document.querySelector('.contador-proyectos');

        if (!contador) {
            // Crear contador si no existe
            const hero = document.querySelector('.hero-proyectos');
            const contadorHTML = `<div class="contador-proyectos">Mostrando <span class="contador-numero">${proyectosCargados.length}</span> proyectos</div>`;
            hero.insertAdjacentHTML('beforeend', contadorHTML);
        } else {
            // Actualizar contador existente
            const numero = document.querySelector('.contador-numero');
            if (categoria === 'todos') {
                numero.textContent = proyectosCargados.length;
            } else {
                const proyectosVisibles = document.querySelectorAll('.proyecto-card-completo.visible').length;
                numero.textContent = proyectosVisibles;
            }
        }
    }

    // Configurar botones de detalles
    function configurarBotonesDetalles() {
        // Los botones ya están configurados con onclick en el HTML
        console.log('Botones de detalles configurados para modal');
    }

    // Mostrar estado cuando no hay proyectos
    function mostrarEstadoVacio() {
        proyectosContainer.innerHTML = `
            <div class="estado-vacio">
                <h3>📝 No hay proyectos disponibles</h3>
                <p>Actualmente no hay proyectos para mostrar. ¡Pronto agregaré nuevos trabajos!</p>
            </div>
        `;
    }

    // Mostrar estado cuando no hay resultados de filtro
    function mostrarEstadoSinResultados() {
        proyectosContainer.innerHTML = `
            <div class="estado-vacio">
                <h3>🔍 No se encontraron proyectos</h3>
                <p>No hay proyectos que coincidan con el filtro seleccionado. Intenta con otra categoría.</p>
            </div>
        `;
    }

    // Generar filtros dinámicamente basados en las categorías disponibles
    function generarFiltrosDinamicos() {
        const categoriasUnicas = new Set();

        proyectosDB.forEach(proyecto => {
            if (Array.isArray(proyecto.categoria)) {
                proyecto.categoria.forEach(cat => categoriasUnicas.add(cat));
            } else {
                categoriasUnicas.add(proyecto.categoria);
            }
        });

        // Convertir Set a Array y ordenar alfabéticamente
        const categoriasArray = Array.from(categoriasUnicas).sort();

        // Generar HTML de filtros
        let filtrosHTML = '<button class="filtro activo" data-categoria="todos">Todos</button>';

        categoriasArray.forEach(categoria => {
            filtrosHTML += `<button class="filtro" data-categoria="${categoria}">${categoria}</button>`;
        });

        // Actualizar contenedor de filtros
        filtrosContainer.innerHTML = filtrosHTML;

        // Reconfigurar event listeners
        configurarFiltros();
    }

    // Hacer las funciones disponibles globalmente para los onclick
    window.abrirModalProyectos = abrirModalProyectos;
    window.cerrarModalProyectos = cerrarModalProyectos;

    // Inicializar la página
    inicializar();

    // Opcional: Generar filtros dinámicamente (comenta esta línea si quieres usar los filtros estáticos del HTML)
    // generarFiltrosDinamicos();
});