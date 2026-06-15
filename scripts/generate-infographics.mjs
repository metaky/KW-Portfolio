import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const DATA_PATH = path.join(ROOT, "src/data/infographics.json");
const OUT_DIR = path.join(ROOT, "public/infographics");
const FULL = { width: 1600, height: 2400 };
const THUMB = { width: 800, height: 1200 };

const colors = {
  ink: "#061431",
  body: "#1d2a3f",
  muted: "#6f747b",
  paper: "#fbf7ed",
  paperDeep: "#f4ecdc",
  white: "#fffdf7",
  line: "#d8c8af",
  green: "#2f7145",
  greenSoft: "#e1f0e3",
  blue: "#2f718e",
  blueSoft: "#e0f0f7",
  yellow: "#a77a24",
  yellowSoft: "#f7edc9",
  peach: "#f7e4d4",
};

const accents = {
  green: { main: colors.green, soft: colors.greenSoft, wash: "rgba(169,223,191,.34)", contrast: "#174125" },
  blue: { main: colors.blue, soft: colors.blueSoft, wash: "rgba(127,179,213,.30)", contrast: "#153f55" },
  yellow: { main: colors.yellow, soft: colors.yellowSoft, wash: "rgba(249,231,159,.38)", contrast: "#6b4a12" },
};

const serif = "Georgia, 'Times New Roman', serif";
const sans = "'Helvetica Neue', Arial, sans-serif";

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function approxWidth(text, size, weight = 400, family = sans) {
  const weightBoost = Number(weight) >= 700 ? 1.08 : 1;
  const familyBoost = family === serif ? 1.05 : 1;
  let units = 0;
  for (const char of String(text)) {
    if (char === " ") units += 0.34;
    else if ("ilI.,'".includes(char)) units += 0.28;
    else if ("mwMW".includes(char)) units += 0.9;
    else if ("ABCDEFGHKNOPQRSTUVWXYZ".includes(char)) units += 0.68;
    else units += 0.54;
  }
  return units * size * weightBoost * familyBoost;
}

function wrapText(text, maxWidth, size, options = {}) {
  const { weight = 400, family = sans, maxLines = 3, id = "text" } = options;
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (approxWidth(next, size, weight, family) <= maxWidth) {
      current = next;
    } else {
      if (current) lines.push(current);
      if (approxWidth(word, size, weight, family) > maxWidth) {
        throw new Error(`${id} has a word too wide for its box: ${word}`);
      }
      current = word;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    throw new Error(`${id} wraps to ${lines.length} lines; max is ${maxLines}: ${text}`);
  }
  return lines;
}

function textBlock(text, x, y, maxWidth, size, options = {}) {
  const {
    weight = 400,
    family = sans,
    fill = colors.body,
    lineHeight = Math.round(size * 1.18),
    maxLines = 3,
    anchor = "start",
    id = "text",
    letterSpacing = 0,
  } = options;
  const lines = Array.isArray(text) ? text : wrapText(text, maxWidth, size, { weight, family, maxLines, id });
  const tspans = lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");
  const height = (lines.length - 1) * lineHeight + size;
  return {
    svg: `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${letterSpacing}">${tspans}</text>`,
    height,
    lines,
  };
}

function rect(x, y, w, h, fill, stroke = "none", rx = 34, strokeWidth = 2) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
}

function line(x1, y1, x2, y2, stroke = colors.line, width = 2, extra = "") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" ${extra}/>`;
}

function arrow(x1, y1, x2, y2, accent) {
  const id = `arrow-${Math.round(x1)}-${Math.round(y1)}-${Math.round(x2)}-${Math.round(y2)}`.replaceAll("-", "");
  return `
    <defs><marker id="${id}" markerWidth="12" markerHeight="12" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="${accent.main}"/></marker></defs>
    <path d="M${x1} ${y1} C${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}" fill="none" stroke="${accent.main}" stroke-width="5" stroke-linecap="round" marker-end="url(#${id})"/>
  `;
}

