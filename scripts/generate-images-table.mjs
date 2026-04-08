import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const fontPath = `${__dirname}/../docs/public/font.json`;
const langPath = `${__dirname}/../docs/public/minecraft/lang/uk_ua.json`;
const outputPath = `${__dirname}/../docs/images.md`;

const fontData = JSON.parse(readFileSync(fontPath, 'utf-8'));
const langData = JSON.parse(readFileSync(langPath, 'utf-8'));

const providers = Array.isArray(fontData.providers) ? fontData.providers : [];

const IMAGE_SIZE = 72;
const IMAGE_STYLE = 'image-rendering: pixelated;  display: block; margin: 0 auto;';
const ASSETS_BASE_URL = 'https://assets.mcasset.cloud/1.21.11/assets/minecraft/textures/';

function getUkTranslation(file, icon) {
  const addCandidate = (arr, key) => {
    if (key && !arr.includes(key)) {
      arr.push(key);
    }
  };

  const resourcePath = String(file).replace('minecraft:', '').replace(/\.png$/, '');
  const candidates = [];

  if (resourcePath.startsWith('item/')) {
    const id = resourcePath.slice('item/'.length);
    addCandidate(candidates, `item.minecraft.${id}`);
    addCandidate(candidates, `block.minecraft.${id}`);
    if (id.startsWith('music_disc_')) {
      addCandidate(candidates, `item.minecraft.${id}.desc`);
    }
    const match = id.match(/^(compass|clock|recovery_compass|bow|crossbow)(?:_pulling|_arrow|_firework)?_\d+$/);
    if (match) {
      addCandidate(candidates, `item.minecraft.${match[1]}`);
    }
  } else if (resourcePath.startsWith('block/')) {
    const id = resourcePath.slice('block/'.length);
    addCandidate(candidates, `block.minecraft.${id}`);
    addCandidate(candidates, `item.minecraft.${id}`);
  } else if (resourcePath.startsWith('sign_icons/')) {
    const id = resourcePath.slice('sign_icons/'.length);
    addCandidate(candidates, `block.minecraft.${id}`);
    addCandidate(candidates, `item.minecraft.${id}`);

    const prefixMap = {
      block_of_: 'block',
      ore_: 'ore',
      planks_: 'planks',
      leaves_: 'leaves',
      log_: 'log',
      wool_: 'wool',
      glazed_terracotta_: 'glazed_terracotta',
    };

    for (const [prefix, suffix] of Object.entries(prefixMap)) {
      if (id.startsWith(prefix)) {
        const tail = id.slice(prefix.length);
        let actualSuffix = suffix;
        if (prefix === 'log_' && (tail === 'crimson' || tail === 'warped')) actualSuffix = 'stem';
        addCandidate(candidates, `block.minecraft.${tail}_${actualSuffix}`);
      }
    }

    const stripPrefixes = ['end_', 'farmable_', 'masonry_', 'nature_', 'natural_', 'redstone_', 'utility_', 'nether_', 'sea_', 'technical_', 'transparent_', 'ore_'];
    for (const prefix of stripPrefixes) {
      if (id.startsWith(prefix)) {
        const tail = id.slice(prefix.length);
        addCandidate(candidates, `block.minecraft.${tail}`);
        addCandidate(candidates, `item.minecraft.${tail}`);
        
        const base = tail.replace(/_(on|off|empty|full|active|inactive|emtpy)$/, '');
        addCandidate(candidates, `block.minecraft.${base}`);
        addCandidate(candidates, `item.minecraft.${base}`);
      }
    }

    if (id === 'endstone') {
      addCandidate(candidates, 'block.minecraft.end_stone');
    } else if (id === 'masonry_chiselsed_quartz_block') {
      addCandidate(candidates, 'block.minecraft.chiseled_quartz_block');
    } else if (id === 'masonry_sandstone_red') {
      addCandidate(candidates, 'block.minecraft.red_sandstone');
    } else if (id === 'natural_sand_red') {
      addCandidate(candidates, 'block.minecraft.red_sand');
    } else if (id === 'natural_snow_grass') {
      addCandidate(candidates, 'block.minecraft.grass_block');
    } else if (id === 'block_of_copper_oxidized') {
      addCandidate(candidates, 'block.minecraft.oxidized_copper');
    } else if (id === 'nether_ore_gold') {
      addCandidate(candidates, 'block.minecraft.nether_gold_ore');
    } else if (id === 'nether_ore_quartz') {
      addCandidate(candidates, 'block.minecraft.nether_quartz_ore');
    } else if (id === 'utility_fletcher_table') {
      addCandidate(candidates, 'block.minecraft.fletching_table');
    } else if (id === 'log_bamboo') {
      addCandidate(candidates, 'block.minecraft.bamboo_block');
    } else if (id === 'log_bamboo_stripped') {
      addCandidate(candidates, 'block.minecraft.stripped_bamboo_block');
    } else if (id === 'nether_magma') {
      addCandidate(candidates, 'block.minecraft.magma_block');
    } else if (id.startsWith('command_block_')) {
      const type = id.slice('command_block_'.length);
      addCandidate(candidates, `block.minecraft.${type}_command_block`);
    } else if (id.startsWith('froglight_')) {
      const type = id.slice('froglight_'.length).replace('pearlsecent', 'pearlescent');
      addCandidate(candidates, `block.minecraft.${type}_froglight`);
    } else if (id.startsWith('ice_')) {
      const type = id.slice('ice_'.length);
      addCandidate(candidates, `block.minecraft.${type}_ice`);
    } else if (id.startsWith('bricks_')) {
      const type = id.slice('bricks_'.length);
      addCandidate(candidates, `block.minecraft.${type}_bricks`);
    }
  }

  for (const key of candidates) {
    if (langData[key]) {
      if (key.endsWith('.desc')) {
        const base = key.replace(/\.desc$/, '');
        const baseValue = langData[base] || icon;
        return `${baseValue}: ${langData[key]}`;
      }
      return langData[key];
    }
  }

  return '—';
}

