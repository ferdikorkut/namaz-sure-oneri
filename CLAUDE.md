# Namaz Süreleri — Proje Notları

## Ne yapıyor?

Namaz vakitlerinde hangi sureleri okuyacağını öneren tek sayfalık bir web uygulaması. 2 Rekat ve 3 Rekat için ayrı ayrı sure kombinasyonu önerir. Ayrıca güncel Hicri tarihi gösterir.

## Dosya yapısı

- `index.html` — sadece HTML yapısı
- `style.css` — tüm stiller
- `script.js` — tüm JavaScript
- `CLAUDE.md` — proje notları

## Sure listesi

14 sure: Âyetü'l-kürsî (2), Hüvallahüllezi (59), Kadir (97), Asr (103), Fil (105), Kureyş (106), Mâûn (107), Kevser (108), Kâfirûn (109), Nasr (110), Tebbet (111), İhlâs (112), Felâk (113), Nâs (114).

## Kombinasyon kuralları (`gecerliMi`)

1. İkinci sure numarası birinciden büyük olmalı (sıralı okunur)
2. İki sure arasında tam 2 numara atlama olmaz (örn. 107 → 109 geçersiz)
3. Âyetü'l-kürsî hariç: sonraki surenin ayet sayısı öncekinden 2'den fazla olamaz

## Teknik yapı

- **Pool sistemi**: Tüm geçerli kombinasyonlar hesaplanır, Fisher-Yates ile karıştırılır, tükenene kadar tekrar gösterilmez
- **localStorage**: Havuz ve son gösterilen kombinasyon kaydedilir — sayfa kapanınca kaldığı yerden devam eder
- **İlk yükleme**: Son gösterilen kombinasyonu tekrar gösterir, yeni çekmez
- **Swipe**: Kartlar sola kaydırılarak yenilenir — parmak hareketi canlı takip eder, eşik 60px
- **Yenile butonu**: Kaldırıldı, yerini swipe aldı

## Hicri tarih

- `corsproxy.io` üzerinden `gadget.turktakvim.com/gadget.php` endpoint'ine istek atılır
- Gelen veri noktalı virgülle ayrılmış formatta gelir, index 26 Hicri tarihi taşır
- Tarih turktakvim'in kendi formatıyla gösterilir, hiçbir çeviri yapılmaz
- Günlük cache: cihazın **yerel** tarihine göre günde bir kez sorgu atılır
- `visibilitychange` ve `pageshow` olaylarında da kontrol edilir (iPhone ana ekran uyumluluğu)
- Cache key: `hicri_tarih_v3` / `hicri_gun_v3`

## Sure metinleri (drawer)

- Sure adına tıklayınca ekranın altından drawer açılır
- 14 surenin tamamının Türkçe okunuşu `SURE_METINLER` objesinde script.js içinde gömülü
- Âyetü'l-kürsî ve Hüvallahüllezi için `subtitle` alanı var (parantezli ek bilgi)
- Numaralı ayetler (`1-`, `2-` vb.) hanging indent ile hizalanır

## Tasarım kararları

- Font: sistem sans-serif (`system-ui, -apple-system, ...`) — Google Fonts kullanılmıyor
- Renk paleti: krem arka plan (`#f5f4f0`), beyaz kart, koyu metin
- Kartlar: `border-radius: 8px`
- Body padding: `1rem`
- Sayaç: kartın altında ortalanmış, `← X / toplam →` formatında
- Başlık ve Hicri tarih ortalı, içerik sayfanın üstünden başlar

## Yayın

GitHub Pages: https://ferdikorkut.github.io/namaz-sure-oneri/
