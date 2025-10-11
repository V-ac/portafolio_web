document.addEventListener('DOMContentLoaded', function () {
    // Eventos del DOM
    const certificadosContainer = document.getElementById('certificacionesCompletas');

    if (!certificadosContainer) {
        console.error('No se encontró el contenedor con id "certificacionesCompletas"');
        return;
    }

    let certificacionesCargadas = [];

    // Inicializar la página
    function inicializar() {
        cargarCertificados();
        inicializarModalCertificaciones();
    }

    // Inicializar modal específico para certificaciones completas
    function inicializarModalCertificaciones() {
        const modal = document.getElementById('modal-certificacion');
        const btnCerrar = document.getElementById('modalCerrar');

        if (!modal || !btnCerrar) {
            console.warn('Modal no encontrado en la página de certificaciones');
            return;
        }

        // Cerrar modal con botón
        btnCerrar.addEventListener('click', cerrarModalCertificaciones);

        // Cerrar modal click fuera
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                cerrarModalCertificaciones();
            }
        });

        // Cerrar con tecla ESC - CORREGIDO
        document.addEventListener('keydown', function (e) { // Añadí el parámetro 'e'
            if (e.key === 'Escape' && modal.classList.contains('mostrar')) {
                cerrarModalCertificaciones();
            }
        });
    }

    function abrirModalCertificaciones(certificadoId) {
        const certificado = certificacionesDB.find(p => p.id === certificadoId);
        if (!certificado) {
            console.warn('Certificación no encontrada con ID:', certificadoId);
            return;
        }

        // Llenar modal con datos de la certificación
       document.getElementById('modalTitulo').textContent = certificado.formacion_titulo;

        // Manejar imagen si existe - CORREGIDO
        const modalImagen = document.getElementById('modalImagen');
        if (certificado.imagen) {
            modalImagen.src = `./asset/certificaciones/${certificado.imagen}`;
            modalImagen.alt = certificado.formacion_titulo;
        } else {
            // Si no hay imagen, usar un placeholder o ocultar
            modalImagen.style.display = 'none';
        }

        document.getElementById('modalAño').textContent = certificado.año;

        // Tecnologías aprendidas
        const tecnologiasContainer = document.getElementById('modalTecnologias');
        if (tecnologiasContainer && certificado.tecnologias_aprendidas) {
            tecnologiasContainer.innerHTML = certificado.tecnologias_aprendidas.map(tech =>
                `<span class="tech-tag">${tech}</span>`
            ).join('');
        }

        // Descripción larga - CORREGIDO
        const modalDescripcion = document.getElementById('modalDescripcion');
        if (modalDescripcion) {
            modalDescripcion.innerHTML = certificado.descripcionLarga || certificado.descripcionCorta;
        }

        // Mostrar modal - CORREGIDO (usar el id correcto)
        const modal = document.getElementById('modal-certificacion');
        if (modal) {
            modal.classList.add('mostrar');
            document.body.style.overflow = 'hidden';
        }
    }

    function cerrarModalCertificaciones() {
        const modal = document.getElementById('modal-certificacion');
        if (modal) {
            modal.classList.remove('mostrar');
            document.body.style.overflow = '';
        }
    }

    // Función para tecnologías de certificación - AÑADIDA
    function crearTecnologiasCertificacion(tecnologias) {
        if (!tecnologias || tecnologias.length === 0) return '';

        return `
            <div class="formacion-tech">
                ${tecnologias.map(tech => `
                    <span class="tech-tag">${tech}</span>
                `).join('')}
            </div>
        `;
    }

    // Función para enlaces de certificación
    function crearEnlacesCertificacion(certificacion) {
        if (!certificacion.enlaces || !certificacion.enlaces.url) return '';

        let enlacesHTML = '<div class="formacion-enlaces">';

        enlacesHTML += `
            <a href="${certificacion.enlaces.url}" class="enlace-certificado" target="_blank" rel="noopener">
                <span class="enlace-icono">🔍</span>
                Ver Certificado
            </a>
        `;

        if (certificacion.id_credencial) {
            enlacesHTML += `<span class="credencial-id">Credencial ID: ${certificacion.id_credencial}</span>`;
        }

        enlacesHTML += '</div>';
        return enlacesHTML;
    }

    function cargarCertificados() {
        console.log('Iniciando carga de certificaciones...');

        // Limpiar estado de carga
        certificadosContainer.innerHTML = '';

        // Verificar si hay certificaciones
        if (!certificacionesDB || certificacionesDB.length === 0) {
            console.warn('No hay certificaciones en la base de datos');
            mostrarEstadoVacio();
            return;
        }

        console.log('Certificaciones encontradas:', certificacionesDB.length);

        // Guardar referencia a las certificaciones
        certificacionesCargadas = certificacionesDB;

        // Mostrar todas las certificaciones
        mostrarCertificaciones(certificacionesDB);
    }

    // Mostrar certificaciones en el grid
    function mostrarCertificaciones(certificaciones) {
        if (certificaciones.length === 0) {
            mostrarEstadoSinResultados();
            return;
        }

        const certificacionesHTML = certificaciones.map(certificacion => crearTarjetaCertificacion(certificacion)).join('');
        certificadosContainer.innerHTML = certificacionesHTML;

        console.log('Certificaciones renderizadas:', certificaciones.length);

        // Añadir event listeners para los botones de detalles
        configurarBotonesDetalles();
    }

    // En certificaciones-completas.js - Actualizar la función crearTarjetaCertificacion
    function crearTarjetaCertificacion(certificacion) {
        return `
    <div class="certificacion-card" data-id="${certificacion.id}">
        <!-- Header simple con título e institución -->
        <div class="certificacion-header">
            <div class="certificacion-badge">📜</div>
            <div class="certificacion-info">
                <h3 class="certificacion-titulo">${certificacion.formacion_titulo}</h3>
                <p class="certificacion-institucion">${certificacion.institucion} · ${certificacion.año}</p>
            </div>
        </div>
        
        <!-- Contenido principal -->
        <div class="certificacion-contenido">
            <!-- Detalles rápidos -->
            <div class="certificacion-meta">
                <span class="meta-item">⏱️ ${certificacion.horas}h</span>
                <span class="meta-item">📚 ${certificacion.cursos} cursos</span>
            </div>
            
            <!-- Descripción corta -->
            <p class="certificacion-descripcion">
                ${certificacion.descripcionCorta}
            </p>
            
            <!-- Tecnologías aprendidas -->
            ${crearTecnologiasCertificacion(certificacion.tecnologias_aprendidas)}
            
            <!-- Acciones -->
            <div class="certificacion-acciones">
                <a href="${certificacion.enlaces.url}" class="btn-certificado" target="_blank">
                    🔍 Ver certificado
                </a>
                <button class="btn-detalles" onclick="abrirModalCertificaciones(${certificacion.id})">
                    📖 Más detalles
                </button>
            </div>
            
            <!-- Credencial ID (si existe) -->
            ${certificacion.id_credencial ?
                `<div class="credencial-info">
                    <small>ID: ${certificacion.id_credencial}</small>
                </div>`
                : ''}
        </div>
    </div>

    `;
    }

    // Configurar botones de detalles
    function configurarBotonesDetalles() {
        console.log('Botones de detalles configurados para modal de certificaciones');
    }

    // Mostrar estado cuando no hay certificaciones
    function mostrarEstadoVacio() {
        certificadosContainer.innerHTML = `
            <div class="estado-vacio">
                <h3>📝 No hay certificaciones disponibles</h3>
                <p>Actualmente no hay certificaciones para mostrar. ¡Pronto agregaré nuevas certificaciones!</p>
            </div>
        `;
    }

    function mostrarEstadoSinResultados() {
        certificadosContainer.innerHTML = `
            <div class="estado-vacio">
                <h3>🔍 No se encontraron certificaciones</h3>
                <p>No hay certificaciones que coincidan con los criterios de búsqueda.</p>
            </div>
        `;
    }

    // Hacer las funciones disponibles globalmente
    window.abrirModalCertificaciones = abrirModalCertificaciones;
    window.cerrarModalCertificaciones = cerrarModalCertificaciones;

    // Inicializar la página
    inicializar();
});