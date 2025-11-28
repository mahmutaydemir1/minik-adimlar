# 👶 Minik Adımlar

Hamilelik ve 0-6 yaş arası çocuk gelişimini takip etmek için tasarlanmış kapsamlı bir mobil uygulama.

## ✨ Özellikler

### 🤰 Hamilelik Takibi
- Haftalık hamilelik bilgileri ve gelişim takibi
- Bebeğin boyut ve gelişim aşamaları
- Haftalık öneriler ve ipuçları
- Tahmini doğum tarihi hesaplama
- Önemli kontrol ve tarama hatırlatıcıları

### ⭐ Gelişim Kilometre Taşları
- Yaş gruplarına göre gelişim beklentileri (0-6 yaş)
- Fiziksel, sosyal, bilişsel ve dil gelişimi takibi
- Her yaş grubu için detaylı kilometre taşları
- Kategori bazlı gelişim göstergeleri

### 💉 Aşı Takvimi
- Türkiye Sağlık Bakanlığı aşı takvimine uygun
- Zorunlu ve opsiyonel aşılar
- Aşı hatırlatıcıları
- Tamamlanan aşıların takibi
- Detaylı aşı açıklamaları

### 📊 Büyüme Takibi
- Kilo ve boy ölçümleri
- Tarihsel büyüme kayıtları
- Grafik ve istatistikler

### 📝 Günlük ve Notlar
- Günlük gelişim notları
- Özel anların kaydı
- Tarih bazlı organizasyon

## 🎨 Tasarım Özellikleri

- Modern ve kullanıcı dostu arayüz
- Renkli ve eğlenceli tasarım
- Kolay navigasyon
- Responsive tasarım
- Tutarlı tasarım sistemi

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- iOS Simulator veya Android Emulator (opsiyonel)

### Adımlar

1. Projeyi klonlayın:
\`\`\`bash
git clone [repository-url]
cd minik-adimlar
\`\`\`

2. Bağımlılıkları yükleyin:
\`\`\`bash
npm install
\`\`\`

3. Uygulamayı başlatın:
\`\`\`bash
npm start
\`\`\`

4. Expo Go uygulaması ile QR kodu tarayın veya emulator'de çalıştırın:
\`\`\`bash
npm run android  # Android için
npm run ios      # iOS için
\`\`\`

## 📱 Kullanılan Teknolojiler

- **React Native** - Mobil uygulama framework'ü
- **Expo** - React Native geliştirme platformu
- **React Navigation** - Navigasyon yönetimi
- **Zustand** - State yönetimi
- **AsyncStorage** - Veri saklama
- **Day.js** - Tarih işlemleri
- **Expo Vector Icons** - İkon kütüphanesi

## 📂 Proje Yapısı

\`\`\`
minik-adimlar/
├── src/
│   ├── components/          # Yeniden kullanılabilir bileşenler
│   │   ├── Badge.js
│   │   ├── Card.js
│   │   ├── PrimaryButton.js
│   │   ├── ScreenContainer.js
│   │   └── TextInputField.js
│   ├── constants/           # Sabitler ve yapılandırmalar
│   │   ├── theme.js        # Tasarım sistemi
│   │   ├── milestones.js   # Gelişim kilometre taşları
│   │   └── vaccines.js     # Aşı takvimi
│   ├── navigation/          # Navigasyon yapılandırması
│   │   ├── MainTabs.js
│   │   ├── RootNavigator.js
│   │   └── types.js
│   ├── screens/             # Uygulama ekranları
│   │   ├── children/       # Çocuk takibi ekranları
│   │   ├── onboarding/     # Onboarding ekranı
│   │   ├── pregnancy/      # Hamilelik takibi
│   │   └── settings/       # Ayarlar
│   └── store/              # State yönetimi
│       └── appStore.js
├── assets/                  # Görseller ve medya
├── App.js                   # Ana uygulama dosyası
└── package.json
\`\`\`

## 🎯 Gelecek Özellikler

- [ ] Grafik ve istatistikler
- [ ] Fotoğraf albümü
- [ ] Hatırlatıcı bildirimleri
- [ ] Veri yedekleme ve geri yükleme
- [ ] Çoklu dil desteği
- [ ] Karanlık mod
- [ ] Doktor randevu takibi
- [ ] Beslenme rehberi
- [ ] Uyku takibi

## ⚠️ Önemli Not

Bu uygulama bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. Sağlık konularında mutlaka doktorunuza danışın.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Minik Adımlar - Hamilelik ve Çocuk Gelişimi Takip Uygulaması

---

💕 Sevgiyle geliştirildi
