# 🧪 Test Senaryoları - Bildirim Sistemi

## 📱 Test Ortamı Gereksinimleri

### Gerekli
- ✅ Fiziksel cihaz (iOS veya Android)
- ✅ Expo Go uygulaması yüklü
- ✅ Bildirim izni verilmiş

### Opsiyonel
- 📱 Test için birden fazla cihaz
- ⏰ Farklı saat dilimlerinde test

## 🎯 Test Senaryoları

### Test 1: İlk Kurulum ve İzin İsteme
**Amaç:** Bildirim izninin doğru şekilde istendiğini kontrol et

**Adımlar:**
1. Uygulamayı ilk kez aç
2. Ayarlar ekranına git
3. "Bildirimler" menüsüne tıkla
4. İzin dialogunu kontrol et

**Beklenen Sonuç:**
- ✅ İzin dialogu açılır
- ✅ "İzin Ver" seçeneği var
- ✅ "İzin Verme" seçeneği var

**Gerçek Sonuç:**
- [ ] Başarılı
- [ ] Başarısız
- [ ] Notlar: _______________

---

### Test 2: Aşı Hatırlatıcısı
**Amaç:** Aşı tamamlandığında hatırlatıcının eklendiğini kontrol et

**Adımlar:**
1. Bir çocuk ekle (örn: Ali, doğum tarihi: bugün)
2. Aşılar ekranına git
3. İlk aşıyı (BCG) tamamla
4. Onay mesajını kontrol et
5. Ayarlar → Bildirimler → Planlanmış bildirimleri kontrol et

**Beklenen Sonuç:**
- ✅ "Aşı tamamlandı!" mesajı görünür
- ✅ "Sonraki aşı için hatırlatıcı eklendi" mesajı görünür
- ✅ Planlanmış bildirimler listesinde görünür

**Gerçek Sonuç:**
- [ ] Başarılı
- [ ] Başarısız
- [ ] Notlar: _______________

---

### Test 3: Günlük Hatırlatıcısı
**Amaç:** Günlük ekranına girildiğinde hatırlatıcının kurulduğunu kontrol et

**Adımlar:**
1. Günlük ekranına git
2. Ayarlar → Bildirimler → "Günlük Hatırlatıcıları" açık olduğunu kontrol et
3. Console loglarını kontrol et (hatırlatıcı kuruldu mu?)
4. Planlanmış bildirimleri kontrol et

**Beklenen Sonuç:**
- ✅ Hatırlatıcı sessizce kurulur
- ✅ Console'da "Günlük hatırlatıcısı kuruldu" mesajı yok (hata yoksa)
- ✅ Planlanmış bildirimler listesinde görünür

**Gerçek Sonuç:**
- [ ] Başarılı
- [ ] Başarısız
- [ ] Notlar: _______________

---

### Test 4: Büyüme Hatırlatıcısı
**Amaç:** Büyüme ekranına girildiğinde hatırlatıcının kurulduğunu kontrol et

**Adımlar:**
1. Bir çocuk seç
2. Büyüme ekranına git
3. Ayarlar → Bildirimler → "Büyüme Ölçümü Hatırlatıcıları" açık olduğunu kontrol et
4. Planlanmış bildirimleri kontrol et

**Beklenen Sonuç:**
- ✅ Hatırlatıcı sessizce kurulur
- ✅ Her ayın 1'i için planlanmış
- ✅ Planlanmış bildirimler listesinde görünür

**Gerçek Sonuç:**
- [ ] Başarılı
- [ ] Başarısız
- [ ] Notlar: _______________

---

### Test 5: Hamilelik Hatırlatıcısı
**Amaç:** Hamilelik eklendiğinde hatırlatıcının kurulduğunu kontrol et

**Adımlar:**
1. Hamilelik ekle (son adet tarihi: 2 hafta önce)
2. Hamilelik ekranına git
3. Ayarlar → Bildirimler → "Hamilelik Bildirimleri" açık olduğunu kontrol et
4. Planlanmış bildirimleri kontrol et

