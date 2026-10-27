/* Sello VA e ilustraciones de las órdenes (SVG dibujado a mano) */

let _selloN = 0;
function sello(tamano) {
  const n = ++_selloN;
  if (tamano === "chico") {
    return `<svg viewBox="0 0 64 64" role="img" aria-label="VA">
      <rect width="64" height="64" rx="16" class="s-fondo"/>
      <circle cx="32" cy="32" r="25" class="s-aro" fill="none" stroke-width="1.5"/>
      <text x="31" y="41.5" class="s-va" font-size="27" text-anchor="middle">VA</text>
      <circle cx="32" cy="53" r="2.4" class="s-menta"/>
    </svg>`;
  }
  let marcas = "";
  for (let g = 0; g < 360; g += 10) {
    if (g > 55 && g < 125) continue;          // hueco para el texto inferior
    if (g > 235 && g < 305) continue;         // hueco para el texto superior
    const largo = g % 30 === 0 ? 9 : 5;
    const r1 = 78, r2 = r1 - largo, a = (g * Math.PI) / 180;
    marcas += `<line x1="${100 + r1 * Math.cos(a)}" y1="${100 + r1 * Math.sin(a)}" x2="${100 + r2 * Math.cos(a)}" y2="${100 + r2 * Math.sin(a)}"/>`;
  }
  return `<svg viewBox="0 0 200 200" role="img" aria-label="Sello VA de Verónica Acuña">
    <defs>
      <path id="arcoSup${n}" d="M 22 100 A 78 78 0 0 1 178 100"/>
      <path id="arcoInf${n}" d="M 30 100 A 70 70 0 0 0 170 100"/>
    </defs>
    <circle cx="100" cy="100" r="96" class="s-aro" fill="none" stroke-width="2"/>
    <circle cx="100" cy="100" r="58" class="s-aro" fill="none" stroke-width="1" opacity=".6"/>
    <g class="s-marcas" stroke-width="1.5">${marcas}</g>
    <text class="s-arco" font-size="12.5" letter-spacing="4.5"><textPath href="#arcoSup${n}" startOffset="50%" text-anchor="middle">VERÓNICA ACUÑA</textPath></text>
    <text class="s-arco" font-size="10" letter-spacing="4"><textPath href="#arcoInf${n}" startOffset="50%" text-anchor="middle">ZACATECAS · MX</textPath></text>
    <path d="M8 100 L19 94 L19 106 Z" class="s-menta"/>
    <path d="M192 100 L181 94 L181 106 Z" class="s-menta"/>
    <text x="98" y="120" class="s-va" font-size="62" text-anchor="middle" letter-spacing="-3">VA</text>
  </svg>`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-sello]").forEach((el) => (el.innerHTML = sello(el.dataset.sello)));
});

