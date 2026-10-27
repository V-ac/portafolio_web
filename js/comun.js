/* Funciones compartidas por todas las páginas */
document.documentElement.classList.add("js");

const reduceMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function esc(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const ICONO_FLECHA_IZQ = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
const ICONO_FLECHA_DER = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

document.addEventListener("DOMContentLoaded", () => {
  // Año del pie
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();

  // Enlaces de perfil desde datos.js
  document.querySelectorAll("[data-perfil]").forEach((a) => {
    const clave = a.dataset.perfil;
    if (PERFIL[clave]) a.href = PERFIL[clave];
  });

  // El botón de CV solo aparece si el archivo existe
  if (PERFIL.cv && location.protocol.startsWith("http")) {
    fetch(PERFIL.cv, { method: "HEAD" })
      .then((r) => { if (r.ok) document.querySelectorAll(".solo-cv").forEach((li) => (li.hidden = false)); })
      .catch(() => {});
  }

  // Menú móvil
  const btn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");
  if (btn && menu) {
    const cerrar = () => { menu.classList.remove("abierto"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-label", "Abrir menú"); };
    btn.addEventListener("click", () => {
      const abierto = menu.classList.toggle("abierto");
      btn.setAttribute("aria-expanded", String(abierto));
      btn.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", cerrar));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(); });
    document.addEventListener("click", (e) => { if (!e.target.closest(".barra")) cerrar(); });
  }

  // Borde de la barra al hacer scroll
  const barra = document.querySelector(".barra");
  if (barra) {
    const marcar = () => barra.classList.toggle("con-borde", window.scrollY > 8);
    marcar();
    window.addEventListener("scroll", marcar, { passive: true });
  }

  // Cerrar diálogos con el botón o al hacer clic fuera
  document.querySelectorAll("dialog").forEach((d) => {
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-cerrar]")) d.close();
    });
    d.addEventListener("close", () => document.body.style.removeProperty("overflow"));
  });
});

function abrirDialogo(d) {
  document.body.style.overflow = "hidden";
  d.showModal();
  d.scrollTop = 0;
}