function buildPngThumbnail(file, icon) {
  if (file === 'minecraft:font/logo.png') {
    return `<img src="/minecraft/textures/font/logo.png" alt="${icon}" loading="lazy" width="128" height="128" style="${IMAGE_STYLE}" />`;
  }

  const resourcePath = file.replace('minecraft:', '');

  if (resourcePath.startsWith('item/') || resourcePath.startsWith('block/')) {
    const url = `${ASSETS_BASE_URL}${resourcePath}`;
    return `<img src="${url}" alt="${icon}" loading="lazy" width="${IMAGE_SIZE}" height="${IMAGE_SIZE}" style="${IMAGE_STYLE}" />`;
  }

  if (file.startsWith('minecraft:sign_icons/')) {
    console.warn(`Warning: Skipping ${resourcePath} as it is not a valid texture path.`);
    return `<img src="/minecraft/textures/${resourcePath}" alt="${icon}" loading="lazy" width="${IMAGE_SIZE}" height="${IMAGE_SIZE}" style="${IMAGE_STYLE}" />`;
  }

  return '—';
}

const rows = [];
for (const provider of providers) {
  if (provider?.type !== 'bitmap' || !provider?.file || !Array.isArray(provider?.chars)) {
    continue;
  }

  const fileName = basename(provider.file, '.png');
  const category = provider.file.includes('/')
    ? provider.file.split('/').slice(0, -1).pop() || 'misc'
    : 'misc';
  const pngThumbnail = buildPngThumbnail(provider.file, fileName);
  const ukTranslation = getUkTranslation(provider.file, fileName);

  for (const charLine of provider.chars) {
    for (const char of String(charLine)) {
      const codePoint = char.codePointAt(0);
      if (codePoint === undefined) {
        continue;
      }

      rows.push({
        char,
        code: `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`,
        file: provider.file,
        icon: fileName,
        category,
        png: pngThumbnail,
        uk: ukTranslation,
      });
    }
  }
}

rows.sort((a, b) => {
  if (a.uk === '—' && b.uk !== '—') return 1;
  if (a.uk !== '—' && b.uk === '—') return -1;
  const cmp = a.uk.localeCompare(b.uk, 'uk-UA');
  if (cmp !== 0) return cmp;
  return a.code.localeCompare(b.code);
});

const grouped = {};
for (const row of rows) {
  if (!grouped[row.category]) grouped[row.category] = [];
  grouped[row.category].push(row);
}

const categoryNames = {
  'minecraft:sign_icons': 'Блоки',
  'minecraft:item': 'Предмети',
  'minecraft:font': 'Шрифти та логотипи',
};

const contentParts = [
  '<script setup>',
  'function onSearch(e) {',
  '  const term = e.target.value.toLowerCase();',
  '  document.querySelectorAll(".vp-doc table").forEach(table => {',
  '    let hasVisibleRows = false;',
  '    table.querySelectorAll("tbody tr").forEach(tr => {',
  '      const match = tr.innerText.toLowerCase().includes(term);',
  '      tr.style.display = match ? "" : "none";',
  '      if (match) hasVisibleRows = true;',
  '    });',
  '    // Optionally hide the category header if all rows are hidden (previousElement)',
  '    const h2 = table.previousElementSibling;',
  '    if (h2 && h2.tagName === "H2") {',
  '      h2.style.display = hasVisibleRows || !term ? "" : "none";',
  '    }',
  '    table.style.display = hasVisibleRows || !term ? "" : "none";',
  '  });',
  '}',
  '</script>',
  '',
  '# 🖼️ Гарне оформлення іконок (ГОІ)',
  '## Задля оптимізації на сервері є іконки деяких предметів, які можна використовувати як символ у табличках.',
  '![ГОІ](/images/goi.jpg)',
  '<input type="search" placeholder="Пошук символів..." @input="onSearch" style="width: 100%; padding: 16px 16px; margin: 2rem 0 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-mute); color: var(--vp-c-text-1); font-size: 16px;" autofocus />',
  ''
];

const categoryOrder = Object.keys(categoryNames);
const categories = Object.keys(grouped).sort((a, b) => {
  const ia = categoryOrder.indexOf(a);
  const ib = categoryOrder.indexOf(b);
  if (ia !== -1 && ib !== -1) return ia - ib;
  if (ia !== -1) return -1;
  if (ib !== -1) return 1;
  return a.localeCompare(b);
});

for (const category of categories) {
  const catName = categoryNames[category] || category;
  contentParts.push(`## ${catName}\n`);
  contentParts.push('| PNG   | Символ| Код   | Назва  |');
  contentParts.push('| :---: | :---: | :---: | :---:  |');
  
  for (const row of grouped[category]) {
    contentParts.push(`| <div align="center">${row.png}</div> | <div align="center">${row.char}</div> | <div align="center">${row.code}</div> | ${row.uk} |`);
  }
  contentParts.push(''); // blank line after table
}

const content = contentParts.join('\n');
writeFileSync(outputPath, content, 'utf-8');

console.log(`Generated ${rows.length} rows in docs/images.md`);