/* Cada ilustración mide 480 × 300 y usa clases de color del CSS */
const ILUSTRACIONES = {
  chats: `<svg viewBox="0 0 480 300" role="img" aria-label="Ilustración: lista de órdenes de servicio con el chat de una sesión remota">
    <rect width="480" height="300" class="il-fondo"/>
    <rect x="28" y="26" width="424" height="250" rx="14" class="il-panel"/>
    <rect x="28" y="26" width="424" height="34" rx="14" class="il-tinta"/>
    <rect x="28" y="46" width="424" height="14" class="il-tinta"/>
    <circle cx="48" cy="43" r="4" class="il-menta"/><circle cx="62" cy="43" r="4" class="il-claro"/><circle cx="76" cy="43" r="4" class="il-claro"/>
    <rect x="96" y="39" width="120" height="8" rx="4" class="il-claro"/>
    <rect x="28" y="60" width="150" height="216" class="il-suave"/>
    ${[0, 1, 2, 3, 4].map((i) => `
      <rect x="40" y="${74 + i * 38}" width="126" height="30" rx="7" class="${i === 1 ? "il-menta-suave" : "il-panel"}"/>
      <circle cx="54" cy="${89 + i * 38}" r="5" class="${["il-menta", "il-oro", "il-menta", "il-gris", "il-oro"][i]}"/>
      <rect x="66" y="${82 + i * 38}" width="54" height="6" rx="3" class="il-tinta"/>
      <rect x="66" y="${93 + i * 38}" width="${80 - i * 7}" height="5" rx="2.5" class="il-gris"/>`).join("")}
    <rect x="194" y="74" width="120" height="8" rx="4" class="il-tinta"/>
    <rect x="194" y="88" width="76" height="6" rx="3" class="il-gris"/>
    <rect x="378" y="74" width="60" height="18" rx="9" class="il-menta-suave"/>
    <rect x="388" y="80" width="40" height="6" rx="3" class="il-menta-honda"/>
    <rect x="194" y="112" width="150" height="34" rx="12" class="il-suave"/>
    <rect x="206" y="122" width="120" height="6" rx="3" class="il-gris"/><rect x="206" y="133" width="80" height="6" rx="3" class="il-gris"/>
    <rect x="286" y="156" width="152" height="34" rx="12" class="il-tinta"/>
    <rect x="298" y="166" width="126" height="6" rx="3" class="il-claro"/><rect x="298" y="177" width="70" height="6" rx="3" class="il-claro"/>
    <rect x="194" y="200" width="118" height="24" rx="12" class="il-suave"/>
    <rect x="206" y="209" width="90" height="6" rx="3" class="il-gris"/>
    <rect x="194" y="240" width="244" height="24" rx="12" class="il-fondo" stroke-width="1.5"/>
    <circle cx="424" cy="252" r="8" class="il-menta"/>
  </svg>`,

  bitacora: `<svg viewBox="0 0 480 300" role="img" aria-label="Ilustración: lista de versiones, parches y cartas técnicas">
    <rect width="480" height="300" class="il-fondo"/>
    <rect x="60" y="22" width="360" height="256" rx="14" class="il-panel"/>
    <rect x="84" y="44" width="140" height="10" rx="5" class="il-tinta"/>
    <rect x="84" y="62" width="90" height="6" rx="3" class="il-gris"/>
    ${[["Versión", "il-menta-suave", "il-menta-honda"], ["Parche", "il-oro-suave", "il-oro-honda"], ["Parche", "il-oro-suave", "il-oro-honda"], ["Carta técnica", "il-suave", "il-tinta"], ["Versión", "il-menta-suave", "il-menta-honda"]].map(([t, f, c], i) => `
      <rect x="84" y="${88 + i * 36}" width="312" height="28" rx="8" class="${i === 0 ? "il-suave" : "il-fondo"}"/>
      <rect x="96" y="${99 + i * 36}" width="${110 - i * 9}" height="6" rx="3" class="il-tinta"/>
      <rect x="${i === 3 ? 288 : 304}" y="${93 + i * 36}" width="${i === 3 ? 80 : 64}" height="18" rx="9" class="${f}"/>
      <text x="${i === 3 ? 328 : 336}" y="${105.5 + i * 36}" class="il-texto ${c}" font-size="9.5" text-anchor="middle">${t}</text>
      <path d="M378 ${97 + i * 36} v10 m-5 -4 l5 5 l5 -5" class="il-trazo" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join("")}
  </svg>`,

  mapas: `<svg viewBox="0 0 480 300" role="img" aria-label="Ilustración: mapa con las capas AP, AI y SA y una línea de transecto">
    <rect width="480" height="300" class="il-tinta"/>
    <g class="il-reticula" stroke-width="1">
      ${[60, 120, 180, 240, 300, 360, 420].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="300"/>`).join("")}
      ${[60, 120, 180, 240].map((y) => `<line x1="0" y1="${y}" x2="480" y2="${y}"/>`).join("")}
    </g>
    <g fill="none" class="il-curvas" stroke-width="1.2">
      <path d="M-10 230 C 80 200, 140 250, 230 225 S 400 180, 490 210"/>
      <path d="M-10 260 C 90 235, 160 280, 250 255 S 410 215, 490 240"/>
      <path d="M-10 60 C 60 80, 120 40, 200 55 S 360 30, 490 70"/>
      <path d="M-10 30 C 70 50, 130 12, 210 25 S 370 4, 490 40"/>
    </g>
    <path d="M86 70 L300 48 L404 122 L382 236 L170 258 L70 176 Z" class="il-sa"/>
    <path d="M140 102 L290 86 L350 140 L330 206 L196 220 L130 166 Z" class="il-ai"/>
    <path d="M196 128 L270 120 L298 156 L282 186 L214 190 L186 160 Z" class="il-ap"/>
    <path d="M120 222 L360 90" class="il-transecto" stroke-width="2.5" stroke-dasharray="8 6" stroke-linecap="round" fill="none"/>
    <circle cx="120" cy="222" r="5" class="il-oro"/><circle cx="360" cy="90" r="5" class="il-oro"/>
    <text x="242" y="160" class="il-texto il-tinta" font-size="13" text-anchor="middle" font-weight="700">AP</text>
    <text x="318" y="112" class="il-texto il-claro" font-size="11" text-anchor="middle">AI</text>
    <text x="380" y="70" class="il-texto il-claro" font-size="11" text-anchor="middle">SA</text>
    <g transform="translate(436 228)">
      <circle r="20" class="il-panel"/>
      <path d="M0 -13 L6 6 L0 2 L-6 6 Z" class="il-tinta"/>
      <text y="-24" class="il-texto il-claro" font-size="10" text-anchor="middle">N</text>
    </g>
    <rect x="24" y="268" width="80" height="6" class="il-claro"/><rect x="24" y="268" width="40" height="6" class="il-menta"/>
  </svg>`,

  coro: `<svg viewBox="0 0 480 300" role="img" aria-label="Ilustración: teléfono con el esquema de cantos de la misa y un aviso de cambio">
    <rect width="480" height="300" class="il-fondo"/>
    <g opacity=".5" class="il-curvas-claras" fill="none" stroke-width="1.2">
      <path d="M0 240 C 100 210, 180 260, 300 230 S 420 200, 480 220"/>
      <path d="M0 270 C 120 240, 190 290, 310 260 S 430 230, 480 250"/>
    </g>
    <rect x="160" y="14" width="160" height="300" rx="26" class="il-tinta"/>
    <rect x="168" y="22" width="144" height="290" rx="20" class="il-panel"/>
    <rect x="168" y="22" width="144" height="70" rx="20" class="il-verde-lit"/>
    <rect x="168" y="70" width="144" height="22" class="il-verde-lit"/>
    <rect x="182" y="44" width="84" height="8" rx="4" class="il-claro"/>
    <rect x="182" y="58" width="56" height="6" rx="3" class="il-claro" opacity=".7"/>
    <path d="M286 44 c6 6 6 14 0 22 c-6 -8 -6 -16 0 -22 z" class="il-claro"/>
    ${["Entrada", "Gloria", "Aleluya", "Comunión", "Comunión"].map((t, i) => `
      <text x="182" y="${116 + i * 34}" class="il-texto il-gris" font-size="8.5">${t}</text>
      <rect x="182" y="${121 + i * 34}" width="${100 - (i % 2) * 18}" height="7" rx="3.5" class="il-tinta"/>`).join("")}
    <rect x="300" y="196" width="152" height="52" rx="12" class="il-tinta"/>
    <circle cx="320" cy="222" r="8" class="il-oro"/>
    <rect x="336" y="212" width="96" height="7" rx="3.5" class="il-claro"/>
    <rect x="336" y="225" width="64" height="6" rx="3" class="il-claro" opacity=".6"/>
    <rect x="34" y="96" width="112" height="40" rx="12" class="il-panel"/>
    <circle cx="54" cy="116" r="7" class="il-menta"/>
    <rect x="68" y="108" width="62" height="6" rx="3" class="il-tinta"/>
    <rect x="68" y="119" width="40" height="5" rx="2.5" class="il-gris"/>
  </svg>`,

  rocola: `<svg viewBox="0 0 480 300" role="img" aria-label="Ilustración: reproductor de música en un teléfono con un disco girando">
    <rect width="480" height="300" class="il-menta-suave"/>
    <rect x="160" y="14" width="160" height="300" rx="26" class="il-tinta"/>
    <rect x="168" y="22" width="144" height="290" rx="20" class="il-tinta-2"/>
    <g class="disco">
      <circle cx="240" cy="110" r="56" class="il-negro"/>
      ${[48, 40, 32].map((r) => `<circle cx="240" cy="110" r="${r}" fill="none" class="il-surco" stroke-width="1"/>`).join("")}
      <circle cx="240" cy="110" r="18" class="il-menta"/>
      <circle cx="240" cy="110" r="3" class="il-tinta"/>
      <path d="M228 98 a 17 17 0 0 1 12 -5" class="il-brillo" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
    <rect x="188" y="186" width="96" height="8" rx="4" class="il-claro"/>
    <rect x="188" y="200" width="60" height="6" rx="3" class="il-claro" opacity=".55"/>
    <rect x="188" y="222" width="104" height="4" rx="2" class="il-claro" opacity=".25"/>
    <rect x="188" y="222" width="58" height="4" rx="2" class="il-menta"/>
    <circle cx="246" cy="224" r="5" class="il-claro"/>
    <path d="M206 248 l-10 8 l10 8 z M196 248 v16" class="il-claro" stroke="currentColor"/>
    <circle cx="240" cy="256" r="14" class="il-menta"/>
    <path d="M235 249 v14 l11 -7 z" class="il-tinta"/>
    <path d="M274 248 l10 8 l-10 8 z M284 248 v16" class="il-claro"/>
    <g class="nota-musical">
      <path d="M90 90 v-36 l26 -6 v36" class="il-trazo-tinta" stroke-width="3" fill="none"/>
      <circle cx="84" cy="92" r="7" class="il-tinta"/><circle cx="110" cy="86" r="7" class="il-tinta"/>
    </g>
    <path d="M380 200 v-28 l20 -5" class="il-trazo-tinta" stroke-width="3" fill="none"/>
    <circle cx="374" cy="202" r="7" class="il-tinta"/>
  </svg>`,

  pdf: `<svg viewBox="0 0 480 300" role="img" aria-label="Ilustración: miniaturas de páginas PDF y una página siendo arrastrada">
    <rect width="480" height="300" class="il-fondo"/>
    <rect x="24" y="24" width="432" height="252" rx="14" class="il-panel"/>
    ${[0, 1, 2, 3].map((i) => {
      const x = 46 + i * 104;
      if (i === 1) return `<rect x="${x}" y="70" width="82" height="108" rx="6" class="il-hueco" fill="none" stroke-width="2" stroke-dasharray="6 5"/>`;
      return `<rect x="${x}" y="70" width="82" height="108" rx="6" class="il-fondo"/>
        <rect x="${x + 12}" y="84" width="46" height="6" rx="3" class="il-tinta"/>
        ${[0, 1, 2, 3, 4, 5].map((k) => `<rect x="${x + 12}" y="${98 + k * 11}" width="${58 - (k % 3) * 9}" height="4" rx="2" class="il-gris"/>`).join("")}
        <text x="${x + 41}" y="196" class="il-texto il-gris" font-size="10" text-anchor="middle">${i + 1}</text>`;
    }).join("")}
    <g transform="translate(176 120) rotate(-8)">
      <rect width="82" height="108" rx="6" class="il-fondo sombra"/>
      <rect x="0" y="0" width="82" height="108" rx="6" fill="none" class="il-borde-menta" stroke-width="2.5"/>
      <rect x="12" y="14" width="46" height="6" rx="3" class="il-menta-honda"/>
      ${[0, 1, 2, 3, 4, 5].map((k) => `<rect x="12" y="${28 + k * 11}" width="${58 - (k % 3) * 9}" height="4" rx="2" class="il-gris"/>`).join("")}
    </g>
    <path d="M150 232 C 140 214, 150 196, 170 196" class="il-trazo" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M164 188 l8 8 l-9 6" class="il-trazo" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="46" y="222" width="94" height="30" rx="15" class="il-tinta"/>
    <text x="93" y="241" class="il-texto il-claro" font-size="11" text-anchor="middle">Rotar</text>
    <rect x="300" y="222" width="132" height="30" rx="15" class="il-menta"/>
    <text x="366" y="241" class="il-texto il-tinta" font-size="11" text-anchor="middle">Cambiar fecha</text>
  </svg>`,
};
