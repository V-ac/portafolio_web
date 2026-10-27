/* Página de inicio */
document.addEventListener("DOMContentLoaded", () => {
  iniciarEstilo();
  pintarSobreMi();
  iniciarCalcomanias();
  iniciarGafete();
  pintarOrdenes();
  pintarBitacora();
  pintarHabilidades();
  iniciarEstudio();
  iniciarContacto();
  iniciarMenuActivo();
});


/* ===================================================================
   SOBRE MÍ
   =================================================================== */
function pintarSobreMi() {
  const cont = document.getElementById("sobreMi");
  if (cont) cont.innerHTML = SOBRE_MI.map((t) => `<p>${esc(t)}</p>`).join("");
}

/* ===================================================================
   ESTILO: diseño de presentación y color de fondo
   =================================================================== */
const FONDOS = [
  { id: "menta", nombre: "Menta", color: "#DDF6EE" },
  { id: "durazno", nombre: "Durazno", color: "#FFE3D3" },
  { id: "lavanda", nombre: "Lavanda", color: "#E6DFF7" },
  { id: "cielo", nombre: "Cielo", color: "#D9E9F8" },
];

function leer(clave) { try { return localStorage.getItem(clave); } catch { return null; } }
function guardar(clave, valor) { try { localStorage.setItem(clave, valor); } catch {} }

function iniciarEstilo() {
  const probando = new URLSearchParams(location.search).has("probar");
  const portadaValida = (v) => ["arco", "titulo", "gafete"].includes(v);
  const fondoValido = (v) => FONDOS.some((f) => f.id === v);

  let portada = ESTILO.portada;
  if (probando && portadaValida(leer("va-portada"))) portada = leer("va-portada");
  let fondo = fondoValido(leer("va-fondo")) ? leer("va-fondo") : ESTILO.fondo;

  const aplicarPortada = (v) => {
    portada = portadaValida(v) ? v : "arco";
    document.body.dataset.portada = portada;
    document.querySelectorAll(".hero").forEach((h) => {
      const activa = h.dataset.diseno === portada;
      if (activa) h.id = "inicio"; else h.removeAttribute("id");
    });
    document.querySelectorAll("#opsPortada [data-portada]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.portada === portada)));
  };
  const aplicarFondo = (v) => {
    fondo = fondoValido(v) ? v : "menta";
    document.documentElement.dataset.fondo = fondo;
    const f = FONDOS.find((x) => x.id === fondo);
    const btn = document.getElementById("btnFondo");
    if (btn) {
      btn.style.setProperty("--gota", f.color);
      btn.setAttribute("aria-label", `Cambiar el color de fondo (ahora: ${f.nombre})`);
      btn.title = `Fondo: ${f.nombre}`;
    }
    document.querySelectorAll("#opsFondo [data-fondo]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.fondo === fondo)));
  };

  aplicarPortada(portada);
  aplicarFondo(fondo);

  document.getElementById("btnFondo")?.addEventListener("click", () => {
    const k = FONDOS.findIndex((f) => f.id === fondo);
    const sig = FONDOS[(k + 1) % FONDOS.length].id;
    aplicarFondo(sig);
    guardar("va-fondo", sig);
  });

  if (probando) {
    const panel = document.getElementById("probador");
    panel.hidden = false;
    document.getElementById("opsFondo").innerHTML = FONDOS.map((f) =>
      `<button type="button" data-fondo="${f.id}"><span class="muestra" style="background:${f.color}"></span>${f.nombre}</button>`).join("");
    aplicarFondo(fondo);
    aplicarPortada(portada);
    panel.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.portada) { aplicarPortada(b.dataset.portada); guardar("va-portada", b.dataset.portada); window.scrollTo({ top: 0 }); }
      if (b.dataset.fondo) { aplicarFondo(b.dataset.fondo); guardar("va-fondo", b.dataset.fondo); }
    });
  }
}

/* ===================================================================
   Calcomanías que se pueden arrastrar (en cualquier diseño)
   =================================================================== */
function iniciarCalcomanias() {
  let capa = 10;
  document.querySelectorAll(".tablero .sticker, .gafete-zona .sticker").forEach((st) => {
    let x0, y0, dx = 0, dy = 0, arrastrando = false;
    st.addEventListener("pointerdown", (e) => {
      arrastrando = true;
      st.setPointerCapture(e.pointerId);
      st.classList.add("agarrada");
      st.style.zIndex = ++capa;
      x0 = e.clientX - dx; y0 = e.clientY - dy;
    });
    st.addEventListener("pointermove", (e) => {
      if (!arrastrando) return;
      dx = e.clientX - x0; dy = e.clientY - y0;
      st.style.translate = `${dx}px ${dy}px`;
    });
    const soltar = () => { arrastrando = false; st.classList.remove("agarrada"); };
    st.addEventListener("pointerup", soltar);
    st.addEventListener("pointercancel", soltar);
  });
}

