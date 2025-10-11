// certificaciones.js - VERSIÓN ACTUALIZADA CON TU BASE DE DATOS
document.addEventListener('DOMContentLoaded', function () {
    cargarCertificacionesDestacadas();
});

// ===== CARGAR CERTIFICACIONES DESTACADAS =====
function cargarCertificacionesDestacadas() {
    const contenedorCertificaciones = document.getElementById('certificaciones-container');

    if (!contenedorCertificaciones) {
        console.warn('Contenedor de certificaciones no encontrado');
        return;
    }

    // Verificar si hay certificaciones
    if (!certificacionesDB || certificacionesDB.length === 0) {
        mostrarEstadoVacioCertificaciones(contenedorCertificaciones);
        return;
    }

    // Filtrar solo las certificaciones destacadas (máximo 3)
    const certificacionesDestacadas = certificacionesDB
        .filter(c => c.destacado === true)
        .slice(0, 3);

    console.log('Certificaciones destacadas encontradas:', certificacionesDestacadas.length);

    if (certificacionesDestacadas.length === 0) {
        mostrarEstadoSinDestacadas(contenedorCertificaciones);
        return;
    }

    // Generar HTML de las certificaciones destacadas
    const certificacionesHTML = certificacionesDestacadas.map(certificacion =>
        crearTarjetaCertificacion(certificacion)
    ).join('');

    // Reemplazar el contenido del contenedor
    contenedorCertificaciones.innerHTML = certificacionesHTML;
}

// ===== CREAR TARJETA DE CERTIFICACIÓN =====
function crearTarjetaCertificacion(certificacion) {
    return `
        <div class="formacion-item destacado">
            <div class="formacion-header">
                <h4 class="formacion-nombre">${certificacion.formacion_titulo}</h4>
                <span class="formacion-fecha">${certificacion.año}</span>
            </div>
            <p class="formacion-institucion">${certificacion.institucion} · ${certificacion.horas} horas · ${certificacion.cursos} cursos</p>
            <p class="formacion-descripcion">
                ${certificacion.descripcionCorta}
            </p>
            ${crearTecnologiasCertificacion(certificacion.tecnologias_aprendidas)}
            ${crearEnlacesCertificacion(certificacion)}
        </div>
    `;
}

// ===== FUNCIONES AUXILIARES =====
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

// ===== ESTADOS =====
function mostrarEstadoVacioCertificaciones(contenedor) {
    contenedor.innerHTML = `
        <div class="estado-vacio-certificaciones">
            <p>No hay certificaciones disponibles en este momento.</p>
        </div>
    `;
}

function mostrarEstadoSinDestacadas(contenedor) {
    contenedor.innerHTML = `
        <div class="estado-vacio-certificaciones">
            <p>No hay certificaciones destacadas disponibles.</p>
        </div>
    `;
}