function icon(type, x, y, size, color) {
  const s = size / 64;
  const sw = Math.max(2.8, 4 * s);
  const p = (value) => Math.round(value * s * 10) / 10;
  const common = `stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
  const cx = x;
  const cy = y;
  const icons = {
    target: `<circle cx="${cx}" cy="${cy}" r="${p(24)}" ${common}/><circle cx="${cx}" cy="${cy}" r="${p(11)}" ${common}/><path d="M${cx} ${cy} L${cx + p(28)} ${cy - p(28)} M${cx + p(18)} ${cy - p(30)} h${p(15)} v${p(15)}" ${common}/>`,
    shield: `<path d="M${cx} ${cy - p(30)} l${p(27)} ${p(10)} v${p(22)} c0 ${p(22)} -${p(14)} ${p(35)} -${p(27)} ${p(41)} c-${p(13)} -${p(6)} -${p(27)} -${p(19)} -${p(27)} -${p(41)} v-${p(22)} z" ${common}/><path d="M${cx - p(12)} ${cy + p(4)} l${p(9)} ${p(9)} l${p(18)} -${p(23)}" ${common}/>`,
    document: `<path d="M${cx - p(21)} ${cy - p(30)} h${p(29)} l${p(18)} ${p(18)} v${p(48)} h-${p(47)} z" ${common}/><path d="M${cx + p(8)} ${cy - p(30)} v${p(18)} h${p(18)} M${cx - p(10)} ${cy + p(2)} h${p(26)} M${cx - p(10)} ${cy + p(16)} h${p(26)}" ${common}/>`,
    compass: `<circle cx="${cx}" cy="${cy}" r="${p(27)}" ${common}/><path d="M${cx - p(10)} ${cy + p(13)} l${p(21)} -${p(30)} l-${p(6)} ${p(24)} z" fill="${color}" opacity=".86"/>`,
    check: `<path d="M${cx - p(24)} ${cy + p(1)} l${p(16)} ${p(17)} l${p(38)} -${p(42)}" ${common}/>`,
    people: `<circle cx="${cx - p(12)}" cy="${cy - p(12)}" r="${p(11)}" ${common}/><circle cx="${cx + p(17)}" cy="${cy - p(8)}" r="${p(9)}" ${common}/><path d="M${cx - p(35)} ${cy + p(30)} a${p(26)} ${p(22)} 0 0 1 ${p(49)} 0 M${cx + p(7)} ${cy + p(30)} a${p(20)} ${p(17)} 0 0 1 ${p(38)} 0" ${common}/>`,
    heart: `<path d="M${cx} ${cy + p(31)} C${cx - p(45)} ${cy - p(4)} ${cx - p(25)} ${cy - p(34)} ${cx} ${cy - p(16)} C${cx + p(25)} ${cy - p(34)} ${cx + p(45)} ${cy - p(4)} ${cx} ${cy + p(31)} Z" ${common}/>`,
    lock: `<rect x="${cx - p(23)}" y="${cy - p(1)}" width="${p(46)}" height="${p(34)}" rx="${p(8)}" ${common}/><path d="M${cx - p(14)} ${cy - p(1)} v-${p(12)} a${p(14)} ${p(14)} 0 0 1 ${p(28)} 0 v${p(12)}" ${common}/>`,
    boundary: `<path d="M${cx - p(30)} ${cy - p(30)} L${cx + p(30)} ${cy + p(30)} M${cx + p(30)} ${cy - p(30)} L${cx - p(30)} ${cy + p(30)}" ${common}/><circle cx="${cx}" cy="${cy}" r="${p(35)}" ${common}/>`,
    spark: `<path d="M${cx} ${cy - p(33)} C${cx + p(8)} ${cy - p(8)} ${cx + p(13)} ${cy - p(6)} ${cx + p(33)} ${cy} C${cx + p(9)} ${cy + p(8)} ${cx + p(7)} ${cy + p(13)} ${cx} ${cy + p(33)} C${cx - p(7)} ${cy + p(10)} ${cx - p(13)} ${cy + p(7)} ${cx - p(33)} ${cy} C${cx - p(9)} ${cy - p(7)} ${cx - p(7)} ${cy - p(13)} ${cx} ${cy - p(33)} Z" fill="${color}" opacity=".86"/>`,
  };
  return icons[type] || icons.spark;
}

function watercolorBackground(w, h, accent) {
  return `
    <defs>
      <filter id="paperNoise" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="7" result="noise"/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer><feFuncA type="table" tableValues="0 .08"/></feComponentTransfer>
      </filter>
      <radialGradient id="washA" cx="30%" cy="20%" r="70%">
        <stop offset="0%" stop-color="${accent.soft}" stop-opacity=".72"/>
        <stop offset="70%" stop-color="${accent.soft}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="washB" cx="80%" cy="18%" r="58%">
        <stop offset="0%" stop-color="${colors.blueSoft}" stop-opacity=".55"/>
        <stop offset="72%" stop-color="${colors.blueSoft}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="washC" cx="80%" cy="86%" r="62%">
        <stop offset="0%" stop-color="${colors.yellowSoft}" stop-opacity=".55"/>
        <stop offset="74%" stop-color="${colors.yellowSoft}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="${colors.paper}"/>
    <rect width="${w}" height="${h}" fill="url(#washA)"/>
    <rect width="${w}" height="${h}" fill="url(#washB)"/>
    <rect width="${w}" height="${h}" fill="url(#washC)"/>
    <rect width="${w}" height="${h}" filter="url(#paperNoise)" opacity=".8"/>
    <path d="M${w * 0.03} ${h * 0.08} C${w * 0.13} ${h * 0.02}, ${w * 0.22} ${h * 0.04}, ${w * 0.32} ${h * 0.0}" fill="none" stroke="${accent.main}" stroke-width="2" opacity=".22"/>
    <path d="M${w * 0.78} ${h * 0.93} C${w * 0.9} ${h * 0.85}, ${w * 0.95} ${h * 0.84}, ${w * 1.02} ${h * 0.76}" fill="none" stroke="${colors.green}" stroke-width="2" opacity=".22"/>
  `;
}

function heading(item, accent) {
  const titleSize = item.title.length > 34 ? 76 : 86;
  const title = textBlock(item.title, 112, 188, 1120, titleSize, {
    weight: 700,
    family: serif,
    fill: colors.ink,
    lineHeight: Math.round(titleSize * 1.08),
    maxLines: 2,
    id: `${item.id}:title`,
  });
  const thesis = textBlock(item.thesis, 248, 410, 1080, 46, {
    weight: 800,
    fill: colors.ink,
    lineHeight: 56,
    maxLines: 2,
    id: `${item.id}:thesis`,
  });
  return `
    <text x="112" y="92" fill="${accent.contrast}" font-family="${sans}" font-size="27" font-weight="900" letter-spacing="6">${escapeXml(item.eyebrow)}</text>
    ${title.svg}
    ${rect(112, 330, 1376, 178, "rgba(255,253,247,.92)", accent.soft, 42, 2)}
    <circle cx="174" cy="419" r="44" fill="${accent.soft}" stroke="${accent.main}" stroke-width="3"/>
    ${icon(iconFor(item), 174, 419, 68, accent.main)}
    ${thesis.svg}
  `;
}

function iconFor(item) {
  if (item.id.includes("privacy") || item.id.includes("workflow")) return "lock";
  if (item.id.includes("advocacy") || item.id.includes("brief")) return "document";
  if (item.id.includes("evidence")) return "compass";
  if (item.id.includes("accessible")) return "check";
  if (item.id.includes("child") || item.id.includes("transition")) return "heart";
  if (item.id.includes("never")) return "boundary";
  return "target";
}

function shiftCard(item, x, y, w, accent) {
  const label = textBlock(item.shift.label.toUpperCase(), x + 34, y + 56, w - 68, 25, {
    weight: 900,
    fill: accent.contrast,
    maxLines: 1,
    letterSpacing: 3,
    id: `${item.id}:shift-label`,
  });
  const from = textBlock(item.shift.from, x + 54, y + 138, w * 0.35, 37, {
    weight: 800,
    fill: colors.ink,
    maxLines: 2,
    lineHeight: 44,
    id: `${item.id}:shift-from`,
  });
  const to = textBlock(item.shift.to, x + w * 0.58, y + 138, w * 0.35, 37, {
    weight: 800,
    fill: colors.ink,
    maxLines: 2,
    lineHeight: 44,
    id: `${item.id}:shift-to`,
  });
  const note = textBlock(item.shift.note, x + 54, y + 238, w - 108, 30, {
    weight: 700,
    fill: colors.body,
    maxLines: 1,
    id: `${item.id}:shift-note`,
  });
  return `
    ${rect(x, y, w, 282, "rgba(255,253,247,.94)", colors.line, 38, 2)}
    ${label.svg}
    <text x="${x + 54}" y="${y + 100}" fill="${colors.muted}" font-family="${sans}" font-size="22" font-weight="900" letter-spacing="3">FROM</text>
    <text x="${x + w * 0.58}" y="${y + 100}" fill="${accent.contrast}" font-family="${sans}" font-size="22" font-weight="900" letter-spacing="3">TO</text>
    ${from.svg}
    ${arrow(x + w * 0.43, y + 128, x + w * 0.53, y + 128, accent)}
    ${to.svg}
    ${line(x + 40, y + 196, x + w - 40, y + 196, colors.line, 2)}
    ${note.svg}
  `;
}

function actionFooter(item, accent) {
  const starter = textBlock(item.starter, 252, 1812, 620, 39, {
    weight: 800,
    fill: colors.ink,
    maxLines: 2,
    lineHeight: 47,
    id: `${item.id}:starter`,
  });
  const note = textBlock(item.note, 988, 1812, 430, 34, {
    weight: 800,
    fill: colors.ink,
    maxLines: 2,
    lineHeight: 42,
    id: `${item.id}:note`,
  });
  return `
    ${rect(112, 1716, 1376, 240, "rgba(255,253,247,.96)", accent.soft, 42, 2)}
    <circle cx="176" cy="1836" r="48" fill="${accent.main}"/>
    ${icon("spark", 176, 1836, 62, colors.white)}
    <text x="252" y="1760" fill="${accent.contrast}" font-family="${sans}" font-size="23" font-weight="900" letter-spacing="4">TRY FIRST</text>
    ${starter.svg}
    ${line(918, 1750, 918, 1918, colors.line, 2)}
    <text x="988" y="1760" fill="${colors.muted}" font-family="${sans}" font-size="23" font-weight="900" letter-spacing="4">GUARDRAIL</text>
    ${note.svg}
  `;
}

function watermark() {
  return `
    <circle cx="134" cy="2284" r="42" fill="none" stroke="#9ca0a6" stroke-width="3"/>
    <text x="134" y="2299" fill="#898f96" font-family="${sans}" font-size="35" font-weight="800" text-anchor="middle">KW</text>
    <text x="198" y="2280" fill="#898f96" font-family="${sans}" font-size="28" font-weight="800">See more infographics at</text>
    <text x="198" y="2318" fill="#898f96" font-family="${sans}" font-size="30" font-weight="800">KyleWegner.com/infographics</text>
  `;
}

function stepText(step, x, y, w, size, itemId, i) {
  const title = textBlock(step.title, x, y, w, size, {
    weight: 900,
    fill: colors.ink,
    maxLines: 1,
    id: `${itemId}:step-${i}-title`,
  });
  const body = textBlock(step.body, x, y + size + 22, w, Math.round(size * 0.72), {
    fill: colors.body,
    lineHeight: Math.round(size * 0.88),
    maxLines: 3,
    id: `${itemId}:step-${i}-body`,
  });
  return title.svg + body.svg;
}

function numberedStep(step, i, x, y, w, h, accent, itemId) {
  return `
    ${rect(x, y, w, h, "rgba(255,253,247,.96)", accent.soft, 32, 2)}
    <circle cx="${x + 48}" cy="${y + 54}" r="31" fill="${colors.ink}"/>
    <text x="${x + 48}" y="${y + 66}" fill="${colors.white}" font-family="${sans}" font-size="34" font-weight="900" text-anchor="middle">${i + 1}</text>
    ${stepText(step, x + 100, y + 57, w - 132, 34, itemId, i)}
  `;
}

const templates = {
  roadmap(item, accent) {
    const [a, b, c, d] = item.steps;
    return `
      ${shiftCard(item, 112, 564, 1376, accent)}
      <path d="M220 1062 C430 920, 560 1228, 778 1080 S1146 942, 1368 1162" fill="none" stroke="${accent.main}" stroke-width="8" stroke-linecap="round" opacity=".72"/>
      ${roadNode(a, 182, 1010, 1, accent, item.id)}
      ${roadNode(b, 500, 1220, 2, accent, item.id)}
      ${roadNode(c, 842, 1010, 3, accent, item.id)}
      ${roadNode(d, 1160, 1220, 4, accent, item.id)}
    `;
  },
  briefCanvas(item, accent) {
    return `
      ${shiftCard(item, 112, 564, 1376, accent)}
      ${rect(214, 920, 1172, 590, "rgba(255,253,247,.96)", colors.line, 38, 2)}
      <text x="270" y="990" fill="${accent.contrast}" font-family="${sans}" font-size="26" font-weight="900" letter-spacing="4">DEFINE BEFORE PROMPTING</text>
      ${line(800, 1040, 800, 1440, colors.line, 2)}
      ${line(270, 1240, 1330, 1240, colors.line, 2)}
      ${quadrant(item.steps[0], 270, 1104, 410, accent, item.id, 0)}
      ${quadrant(item.steps[1], 882, 1104, 410, accent, item.id, 1)}
      ${quadrant(item.steps[2], 270, 1304, 410, accent, item.id, 2)}
      ${quadrant(item.steps[3], 882, 1304, 410, accent, item.id, 3)}
    `;
  },
  matrix(item, accent) {
    return `
      ${shiftCard(item, 112, 564, 1376, accent)}
      <text x="170" y="980" fill="${colors.muted}" font-family="${sans}" font-size="24" font-weight="900" letter-spacing="3">PRESSURE TEST</text>
      ${rect(168, 1010, 1264, 570, "rgba(255,253,247,.94)", colors.line, 36, 2)}
      ${line(800, 1010, 800, 1580, colors.line, 2)}
      ${line(168, 1295, 1432, 1295, colors.line, 2)}
      ${matrixCell(item.steps[0], 220, 1088, 470, accent, item.id, 0)}
      ${matrixCell(item.steps[1], 852, 1088, 470, accent, item.id, 1)}
      ${matrixCell(item.steps[2], 220, 1373, 470, accent, item.id, 2)}
      ${matrixCell(item.steps[3], 852, 1373, 470, accent, item.id, 3)}
    `;
  },
  ladder(item, accent) {
    return `
      ${shiftCard(item, 112, 564, 1376, accent)}
      <path d="M330 1508 L1282 954" stroke="${accent.main}" stroke-width="8" stroke-linecap="round" opacity=".28"/>
      ${item.steps.map((step, i) => {
        const x = 230 + i * 270;
        const y = 1392 - i * 145;
        return ladderRung(step, i, x, y, accent, item.id);
      }).join("")}
    `;
  },
  workflow(item, accent) {
    const xs = [142, 504, 866, 1228];
    return `
      ${shiftCard(item, 112, 564, 1376, accent)}
      ${rect(112, 1000, 1376, 370, "rgba(255,253,247,.92)", colors.line, 40, 2)}
      <text x="160" y="1064" fill="${accent.contrast}" font-family="${sans}" font-size="26" font-weight="900" letter-spacing="4">TRUST GATE WORKFLOW</text>
      ${xs.map((x, i) => flowStep(item.steps[i], i, x, 1130, accent, item.id)).join("")}
      ${arrow(420, 1240, 484, 1240, accent)}
      ${arrow(782, 1240, 846, 1240, accent)}
      ${arrow(1144, 1240, 1208, 1240, accent)}
      <text x="160" y="1466" fill="${colors.muted}" font-family="${sans}" font-size="26" font-weight="800">Private review space before anything goes live.</text>
    `;
  },
  checklist(item, accent) {
    return `
      ${shiftCard(item, 112, 564, 1376, accent)}
      <text x="146" y="958" fill="${accent.contrast}" font-family="${sans}" font-size="26" font-weight="900" letter-spacing="4">QUALITY CHECKS</text>
      ${item.steps.map((step, i) => checklistRow(step, i, 146, 1004 + i * 138, 1308, accent, item.id)).join("")}
    `;
  },
  prepMap(item, accent) {
    return mapTemplate(item, accent, "PREP MAP", "document");
  },
  supportBrief(item, accent) {
    return `
      ${shiftCard(item, 112, 564, 1376, accent)}
      ${rect(250, 930, 1100, 640, "rgba(255,253,247,.96)", colors.line, 34, 2)}
      <text x="310" y="1006" fill="${accent.contrast}" font-family="${sans}" font-size="28" font-weight="900" letter-spacing="4">LEAST-SENSITIVE BRIEF</text>
      ${item.steps.map((step, i) => {
        const x = i % 2 === 0 ? 310 : 835;
        const y = i < 2 ? 1085 : 1310;
        return briefField(step, i, x, y, 430, accent, item.id);
      }).join("")}
    `;
  },
  signalMap(item, accent) {
    return mapTemplate(item, accent, "SIGNAL MAP", "heart");
  },
  pathway(item, accent) {
    return `
      ${shiftCard(item, 112, 564, 1376, accent)}
      <path d="M258 1452 C496 1256, 354 1068, 634 1026 C908 984, 898 1324, 1162 1258 C1322 1218, 1312 1066, 1390 998" fill="none" stroke="${accent.main}" stroke-width="9" stroke-linecap="round" opacity=".5"/>
      ${pathStation(item.steps[0], 0, 176, 1362, accent, item.id)}
      ${pathStation(item.steps[1], 1, 350, 980, accent, item.id)}
      ${pathStation(item.steps[2], 2, 828, 1240, accent, item.id)}
      ${pathStation(item.steps[3], 3, 1084, 920, accent, item.id)}
    `;
  },
  boundaryBoard(item, accent) {
    return `
      ${shiftCard(item, 112, 564, 1376, accent)}
      ${rect(160, 930, 1280, 650, "rgba(255,253,247,.96)", colors.line, 38, 2)}
      <text x="800" y="1012" fill="${accent.contrast}" font-family="${sans}" font-size="30" font-weight="900" letter-spacing="5" text-anchor="middle">HUMAN DECISION BOUNDARY</text>
      ${item.steps.map((step, i) => {
        const x = i % 2 === 0 ? 240 : 855;
        const y = i < 2 ? 1088 : 1324;
        return boundaryCard(step, i, x, y, accent, item.id);
      }).join("")}
    `;
  },
};

function roadNode(step, x, y, n, accent, itemId) {
  return `
    <circle cx="${x + 78}" cy="${y - 62}" r="44" fill="${accent.main}"/>
    <text x="${x + 78}" y="${y - 49}" fill="${colors.white}" font-family="${sans}" font-size="36" font-weight="900" text-anchor="middle">${n}</text>
    ${rect(x, y, 280, 210, "rgba(255,253,247,.96)", accent.soft, 32, 2)}
    ${stepText(step, x + 32, y + 70, 216, 34, itemId, n - 1)}
  `;
}

function quadrant(step, x, y, w, accent, itemId, i) {
  return `
    <circle cx="${x}" cy="${y - 20}" r="22" fill="${accent.main}"/>
    <text x="${x}" y="${y - 10}" fill="${colors.white}" font-family="${sans}" font-size="24" font-weight="900" text-anchor="middle">${i + 1}</text>
    ${stepText(step, x + 42, y, w, 36, itemId, i)}
  `;
}

function matrixCell(step, x, y, w, accent, itemId, i) {
  return `
    <circle cx="${x + 26}" cy="${y - 20}" r="25" fill="${accent.main}"/>
    <text x="${x + 26}" y="${y - 10}" fill="${colors.white}" font-family="${sans}" font-size="25" font-weight="900" text-anchor="middle">${i + 1}</text>
    ${stepText(step, x + 76, y, w, 35, itemId, i)}
  `;
}

function ladderRung(step, i, x, y, accent, itemId) {
  return `
    <line x1="${x - 36}" y1="${y + 70}" x2="${x + 270}" y2="${y + 70}" stroke="${accent.main}" stroke-width="5" opacity=".72"/>
    <circle cx="${x - 58}" cy="${y + 70}" r="35" fill="${accent.main}"/>
    <text x="${x - 58}" y="${y + 82}" fill="${colors.white}" font-family="${sans}" font-size="32" font-weight="900" text-anchor="middle">${i + 1}</text>
    ${rect(x, y, 305, 160, "rgba(255,253,247,.96)", accent.soft, 30, 2)}
    ${stepText(step, x + 30, y + 58, 245, 32, itemId, i)}
  `;
}

function flowStep(step, i, x, y, accent, itemId) {
  return `
    <circle cx="${x + 92}" cy="${y}" r="48" fill="${accent.soft}" stroke="${accent.main}" stroke-width="3"/>
    <text x="${x + 92}" y="${y + 14}" fill="${accent.contrast}" font-family="${sans}" font-size="38" font-weight="900" text-anchor="middle">${i + 1}</text>
    ${stepText(step, x, y + 110, 250, 32, itemId, i)}
  `;
}

function checklistRow(step, i, x, y, w, accent, itemId) {
  return `
    ${rect(x, y, w, 116, "rgba(255,253,247,.96)", accent.soft, 28, 2)}
    <circle cx="${x + 58}" cy="${y + 58}" r="33" fill="${accent.main}"/>
    ${icon("check", x + 58, y + 58, 50, colors.white)}
    ${stepText(step, x + 118, y + 48, w - 160, 33, itemId, i)}
  `;
}

function mapTemplate(item, accent, label, centerIcon) {
  const points = [
    [150, 964],
    [1000, 964],
    [150, 1320],
    [1000, 1320],
  ];
  return `
    ${shiftCard(item, 112, 564, 1376, accent)}
    <circle cx="800" cy="1240" r="155" fill="rgba(255,253,247,.96)" stroke="${accent.main}" stroke-width="4"/>
    ${icon(centerIcon, 800, 1208, 86, accent.main)}
    <text x="800" y="1308" fill="${accent.contrast}" font-family="${sans}" font-size="28" font-weight="900" text-anchor="middle" letter-spacing="4">${label}</text>
    ${points.map(([x, y], i) => {
      const cx = x < 800 ? x + 290 : x;
      const cy = y + 92;
      return `${line(cx, cy, 800, 1240, accent.main, 3, 'opacity=".28"')}${numberedStep(item.steps[i], i, x, y, 450, 184, accent, item.id)}`;
    }).join("")}
  `;
}

function briefField(step, i, x, y, w, accent, itemId) {
  return `
    ${rect(x, y, w, 162, i % 2 === 0 ? accent.soft : "rgba(255,253,247,.96)", accent.soft, 24, 2)}
    <text x="${x + 30}" y="${y + 52}" fill="${accent.contrast}" font-family="${sans}" font-size="23" font-weight="900" letter-spacing="3">${String(i + 1).padStart(2, "0")}</text>
    ${stepText(step, x + 86, y + 54, w - 116, 31, itemId, i)}
  `;
}

function pathStation(step, i, x, y, accent, itemId) {
  return `
    <circle cx="${x + 44}" cy="${y + 44}" r="44" fill="${accent.main}"/>
    <text x="${x + 44}" y="${y + 58}" fill="${colors.white}" font-family="${sans}" font-size="35" font-weight="900" text-anchor="middle">${i + 1}</text>
    ${rect(x + 102, y, 330, 180, "rgba(255,253,247,.96)", accent.soft, 30, 2)}
    ${stepText(step, x + 132, y + 62, 270, 31, itemId, i)}
  `;
}

function boundaryCard(step, i, x, y, accent, itemId) {
  return `
    ${rect(x, y, 500, 170, "rgba(255,253,247,.96)", accent.soft, 28, 2)}
    <circle cx="${x + 58}" cy="${y + 78}" r="36" fill="${accent.soft}" stroke="${accent.main}" stroke-width="3"/>
    ${icon("boundary", x + 58, y + 78, 42, accent.main)}
    ${stepText(step, x + 118, y + 62, 330, 32, itemId, i)}
  `;
}

function makeFullSvg(item) {
  const accent = accents[item.accent] || accents.green;
  const body = templates[item.template]?.(item, accent);
  if (!body) throw new Error(`No template renderer for ${item.template}`);

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${FULL.width}" height="${FULL.height}" viewBox="0 0 ${FULL.width} ${FULL.height}">
    ${watercolorBackground(FULL.width, FULL.height, accent)}
    ${rect(42, 42, 1516, 2316, "none", "rgba(74,124,89,.24)", 54, 3)}
    ${heading(item, accent)}
    ${body}
    ${actionFooter(item, accent)}
    ${watermark()}
  </svg>`;
}

