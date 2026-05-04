

# React Native Araç Durum Takip Ekranı

React Native · Expo · TypeScript ile geliştirilmiş araç filo takip uygulaması.

## Özellikler

- Araç listesi (FlatList) — plaka, model, sürücü, KM, son servis tarihi
- Durum badge'leri — Aktif (yeşil), Bakımda (sarı), Arızalı (kırmızı)
- Pull-to-refresh ile veri yenileme
- Skeleton loading animasyonu
- Hata durumu yönetimi ve retry butonu
- Araç detay sayfası (slide-in animasyonlu geçiş)
- Duruma göre filtreleme (Toplam / Aktif / Bakımda / Arızalı)
- AsyncStorage ile offline cache desteği
- TypeScript ile tip güvenliği
- iOS ve Android uyumlu

## Kurulum

### Gereksinimler

- Node.js 18+
- Expo Go (iOS veya Android)

### Adımlar

```bash
git clone https://github.com/ruveydaisikk/React-Native-Arac-Takip-Mobil.git
cd React-Native-Arac-Takip-Mobil
npm install
npx expo start
```

Terminalde QR kod çıkacak. Expo Go uygulamasını açıp QR kodu tarayın.

## Teknoloji Stack

- React Native
- Expo SDK 54
- TypeScript
- React Navigation (Native Stack)
- AsyncStorage
- Animated API

## Test Edilen Platformlar

- **Android** — Samsung Galaxy gerçek cihazda Expo Go uygulaması ile test edildi
- **iOS** — iPhone 16 Pro Simulator, Expo Snack üzerinden tarayıcıda test edildi → [iOS Snack Linki](https://snack.expo.dev/@ruveyda38756/07778a?platform=ios)

## Ekran Görüntüleri

| Android | iOS |
|---------|-----|
| <img src="screenshots/ana ekran.jpeg" width="200"/> | <img src="screenshots/ana ekran-ios.JPG" width="200"/> |
| <img src="screenshots/aktif araçlar.jpeg" width="200"/> | <img src="screenshots/aktif-ios.JPG" width="200"/> |
| <img src="screenshots/bakımda.jpeg" width="200"/> | <img src="screenshots/bakımda-ios.JPG" width="200"/> |
| <img src="screenshots/bakımdaki araçlar.jpeg" width="200"/> | <img src="screenshots/aktif detaylar-ios.JPG" width="200"/> |
| <img src="screenshots/arızalı.jpeg" width="200"/> | <img src="screenshots/bakımda detaylar-ios.JPG" width="200"/> |
| <img src="screenshots/arızalı araçlar.jpeg" width="200"/> | <img src="screenshots/arızalı-ios.JPG" width="200"/> |
| <img src="screenshots/aktif.jpeg" width="200"/> | <img src="screenshots/arızalı detaylar-ios.JPG" width="200"/> |

https://github.com/user-attachments/assets/6e1847a2-f056-46a1-9e53-93d3424be95b

https://github.com/user-attachments/assets/f803a276-05d1-4640-ba72-6c7124e9f646

https://github.com/user-attachments/assets/91f13bd1-9b2e-47e1-a4f2-3189d340830b

## Bonus Özellikler

- ✅ Araç detay sayfasına animasyonlu geçiş (kart press animasyonu + slide-in)
- ✅ AsyncStorage ile offline cache — son başarılı veri kaydedilir
- ✅ Duruma göre özet sayaçlar — tıklayınca filtreleme yapar
- ✅ TypeScript tip güvenliği