/* El gafete se mece un poco siguiendo el mouse */
function iniciarGafete() {
  const g = document.getElementById("gafete");
  if (!g || reduceMovimiento) return;
  const zona = g.parentElement;
  zona.addEventListener("pointermove", (e) => {
    const r = zona.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    g.style.setProperty("--giro", `${(-x * 10).toFixed(2)}deg`);
  });
  zona.addEventListener("pointerleave", () => g.style.setProperty("--giro", "0deg"));
}

/* ===================================================================
   ÓRDENES DE SERVICIO
   =================================================================== */
const ESTADOS = { uso: "En uso", desarrollo: "En desarrollo", publicado: "Publicado" };

function cubiertaJuego(p) {
  const c = p.cubierta;
  const [foto, alt] = p.galeria[c.foto || 0] || p.galeria[0];
  return `<div class="cubierta" style="--juego:${c.color}">
    <div class="cub-texto">
      <span class="cub-anio">${p.año} · ${esc(p.tecnologias[0])}</span>
      <span class="cub-titulo">${esc(p.titulo)}</span>
      <span class="cub-lema">${esc(c.lema)}</span>
    </div>
    <div class="cub-foto">
      <span class="cub-sombra"></span>
      <img src="${foto}" alt="${esc(alt)}" loading="lazy">
      ${c.calcomanias.map((t, k) => `<span class="cub-st cub-st-${k}">${esc(t)}</span>`).join("")}
    </div>
  </div>`;
}

function vistaOrden(p) {
  if (p.cubierta && p.galeria.length) return cubiertaJuego(p);
  if (p.galeria.length) return `<img src="${p.galeria[0][0]}" alt="${esc(p.galeria[0][1])}" loading="lazy">`;
  return ILUSTRACIONES[p.ilustracion] || "";
}

function pintarOrdenes() {
  const cont = document.getElementById("listaOrdenes");
  if (!cont) return;

  const pintar = (filtro) => {
    const lista = PROYECTOS.filter((p) => filtro === "todas" || p.tipo === filtro);
    // Las órdenes destacadas y la última que quede sola ocupan todo el ancho
    const anchas = new Set(lista.filter((p) => p.destacado && filtro === "todas"));
    const restantes = lista.filter((p) => !anchas.has(p));
    if (restantes.length % 2 === 1) anchas.add(restantes[restantes.length - 1]);
    cont.innerHTML = lista.map((p) => `
      <article class="orden${anchas.has(p) ? " destacada" : ""}">
        <div class="orden-cabeza">
          <span class="folio">${esc(p.folio)}<small>${p.año}</small></span>
          <span class="estado estado-${p.estado}">${ESTADOS[p.estado]}</span>
        </div>
        <div class="perforado" aria-hidden="true"></div>
        <button type="button" class="orden-vista" data-abrir="${p.id}" aria-label="Ver la orden ${esc(p.titulo)}">${vistaOrden(p)}</button>
        <div class="orden-cuerpo">
          <h3>${esc(p.titulo)}</h3>
          <p class="sub">${esc(p.subtitulo)}</p>
          <dl>
            <div class="campo"><dt>Problema</dt><dd>${esc(p.problema)}</dd></div>
            <div class="campo"><dt>Solución</dt><dd>${esc(p.solucion)}</dd></div>
          </dl>
          <ul class="tags">${p.tecnologias.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          <div class="orden-acciones">
            <button type="button" class="btn btn-tinta" data-abrir="${p.id}">Ver orden completa</button>
            ${p.demo.url ? `<a class="btn btn-borde" href="${p.demo.url}" target="_blank" rel="noopener">${esc(p.demo.texto || "Ver demo")}</a>` : ""}
            ${p.codigo.url ? `<a class="btn btn-borde" href="${p.codigo.url}" target="_blank" rel="noopener">Ver código</a>` : ""}
          </div>
        </div>
      </article>`).join("");
  };
  pintar("todas");

  document.querySelectorAll("#ordenes [data-filtro]").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll("#ordenes [data-filtro]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      pintar(b.dataset.filtro);
    });
  });

  cont.addEventListener("click", (e) => {
    const b = e.target.closest("[data-abrir]");
    if (b) abrirOrden(b.dataset.abrir);
  });
}

