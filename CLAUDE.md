# Namaz Süreleri — Proje Notları

## Ne yapıyor?

Namaz vakitlerinde hangi sureleri okuyacağını öneren tek sayfalık bir web uygulaması (`index.html`). 2 Rekat ve 3 Rekat için ayrı ayrı sure kombinasyonu önerir.

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

## Tasarım kararları

- Font: IBM Plex Mono (arayüz) + Lora (sure isimleri)
- Renk paleti: krem arka plan (`#f5f4f0`), beyaz kart, koyu metin
- Buton: orta gri-bej (`#6b6860`), `border-radius: 6px`
- Başlık ve Yenile butonu ortalı; içerik sayfanın üstünden başlar (`justify-content: flex-start`)
- Tek kart tasarımı, sade ve minimal

## Yapılabilecekler (fikir havuzu)

- Karanlık mod
- Sure isimlerinin Arapça gösterimi
- Namaz vakti seçimi (sabah/öğle/ikindi/akşam/yatsı) ile farklı öneriler