**Beklenen Sonuç:**
- ✅ Hatırlatıcı sessizce kurulur
- ✅ Her Pazartesi sabah 9:00 için planlanmış
- ✅ Planlanmış bildirimler listesinde görünür

**Gerçek Sonuç:**
- [ ] Başarılı
- [ ] Başarısız
- [ ] Notlar: _______________

---

### Test 6: Bildirim Ayarlarını Kapatma
**Amaç:** Ayarlardan bildirimlerin kapatılabildiğini kontrol et

**Adımlar:**
1. Ayarlar → Bildirimler
2. "Bildirimleri Aktif Et" switch'ini kapat
3. Onay dialogunu kontrol et
4. Planlanmış bildirimleri kontrol et

**Beklenen Sonuç:**
- ✅ "Tüm bildirimler iptal edilecek" onay dialogu açılır
- ✅ Onaylandığında tüm bildirimler iptal edilir
- ✅ Planlanmış bildirimler listesi boş

**Gerçek Sonuç:**
- [ ] Başarılı
- [ ] Başarısız
- [ ] Notlar: _______________

---

### Test 7: Özel Bildirim Kapatma
**Amaç:** Sadece belirli bir bildirim tipinin kapatılabildiğini kontrol et

**Adımlar:**
1. Ayarlar → Bildirimler
2. "Günlük Hatırlatıcıları" switch'ini kapat
3. Diğer bildirimlerin açık kaldığını kontrol et
4. Günlük ekranına git ve tekrar kontrol et

**Beklenen Sonuç:**
- ✅ Sadece günlük hatırlatıcısı kapanır
- ✅ Diğer bildirimler çalışmaya devam eder
- ✅ Günlük ekranına girildiğinde hatırlatıcı kurulmaz

**Gerçek Sonuç:**
- [ ] Başarılı
- [ ] Başarısız
- [ ] Notlar: _______________

---

### Test 8: Bildirim Geldiğinde
**Amaç:** Bildirimin doğru zamanda ve içerikle geldiğini kontrol et

**Not:** Bu test için gerçek zamanda beklemeniz gerekir veya cihaz saatini değiştirin

**Adımlar:**
1. Günlük hatırlatıcısını aktif et
2. Cihaz saatini 19:59'a ayarla
3. 1 dakika bekle
4. Bildirim geldiğini kontrol et

**Beklenen Sonuç:**
- ✅ Saat 20:00'de bildirim gelir
- ✅ Başlık: "📝 Günlük Zamanı"
- ✅ Mesaj: "Bugün neler oldu? Özel anları kaydetmeyi unutmayın!"
- ✅ Ses çalar
- ✅ Titreşim olur

**Gerçek Sonuç:**
- [ ] Başarılı
- [ ] Başarısız
- [ ] Notlar: _______________

---

### Test 9: Bildirime Tıklama
**Amaç:** Bildirime tıklandığında uygulamanın açıldığını kontrol et

**Adımlar:**
1. Bir bildirim geldiğinde
2. Bildirime tıkla
3. Uygulamanın açıldığını kontrol et

**Beklenen Sonuç:**
- ✅ Uygulama açılır
- ✅ İlgili ekrana yönlendirilir (opsiyonel)

**Gerçek Sonuç:**
- [ ] Başarılı
- [ ] Başarısız
- [ ] Notlar: _______________

---

### Test 10: Çoklu Çocuk Senaryosu
**Amaç:** Birden fazla çocuk için bildirimlerin doğru çalıştığını kontrol et

**Adımlar:**
1. 2 çocuk ekle (Ali ve Zeynep)
2. Her ikisi için de büyüme ekranına git
3. Planlanmış bildirimleri kontrol et
4. Her çocuk için ayrı hatırlatıcı olduğunu doğrula

**Beklenen Sonuç:**
- ✅ Her çocuk için ayrı hatırlatıcı kurulur
- ✅ Bildirim mesajında doğru çocuk adı görünür
- ✅ Planlanmış bildirimler listesinde 2 adet görünür