function abrirOrden(id) {
  const p = PROYECTOS.find((x) => x.id === id);
  if (!p) return;
  const dialogo = document.getElementById("modalProyecto");
  const cont = document.getElementById("modalContenido");
  const hayFotos = p.galeria.length > 0;

  cont.innerHTML = `
    <div class="galeria">
      <div class="galeria-principal">
        ${hayFotos ? `<img id="galImg" src="" alt="">
          <button type="button" class="galeria-flecha izq" data-mover="-1" aria-label="Captura anterior">${ICONO_FLECHA_IZQ}</button>
          <button type="button" class="galeria-flecha der" data-mover="1" aria-label="Captura siguiente">${ICONO_FLECHA_DER}</button>`
        : ILUSTRACIONES[p.ilustracion] || ""}
      </div>
      ${hayFotos ? `<div class="galeria-pie"><span id="galTexto"></span><span id="galCuenta"></span></div>
      <div class="galeria-tira">
        ${p.galeria.map(([src, alt], k) => `<button type="button" data-ir="${k}" aria-label="${esc(alt)}"><img src="${src}" alt="" loading="lazy"></button>`).join("")}
      </div>` : ""}
    </div>
    <div class="modal-texto">
      <div>
        <div class="modal-titulo">
          <span class="folio">${esc(p.folio)}</span>
          <span class="estado estado-${p.estado}">${ESTADOS[p.estado]}</span>
        </div>
        <h2 id="modalTitulo" style="margin-top:.6rem">${esc(p.titulo)}</h2>
        <p class="sub">${esc(p.subtitulo)} · ${p.año}</p>
      </div>
      <div class="reporte">
        <div><h3>Problema reportado</h3><p>${esc(p.problema)}</p></div>
        <div><h3>Solución</h3><p>${esc(p.solucion)}</p></div>
      </div>
      <div>
        <h3>Qué hace</h3>
        <div class="caracteristicas">
          ${p.funciones.map(([t, x]) => `<div><strong>${esc(t)}</strong><p>${esc(x)}</p></div>`).join("")}
        </div>
      </div>
      <div>
        <h3>Con qué está hecho</h3>
        <ul class="tags">${p.tecnologias.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>
      ${p.demo.url || p.codigo.url ? `<div class="orden-acciones">
        ${p.demo.url ? `<a class="btn btn-tinta" href="${p.demo.url}" target="_blank" rel="noopener">${esc(p.demo.texto || "Ver demo")}</a>` : ""}
        ${p.codigo.url ? `<a class="btn btn-borde" href="${p.codigo.url}" target="_blank" rel="noopener">Ver código</a>` : ""}
      </div>` : ""}
    </div>`;

  dialogo.onkeydown = null;
  if (hayFotos) {
    let actual = 0;
    const img = cont.querySelector("#galImg");
    const mostrar = (k) => {
      actual = (k + p.galeria.length) % p.galeria.length;
      const [src, alt] = p.galeria[actual];
      img.src = src; img.alt = alt;
      cont.querySelector("#galTexto").textContent = alt;
      cont.querySelector("#galCuenta").textContent = `${actual + 1} de ${p.galeria.length}`;
      cont.querySelectorAll("[data-ir]").forEach((b, k2) => b.setAttribute("aria-current", String(k2 === actual)));
    };
    cont.querySelector(".galeria").addEventListener("click", (e) => {
      const m = e.target.closest("[data-mover]");
      const ir = e.target.closest("[data-ir]");
      if (m) mostrar(actual + Number(m.dataset.mover));
      if (ir) mostrar(Number(ir.dataset.ir));
    });
    dialogo.onkeydown = (e) => {
      if (e.key === "ArrowRight") mostrar(actual + 1);
      if (e.key === "ArrowLeft") mostrar(actual - 1);
    };
    mostrar(0);
  }
  abrirDialogo(dialogo);
}

/* ===================================================================
   BITÁCORA
   =================================================================== */
