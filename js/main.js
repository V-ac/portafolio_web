// Sistema de Modal y Proyectos
document.addEventListener('DOMContentLoaded', function () {
    inicializarModal();
    cargarProyectosDestacados();
});

// ===== SISTEMA MODAL =====
function inicializarModal() {
    const modal = document.getElementById('modal-proyecto');
    const btnCerrar = document.getElementById('modalCerrar');

    // Cerrar modal con botón
    btnCerrar.addEventListener('click', cerrarModal);

    // Cerrar modal haciendo click fuera
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('mostrar')) {
            cerrarModal();
        }
    });
}

function abrirModal(proyectoId) {
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

    // ACTUALIZAR: Usar la nueva función de enlaces
    actualizarEnlacesModal(proyecto);

    // Mostrar modal
    document.getElementById('modal-proyecto').classList.add('mostrar');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    document.getElementById('modal-proyecto').classList.remove('mostrar');
    document.body.style.overflow = '';
}

// ===== CARGAR PROYECTOS DESTACADOS =====
function cargarProyectosDestacados() {
    const grid = document.querySelector('.proyectos-grid');
    if (!grid) return;

    // Filtrar proyectos destacados (máximo 2)
    const proyectosDestacados = proyectosDB
        .filter(p => p.destacado)
        .slice(0, 2);

    grid.innerHTML = proyectosDestacados.map(proyecto =>
        crearTarjetaProyecto(proyecto)
    ).join('');
}

function crearTarjetaProyecto(proyecto) {
    return `
        <article class="proyecto-card">
            <div class="proyecto-imagen">
                <img src="./asset/proyectos/${proyecto.imagen}" alt="${proyecto.titulo}">
                <div class="proyecto-badge">${proyecto.año}</div>
                <div class="proyecto-overlay">
                    <span class="overlay-text">🔍 Ver detalles</span>
                </div>
            </div>
            
            <div class="proyecto-contenido">
                <h3 class="proyecto-nombre">${proyecto.titulo}</h3>
                <p class="proyecto-descripcion">${proyecto.descripcionCorta}</p>
                
                <div class="proyecto-tech">
                    ${proyecto.tecnologias.slice(0, 3).map(tech =>
        `<span class="tech-tag">${tech}</span>`
    ).join('')}
                </div>
                
                <div class="proyecto-enlaces">
                    <button class="ver-detalles" onclick="abrirModal(${proyecto.id})">
                        🔍 Ver detalles completos
                    </button>
                </div>
            </div>
        </article>
    `;
}

// ===== FUNCIÓN ACTUALIZADA PARA ENLACES DEL MODAL =====
function actualizarEnlacesModal(proyecto) {
    const demoContainer = document.getElementById('modalDemo');
    const codigoContainer = document.getElementById('modalCodigo');

    // Limpiar contenedores
    demoContainer.innerHTML = '';
    codigoContainer.innerHTML = '';

    // Remover clases previas
    demoContainer.classList.remove('no-disponible');
    codigoContainer.classList.remove('no-disponible');

    // ===== MANEJO DE DEMO =====
    if (proyecto.enlaces && proyecto.enlaces.demo && proyecto.enlaces.demo.disponible) {
        demoContainer.innerHTML = crearEnlaceDemo(proyecto.enlaces.demo);
    } else {
        demoContainer.innerHTML = crearMensajeNoDisponible('demo');
        demoContainer.classList.add('no-disponible');
    }

    // ===== MANEJO DE CÓDIGO =====
    if (proyecto.enlaces && proyecto.enlaces.codigo && proyecto.enlaces.codigo.disponible) {
        codigoContainer.innerHTML = crearEnlaceCodigo(proyecto.enlaces.codigo);
    } else {
        codigoContainer.innerHTML = crearMensajeNoDisponible('codigo');
        codigoContainer.classList.add('no-disponible');
    }
}

// ===== FUNCIONES AUXILIARES =====
function crearEnlaceDemo(enlaceDemo) {
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

function crearEnlaceCodigo(enlaceCodigo) {
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

function crearMensajeNoDisponible(tipo) {
    const mensajes = {
        'demo': '🚫 Demo no disponible',
        'codigo': '🔒 Código no disponible'
    };

    return `<div class="no-disponible-texto">${mensajes[tipo]}</div>`;
}

// ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMACIÓN DE HABILIDADES AL HACER SCROLL =====
function animarBarrasHabilidades() {
    const barras = document.querySelectorAll('.habilidad-progreso');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const barra = entry.target;
                const porcentaje = barra.style.width;
                barra.style.width = '0%';

                setTimeout(() => {
                    barra.style.width = porcentaje;
                }, 200);

                observer.unobserve(barra);
            }
        });
    }, { threshold: 0.5 });

    barras.forEach(barra => observer.observe(barra));
}

// Control del estado del body cuando el menú está abierto
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const body = document.body;

    menuToggle.addEventListener('change', function () {
        if (this.checked) {
            body.classList.add('menu-open');
        } else {
            body.classList.remove('menu-open');
        }
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.checked = false;
            body.classList.remove('menu-open');
        });
    });

    // Cerrar menú al hacer clic en el overlay
    document.querySelector('.menu-overlay').addEventListener('click', function () {
        menuToggle.checked = false;
        body.classList.remove('menu-open');
    });
});

//Certificaciones



// Inicializar animaciones cuando la página carga
window.addEventListener('load', animarBarrasHabilidades);