**Gerçek Sonuç:**
- [ ] Başarılı
- [ ] Başarısız
- [ ] Notlar: _______________

---

## 🐛 Bilinen Sorunlar ve Çözümler

### Sorun 1: Bildirim İzni Alınamıyor
**Belirti:** İzin dialogu açılmıyor veya izin verilemiyor

**Olası Nedenler:**
- Emulator kullanılıyor (bildirimler sadece fiziksel cihazda çalışır)
- Cihaz ayarlarından bildirimler kapalı
- Expo Go uygulamasının bildirimleri kapalı

**Çözüm:**
1. Fiziksel cihaz kullan
2. Cihaz Ayarları → Bildirimler → Expo Go → İzin ver
3. Uygulamayı yeniden başlat

---

### Sorun 2: Hatırlatıcı Kurulmuyor
**Belirti:** Console'da hata mesajı görünüyor

**Olası Nedenler:**
- Bildirim izni verilmemiş
- Ayarlardan bildirimler kapalı
- Kod hatası

**Çözüm:**
1. Bildirim iznini kontrol et
2. Ayarlar → Bildirimler → İlgili bildirimi aç
3. Console loglarını kontrol et
4. Uygulamayı yeniden başlat

---

### Sorun 3: Bildirim Gelmiyor
**Belirti:** Planlanan zamanda bildirim gelmiyor

**Olası Nedenler:**
- Cihaz uyku modunda
- Pil tasarrufu modu aktif
- Bildirimler sistem tarafından engelleniyor

**Çözüm:**
1. Cihazı aktif tut
2. Pil tasarrufu modunu kapat
3. Cihaz Ayarları → Bildirimler → Expo Go → Tüm izinleri ver
4. Android: Arka plan kısıtlamalarını kaldır

---

### Sorun 4: Yanlış Zamanda Bildirim Geliyor
**Belirti:** Bildirim farklı saatte geliyor

**Olası Nedenler:**
- Saat dilimi farkı
- Cihaz saati yanlış
- Kod hatası

**Çözüm:**
1. Cihaz saatini kontrol et
2. Saat dilimini kontrol et
3. Trigger ayarlarını kontrol et

---

## 📊 Test Sonuçları Özeti

### Başarılı Testler
- [ ] Test 1: İlk Kurulum
- [ ] Test 2: Aşı Hatırlatıcısı
- [ ] Test 3: Günlük Hatırlatıcısı
- [ ] Test 4: Büyüme Hatırlatıcısı
- [ ] Test 5: Hamilelik Hatırlatıcısı
- [ ] Test 6: Bildirimleri Kapatma
- [ ] Test 7: Özel Bildirim Kapatma
- [ ] Test 8: Bildirim Geldiğinde
- [ ] Test 9: Bildirime Tıklama
- [ ] Test 10: Çoklu Çocuk

### Başarısız Testler
- [ ] Test ___: _______________
- [ ] Test ___: _______________

### Genel Notlar
```
Test Tarihi: _______________
Test Eden: _______________
Cihaz: _______________
OS Versiyonu: _______________
Expo Go Versiyonu: _______________

Genel Değerlendirme:
_______________________________________________
_______________________________________________
_______________________________________________
```

---

## 🎯 Hızlı Test Checklist

Hızlı test için bu listeyi kullanın:

- [ ] Uygulama açılıyor
- [ ] Bildirim izni isteniyor
- [ ] İzin veriliyor
- [ ] Aşı tamamlandığında mesaj görünüyor
- [ ] Günlük ekranına girildiğinde hata yok
- [ ] Büyüme ekranına girildiğinde hata yok
- [ ] Hamilelik ekranına girildiğinde hata yok
- [ ] Ayarlar → Bildirimler menüsü çalışıyor
- [ ] Bildirimleri kapatma çalışıyor
- [ ] Console'da kritik hata yok

---

**Hazırlayan:** Kiro AI
**Tarih:** 28 Kasım 2025
**Versiyon:** 1.0.0