function pintarBitacora() {
  const linea = document.getElementById("lineaTiempo");
  if (linea) {
    linea.innerHTML = TRAYECTORIA.map((t) => `
      <li class="${t.cuando === "Hoy" ? "hoy" : ""}">
        <span class="cuando">${esc(t.cuando)}</span>
        <div>
          <h3>${esc(t.titulo)}</h3>
          <p class="lugar">${esc(t.lugar)}</p>
          <p class="detalle">${esc(t.texto)}</p>
        </div>
      </li>`).join("");
  }

  const prog = document.getElementById("enProgreso");
  if (prog) {
    prog.innerHTML = EN_PROGRESO.map((c) => `
      <li>
        <div class="fila"><span>${esc(c.titulo)}</span><span>${c.avance}%</span></div>
        <div class="barra-avance" role="progressbar" aria-label="${esc(c.titulo)}" aria-valuenow="${c.avance}" aria-valuemin="0" aria-valuemax="100"><i style="--v:${c.avance}%"></i></div>
      </li>`).join("");
  }

  const certs = document.getElementById("certsDestacadas");
  if (certs) {
    certs.innerHTML = CERTIFICACIONES.filter((c) => c.destacada).map((c) => `
      <li><a href="${c.url}" target="_blank" rel="noopener">
        <img src="${c.imagen}" alt="" loading="lazy">
        <span><strong>${esc(c.titulo)}</strong><span>Alura Latam · ${c.horas} h · ${c.cursos} cursos</span></span>
      </a></li>`).join("");
    const ver = document.getElementById("verCerts");
    if (ver) ver.textContent = `Ver las ${CERTIFICACIONES.length} certificaciones`;
  }
}

function pintarHabilidades() {
  const cont = document.getElementById("listaHabilidades");
  if (!cont) return;
  cont.innerHTML = HABILIDADES.map((g) => `
    <div class="grupo">
      <div class="grupo-cabeza"><h3>${esc(g.grupo)}</h3>${g.nota ? `<span class="nota">${esc(g.nota)}</span>` : ""}</div>
      <ul class="tags">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
    </div>`).join("");
}

/* ===================================================================
   FLUTTER: el código Dart "construye" la tarjeta del teléfono
   =================================================================== */
const SEMILLAS = [
  { nombre: "teal", hex: "#0F8A6E" },
  { nombre: "indigo", hex: "#4F46E5" },
  { nombre: "deepOrange", hex: "#E8590C" },
  { nombre: "pink", hex: "#D6336C" },
  { nombre: "blueGrey", hex: "#3E6670" },
];

function lineasCodigo(semilla) {
  return [
    { h: '<span class="k">void</span> <span class="f">main</span>() => <span class="f">runApp</span>(<span class="k">const</span> <span class="c">Portafolio</span>());' },
    { h: "" },
    { h: '<span class="k">class</span> <span class="c">Portafolio</span> <span class="k">extends</span> <span class="c">StatelessWidget</span> {' },
    { h: '  <span class="p">@override</span>' },
    { h: '  <span class="c">Widget</span> <span class="f">build</span>(<span class="c">BuildContext</span> context) {' },
    { h: '    <span class="k">return</span> <span class="c">Perfil</span>(', paso: 0 },
    { h: "      foto: <span class=\"s\">'zacatecas_de_noche.jpg'</span>,", paso: 1 },
    { h: "      nombre: <span class=\"s\">'Verónica Acuña'</span>,", paso: 2 },
    { h: "      rol: <span class=\"s\">'Soporte y desarrollo'</span>,", paso: 3 },
    { h: "      stack: [<span class=\"s\">'Flutter'</span>, <span class=\"s\">'Python'</span>, <span class=\"s\">'Unity'</span>],", paso: 4 },
    { h: `      semilla: <span class="color-muestra"></span><span class="c">Colors</span>.<span id="semillaNombre">${semilla}</span>,`, paso: 5 },
    { h: "      onTap: () => <span class=\"f\">saludar</span>(<span class=\"s\">'Hello, world!'</span>),", paso: 6 },
    { h: "    );" },
    { h: "  }" },
    { h: "}" },
  ];
}

