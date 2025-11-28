# 🔧 Sorun Giderme Rehberi

## Babel Hatası Çözümü

Eğer `react-native-reanimated` ile ilgili hata alırsanız:

### Çözüm 1: Cache Temizleme
```bash
npx expo start --clear
```

### Çözüm 2: Node Modules Yeniden Yükleme
```bash
# Node modules'ü sil
rmdir /s /q node_modules

# Package lock'u sil
del package-lock.json

# Yeniden yükle
npm install --legacy-peer-deps
```

### Çözüm 3: Metro Bundler'ı Yeniden Başlatma
1. Terminalde `Ctrl + C` ile durdur
2. `npm start` ile yeniden başlat

## Genel Sorunlar

### Port Kullanımda Hatası
Eğer "Port 8081 is being used" hatası alırsanız:
- Önerilen alternatif portu kabul edin (Y)
- Veya başka bir port belirtin: `npx expo start --port 8090`

### iOS/Android Simulator Açılmıyor
- iOS için: Xcode yüklü olmalı (sadece Mac)
- Android için: Android Studio ve emulator kurulu olmalı
- Alternatif: Expo Go uygulamasını telefonunuza indirin

### Bağımlılık Çakışması
Eğer peer dependency hatası alırsanız:
```bash
npm install --legacy-peer-deps
```

## Uygulama Çalıştırma

### Expo Go ile (Önerilen)
1. Telefonunuza Expo Go uygulamasını indirin
2. `npm start` komutu ile başlatın
3. QR kodu Expo Go ile tarayın

### Emulator ile
```bash
# Android
npm run android

# iOS (sadece Mac)
npm run ios
```

### Web'de Test
```bash
npm run web
```

## Performans İyileştirme

### Cache Temizleme
```bash
npx expo start --clear
```

### Watchman Cache (Mac/Linux)
```bash
watchman watch-del-all
```

## Veri Sıfırlama

Eğer uygulamadaki verileri sıfırlamak isterseniz:
1. Uygulamayı telefondan silin
2. Yeniden yükleyin

Veya kod ile:
```javascript
// appStore.js içinde
AsyncStorage.clear();
```

## Yardım

Sorun devam ederse:
1. Hata mesajının tam metnini kaydedin
2. `package.json` dosyasını kontrol edin
3. Node.js versiyonunu kontrol edin: `node --version` (v14+ olmalı)
4. npm versiyonunu kontrol edin: `npm --version`

## Faydalı Komutlar

```bash
# Proje bilgisi
npx expo doctor

# Bağımlılıkları kontrol et
npm list

# Outdated paketleri gör
npm outdated

# Expo versiyonunu kontrol et
npx expo --version
```

---

**Not:** Çoğu sorun cache temizleme ve node_modules yeniden yükleme ile çözülür.