function makeThumbSvg(item) {
  const accent = accents[item.accent] || accents.green;
  const titleSize = item.title.length > 32 ? 50 : 58;
  const title = textBlock(item.title, 62, 132, 660, titleSize, {
    weight: 700,
    family: serif,
    fill: colors.ink,
    lineHeight: Math.round(titleSize * 1.08),
    maxLines: 2,
    id: `${item.id}:thumb-title`,
  });
  const thesis = textBlock(item.thesis, 62, 360, 630, 31, {
    weight: 800,
    fill: colors.ink,
    lineHeight: 39,
    maxLines: 2,
    id: `${item.id}:thumb-thesis`,
  });
  const stepTitles = item.steps
    .map((step, i) => {
      const y = 588 + i * 104;
      return `
        <circle cx="94" cy="${y - 10}" r="27" fill="${accent.main}"/>
        <text x="94" y="${y}" fill="${colors.white}" font-family="${sans}" font-size="28" font-weight="900" text-anchor="middle">${i + 1}</text>
        ${textBlock(step.title, 140, y, 520, 31, {
          weight: 900,
          fill: colors.ink,
          maxLines: 1,
          id: `${item.id}:thumb-step-${i}`,
        }).svg}
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${THUMB.width}" height="${THUMB.height}" viewBox="0 0 ${THUMB.width} ${THUMB.height}">
    ${watercolorBackground(THUMB.width, THUMB.height, accent)}
    ${rect(24, 24, 752, 1152, "rgba(255,253,247,.18)", "rgba(74,124,89,.24)", 34, 2)}
    <text x="62" y="74" fill="${accent.contrast}" font-family="${sans}" font-size="18" font-weight="900" letter-spacing="4">${escapeXml(item.eyebrow)}</text>
    ${title.svg}
    ${rect(46, 310, 708, 180, "rgba(255,253,247,.92)", accent.soft, 28, 2)}
    ${thesis.svg}
    ${stepTitles}
    ${rect(46, 1036, 708, 78, "rgba(255,253,247,.92)", accent.soft, 24, 2)}
    <text x="82" y="1085" fill="#898f96" font-family="${sans}" font-size="23" font-weight="800">KyleWegner.com/infographics</text>
  </svg>`;
}

async function renderSvg(svg, outPath) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath);
}