function iniciarEstudio() {
  const codigo = document.getElementById("codigo");
  const telefono = document.getElementById("telefono");
  const estudio = document.querySelector(".estudio");
  const boton = document.getElementById("hotReload");
  if (!codigo) return;

  let indice = 0;
  estudio.style.setProperty("--semilla", SEMILLAS[0].hex);
  codigo.innerHTML = lineasCodigo(SEMILLAS[0].nombre)
    .map((l) => `<span class="ln"${l.paso !== undefined ? ` data-construye="${l.paso}"` : ""}><span class="txt">${l.h || " "}</span></span>`)
    .join("");
  const filas = [...codigo.querySelectorAll(".ln")];
  const construir = (fila) => {
    const paso = fila.dataset.construye;
    if (paso !== undefined) telefono.querySelectorAll(`[data-paso="${paso}"]`).forEach((w) => w.classList.add("construido"));
  };
  const listo = () => { filas[filas.length - 1].classList.add("actual"); boton.disabled = false; boton.tabIndex = 0; };

  boton.addEventListener("click", () => {
    indice = (indice + 1) % SEMILLAS.length;
    const s = SEMILLAS[indice];
    document.getElementById("semillaNombre").textContent = s.nombre;
    estudio.style.setProperty("--semilla", s.hex);
    telefono.classList.add("recargando");
    setTimeout(() => telefono.classList.remove("recargando"), 350);
  });

  const toast = document.getElementById("toast");
  let t;
  document.getElementById("saludar").addEventListener("click", () => {
    toast.textContent = "Hello, world! 👋";
    toast.classList.add("visible");
    clearTimeout(t);
    t = setTimeout(() => toast.classList.remove("visible"), 2200);
  });

  if (reduceMovimiento || !("IntersectionObserver" in window)) {
    filas.forEach((f) => { f.classList.add("escrita"); construir(f); });
    listo();
    return;
  }

  // Se escribe cuando la sección entra en pantalla
  boton.disabled = true;
  const escribir = () => {
    let i = 0;
    const siguiente = () => {
      if (i > 0) filas[i - 1].classList.remove("actual");
      if (i >= filas.length) return listo();
      const fila = filas[i];
      const largo = fila.textContent.length;
      const dur = Math.max(0.1, Math.min(0.45, largo * 0.008));
      fila.style.setProperty("--dur", dur + "s");
      fila.style.setProperty("--pasos", Math.max(1, largo));
      fila.classList.add("escrita", "actual");
      setTimeout(() => construir(fila), dur * 800);
      i++;
      setTimeout(siguiente, dur * 1000 + 45);
    };
    siguiente();
  };
  const obs = new IntersectionObserver((en) => {
    if (en[0].isIntersecting) { obs.disconnect(); escribir(); }
  }, { threshold: 0.35 });
  obs.observe(estudio);
}

/* ===================================================================
   CONTACTO: ticket
   =================================================================== */
function iniciarContacto() {
  const correo = PERFIL.correo;
  const link = document.getElementById("correoLink");
  if (link) { link.href = "mailto:" + correo; link.textContent = correo; }

  const hoy = new Date();
  const folio = `TK-${String(hoy.getMonth() + 1).padStart(2, "0")}${String(hoy.getDate()).padStart(2, "0")}-${Math.floor(100 + Math.random() * 900)}`;
  document.getElementById("folioTicket").textContent = folio;

  const copiar = document.getElementById("copiarCorreo");
  copiar?.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(correo); copiar.textContent = "Correo copiado"; }
    catch { copiar.textContent = "Selecciona y copia el correo"; }
    setTimeout(() => (copiar.textContent = "Copiar correo"), 2200);
  });

  const form = document.getElementById("formContacto");
  const error = document.getElementById("formError");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const campos = [...form.querySelectorAll("input[type=text], input[type=email], textarea")];
    const faltan = [];
    campos.forEach((c) => {
      const ok = c.checkValidity() && c.value.trim() !== "";
      c.setAttribute("aria-invalid", String(!ok));
      if (!ok) faltan.push(c.closest("label").firstChild.textContent.trim().toLowerCase());
    });
    if (faltan.length) {
      error.textContent = `Falta completar: ${faltan.join(", ")}.`;
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    error.textContent = "";
    const d = Object.fromEntries(new FormData(form));
    const asunto = `[${folio}] ${d.motivo} · ${d.nombre}`;
    const cuerpo = `${d.mensaje}\n\n— ${d.nombre}\n${d.correo}`;
    window.location.href = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    document.getElementById("formNota").textContent = `Ticket ${folio} listo en tu app de correo. Si no se abrió, escríbeme a ${correo}.`;
  });
}

/* Resalta en el menú la sección visible */
function iniciarMenuActivo() {
  const enlaces = [...document.querySelectorAll('.menu a[href^="#"]:not(.menu-cta)')];
  const secciones = enlaces.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (!("IntersectionObserver" in window)) return;
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((en) => {
      if (en.isIntersecting) enlaces.forEach((a) => a.classList.toggle("activo", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secciones.forEach((s) => obs.observe(s));
}
