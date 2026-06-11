import { writeFile, mkdir } from 'fs/promises';
import { createWriteStream, existsSync } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

const BASE = '/Users/admin/Desktop/avangard-clone/public';

const assets = [
  // Logo & icons
  { url: 'https://www.avangard-sp.ru/local/templates/main/images/logo.svg', dest: 'images/logo.svg' },
  { url: 'https://www.avangard-sp.ru/local/templates/main/images/helm.png', dest: 'images/helm.png' },
  { url: 'https://www.avangard-sp.ru/local/templates/main/images/cart-icon.png', dest: 'images/cart-icon.png' },
  { url: 'https://www.avangard-sp.ru/local/templates/main/images/icon/search-blue.png', dest: 'images/icon/search-blue.png' },
  { url: 'https://www.avangard-sp.ru/local/templates/main/images/icon/registration-blue.png', dest: 'images/icon/registration-blue.png' },
  { url: 'https://www.avangard-sp.ru/local/templates/main/images/icon/registration-icon.png', dest: 'images/icon/registration-icon.png' },

  // Hero slider images
  { url: 'https://www.avangard-sp.ru/upload/webp/9fc/9m89mibyt8arr1ztb715ryd8crs1dvox85.webp', dest: 'images/hero/slide-1.webp' },
  { url: 'https://www.avangard-sp.ru/upload/webp/8eb/0t73a3omjj49j7yjhh28prqmc9mk3zr485.webp', dest: 'images/hero/slide-2.webp' },
  { url: 'https://www.avangard-sp.ru/upload/webp/16d/bossd50luu671dcgniq13zmkg3d2vc0d85.webp', dest: 'images/hero/slide-3.webp' },
  { url: 'https://www.avangard-sp.ru/upload/webp/4b4/e3lvklg3ctnbbijg2rta6o5tor0nrdbk85.webp', dest: 'images/hero/slide-4.webp' },
  { url: 'https://www.avangard-sp.ru/upload/webp/e17/lv22j3whln275sck404vhd82jmptm2t685.webp', dest: 'images/hero/slide-5.webp' },
  { url: 'https://www.avangard-sp.ru/upload/webp/d96/fs32xjprpw1plkb7m1xun32irrzreke385.webp', dest: 'images/hero/slide-6.webp' },

  // Category cards
  { url: 'https://www.avangard-sp.ru/upload/uf/010/010dc90a3e4048c2832e92f5ad9681ac.jpg', dest: 'images/categories/forma-povarov.jpg' },
  { url: 'https://www.avangard-sp.ru/upload/uf/250/250f80f50dd4802d5399f238b2bdc7ba.jpg', dest: 'images/categories/letnyaya.jpg' },
  { url: 'https://www.avangard-sp.ru/upload/uf/ea4/ea49f2c6b8ccd480662ec21af0392162.jpg', dest: 'images/categories/novinki.jpg' },
  { url: 'https://www.avangard-sp.ru/upload/uf/14f/14f5cd940103fbb021cd1560c42af52d.jpg', dest: 'images/categories/zashchitnaya.jpg' },

  // Product images
  { url: 'https://www.avangard-sp.ru/upload/resize_cache/iblock/82f/273_280_1/yviv7hq6qf4hec6op68o3mdc0bwdakfd.jpg', dest: 'images/products/legion.jpg' },
  { url: 'https://www.avangard-sp.ru/upload/resize_cache/iblock/2b6/273_280_1/lzr53z70prmhqoqsudkuiy8u1mmp2znn.jpg', dest: 'images/products/vivat.jpg' },
  { url: 'https://www.avangard-sp.ru/upload/resize_cache/iblock/93d/273_280_1/7ot227uo442cq31n8z4jqhhuk6fabbu5.jpg', dest: 'images/products/djoker.jpg' },
  { url: 'https://www.avangard-sp.ru/upload/resize_cache/iblock/404/273_280_1/rmuf6w53frpwbyjmn5iewpx2nyy5bz1r.jpg', dest: 'images/products/korvet.jpg' },

  // News images
  { url: 'https://www.avangard-sp.ru/upload/resize_cache/iblock/081/400_300_2/yw8w17bln62wgwpe6gqj72obhkqbxpul.png', dest: 'images/news/forma-povarov.png' },

  // Flag icon (product cards)
  { url: 'https://www.avangard-sp.ru/local/templates/main/images/zaklyuchenie-icon.jpg', dest: 'images/rf-flag.jpg' },
];

async function downloadAsset(url, dest) {
  const fullDest = path.join(BASE, dest);
  const dir = path.dirname(fullDest);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  if (existsSync(fullDest)) {
    console.log(`SKIP ${dest}`);
    return;
  }
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AssetDownloader/1.0)' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ws = createWriteStream(fullDest);
    await pipeline(res.body, ws);
    console.log(`OK   ${dest}`);
  } catch (e) {
    console.error(`FAIL ${dest}: ${e.message}`);
  }
}

// Download in batches of 4
const batchSize = 4;
for (let i = 0; i < assets.length; i += batchSize) {
  const batch = assets.slice(i, i + batchSize);
  await Promise.all(batch.map(a => downloadAsset(a.url, a.dest)));
}
console.log('Done.');
