const SURELER = [
  { isim: "Âyetü'l-kürsî", no: 2,   ayet: 1  },
  { isim: "Hüvallahüllezi",  no: 59,  ayet: 3  },
  { isim: "Kadir",            no: 97,  ayet: 5  },
  { isim: "Asr",              no: 103, ayet: 3  },
  { isim: "Fil",              no: 105, ayet: 5  },
  { isim: "Kureyş",           no: 106, ayet: 4  },
  { isim: "Mâûn",             no: 107, ayet: 7  },
  { isim: "Kevser",           no: 108, ayet: 3  },
  { isim: "Kâfirûn",          no: 109, ayet: 6  },
  { isim: "Nasr",             no: 110, ayet: 3  },
  { isim: "Tebbet",           no: 111, ayet: 5  },
  { isim: "İhlâs",            no: 112, ayet: 4  },
  { isim: "Felâk",            no: 113, ayet: 5  },
  { isim: "Nâs",              no: 114, ayet: 6  },
];

function gecerliMi(s1, s2) {
  if (s2.no <= s1.no) return false;
  if (s2.no - s1.no === 2) return false;
  if (s1.isim !== "Âyetü'l-kürsî") {
    if (s2.ayet > s1.ayet && s2.ayet - s1.ayet > 2) return false;
  }
  return true;
}

function hesaplaKombinasyonlar() {
  const ikili = [];
  const uclu = [];

  for (let i = 0; i < SURELER.length; i++) {
    for (let j = i + 1; j < SURELER.length; j++) {
      if (gecerliMi(SURELER[i], SURELER[j])) {
        ikili.push([i, j]);
        for (let k = j + 1; k < SURELER.length; k++) {
          if (gecerliMi(SURELER[j], SURELER[k])) {
            uclu.push([i, j, k]);
          }
        }
      }
    }
  }
  return { ikili, uclu };
}

function karistir(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const KEY2 = 'namaz_havuz2';
const KEY3 = 'namaz_havuz3';
const KEY_SON2 = 'namaz_son2';
const KEY_SON3 = 'namaz_son3';

const { ikili, uclu } = hesaplaKombinasyonlar();

function havuzYukle(key, tumKombolar) {
  try {
    const kayitli = localStorage.getItem(key);
    if (kayitli) {
      const parsed = JSON.parse(kayitli);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch(e) {}
  return karistir(tumKombolar);
}

function havuzKaydet(key, havuz) {
  try {
    localStorage.setItem(key, JSON.stringify(havuz));
  } catch(e) {}
}

function sonrakiKombo(key, havuz, tumKombolar) {
  if (havuz.length === 0) {
    havuz.push(...karistir(tumKombolar));
  }
  const kombo = havuz.pop();
  havuzKaydet(key, havuz);
  return kombo;
}

function sureSatiri(sure) {
  const div = document.createElement('div');
  div.className = 'sure-row';
  div.innerHTML = `
    <span class="sure-name">${sure.isim}</span>
    <span class="sure-ayet">${sure.ayet}</span>
    <span class="sure-no">${sure.no}</span>
  `;
  return div;
}

function goster(containerId, indisler, counterId, havuz, toplamRef) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  indisler.forEach((idx, i) => {
    const el = sureSatiri(SURELER[idx]);
    container.appendChild(el);
    setTimeout(() => el.classList.add('visible'), i * 80);
  });
  const kalan = havuz.length;
  const toplam = toplamRef.length;
  const gosterilen = toplam - kalan;
  document.getElementById(counterId).textContent = `${gosterilen} / ${toplam}`;
}

let havuz2 = havuzYukle(KEY2, ikili);
let havuz3 = havuzYukle(KEY3, uclu);

window.yenile = function() {
  const kombo2 = sonrakiKombo(KEY2, havuz2, ikili);
  const kombo3 = sonrakiKombo(KEY3, havuz3, uclu);
  try {
    localStorage.setItem(KEY_SON2, JSON.stringify(kombo2));
    localStorage.setItem(KEY_SON3, JSON.stringify(kombo3));
  } catch(e) {}
  goster('sureler2', kombo2, 'counter2', havuz2, ikili);
  goster('sureler3', kombo3, 'counter3', havuz3, uclu);
};

function ilkYukleme() {
  try {
    const son2 = localStorage.getItem(KEY_SON2);
    const son3 = localStorage.getItem(KEY_SON3);
    if (son2 && son3) {
      goster('sureler2', JSON.parse(son2), 'counter2', havuz2, ikili);
      goster('sureler3', JSON.parse(son3), 'counter3', havuz3, uclu);
      return;
    }
  } catch(e) {}
  yenile();
}

ilkYukleme();

async function hicriTarihGetir() {
  const CACHE_TARIH = 'hicri_tarih_v2';
  const CACHE_GUN = 'hicri_gun_v2';
  const bugun = new Date().toISOString().slice(0, 10);

  try {
    const kayitliGun = localStorage.getItem(CACHE_GUN);
    const kayitliTarih = localStorage.getItem(CACHE_TARIH);
    if (kayitliTarih && kayitliGun === bugun) {
      document.getElementById('hicri-tarih').textContent = kayitliTarih;
      return;
    }
  } catch(e) {}

  try {
    const hedef = `https://gadget.turktakvim.com/gadget.php?pg=1&sid=5753&cityID=5753&_=${Date.now()}`;
    console.log('[hicri] istek:', hedef);
    const res = await fetch('https://corsproxy.io/?' + encodeURIComponent(hedef));
    console.log('[hicri] status:', res.status);
    const html = await res.text();
    console.log('[hicri] html (ilk 500):', html.slice(0, 500));
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const div = doc.getElementById('hicritarih');
    console.log('[hicri] div:', div ? div.outerHTML : 'bulunamadı');
    if (!div) return;
    const tarih = div.textContent.trim();
    console.log('[hicri] tarih:', tarih);
    if (!tarih) return;
    document.getElementById('hicri-tarih').textContent = tarih;
    try {
      localStorage.setItem(CACHE_TARIH, tarih);
      localStorage.setItem(CACHE_GUN, bugun);
    } catch(e) {}
  } catch(e) {
    console.warn('[hicri] hata:', e);
  }
}

hicriTarihGetir();