async function main() {
  const data = JSON.parse(await fs.readFile(DATA_PATH, "utf8"));
  await fs.mkdir(OUT_DIR, { recursive: true });

  const manifest = [];
  for (const item of data) {
    const fullPath = path.join(OUT_DIR, `${item.id}.png`);
    const thumbPath = path.join(OUT_DIR, `${item.id}-thumb.png`);
    const svgPath = path.join(OUT_DIR, `${item.id}.svg`);

    if (item.renderMode === "imagegenComposite") {
      for (const requiredPath of [fullPath, thumbPath, svgPath]) {
        try {
          await fs.access(requiredPath);
        } catch {
          throw new Error(`${item.id} is imagegen-backed but ${path.relative(ROOT, requiredPath)} is missing`);
        }
      }
      manifest.push({
        id: item.id,
        template: item.template,
        renderMode: item.renderMode,
        full: path.relative(ROOT, fullPath),
        thumbnail: path.relative(ROOT, thumbPath),
        size: `${FULL.width}x${FULL.height}`,
      });
      console.log(`Preserved ${item.id} (${item.renderMode})`);
      continue;
    }

    const fullSvg = makeFullSvg(item);
    const thumbSvg = makeThumbSvg(item);

    await fs.writeFile(svgPath, fullSvg);
    await renderSvg(fullSvg, fullPath);
    await renderSvg(thumbSvg, thumbPath);
    manifest.push({
      id: item.id,
      template: item.template,
      full: path.relative(ROOT, fullPath),
      thumbnail: path.relative(ROOT, thumbPath),
      size: `${FULL.width}x${FULL.height}`,
    });
    console.log(`Generated ${item.id} (${item.template})`);
  }

  await fs.writeFile(path.join(OUT_DIR, "layout-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
