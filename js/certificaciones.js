/* Página de certificaciones */
document.addEventListener("DOMContentLoaded", () => {
  const formaciones = CERTIFICACIONES.filter((c) => c.tipo === "formacion");
  const cursos = CERTIFICACIONES.filter((c) => c.tipo === "curso");

  document.getElementById("resumen").innerHTML = `
    <span><b>${formaciones.length}</b>formaciones</span>
    <span><b>${cursos.length}</b>cursos</span>`;

  document.getElementById("formaciones").innerHTML = formaciones.map((c) => `
    <article class="formacion">
      <button type="button" class="ver" data-ver="${CERTIFICACIONES.indexOf(c)}" aria-label="Ver certificado de ${esc(c.titulo)}">
        <img src="${c.imagen}" alt="" loading="lazy">
      </button>
      <div class="formacion-info">
        <h3>${esc(c.titulo)}</h3>
        <p class="datos">Alura Latam · ${c.horas} horas · ${c.cursos} cursos · ${c.fecha}</p>
        <ul class="tags">${(c.temas || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        ${c.url ? `<a class="enlace" href="${c.url}" target="_blank" rel="noopener">Verificar credencial</a>` : ""}
      </div>
    </article>`).join("");

  const contCursos = document.getElementById("cursos");
  const pintarCursos = (filtro) => {
    contCursos.innerHTML = cursos
      .filter((c) => filtro === "todos" || c.area === filtro)
      .map((c) => `
        <button type="button" class="curso" data-ver="${CERTIFICACIONES.indexOf(c)}">
          <img src="${c.imagen}" alt="" loading="lazy">
          <span><strong>${esc(c.titulo)}</strong><span>${c.area === "tecnica" ? "Técnico" : "Desarrollo personal"}${c.horas ? ` · ${c.horas} horas` : ""}</span></span>
        </button>`).join("");
  };
  pintarCursos("todos");

  document.querySelectorAll("[data-filtro]").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll("[data-filtro]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      pintarCursos(b.dataset.filtro);
    });
  });

  // Visor de certificado
  const visor = document.getElementById("visor");
  document.body.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ver]");
    if (!b) return;
    const c = CERTIFICACIONES[Number(b.dataset.ver)];
    const img = document.getElementById("visorImg");
    img.src = c.imagen;
    img.alt = `Certificado: ${c.titulo}`;
    document.getElementById("visorTitulo").textContent = c.titulo;
    const link = document.getElementById("visorLink");
    link.hidden = !c.url;
    if (c.url) link.href = c.url;
    abrirDialogo(visor);
  });
});
