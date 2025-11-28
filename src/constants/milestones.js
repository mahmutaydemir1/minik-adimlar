// Gelişim Kilometre Taşları - Yaş gruplarına göre

export const developmentalMilestones = {
  // 0-3 Ay
  '0-3': {
    title: '0-3 Ay',
    color: '#63B3ED',
    milestones: [
      { category: 'Fiziksel', text: 'Başını kaldırabilir', icon: '💪' },
      { category: 'Fiziksel', text: 'Ellerini ağzına götürür', icon: '👶' },
      { category: 'Sosyal', text: 'Gülümser', icon: '😊' },
      { category: 'Sosyal', text: 'Tanıdık seslere tepki verir', icon: '👂' },
      { category: 'Bilişsel', text: 'Hareketli nesneleri takip eder', icon: '👀' },
    ],
  },
  
  // 4-6 Ay
  '4-6': {
    title: '4-6 Ay',
    color: '#4ECDC4',
    milestones: [
      { category: 'Fiziksel', text: 'Desteksiz oturabilir', icon: '🪑' },
      { category: 'Fiziksel', text: 'Nesneleri kavrar', icon: '✋' },
      { category: 'Sosyal', text: 'Kendi adına tepki verir', icon: '👋' },
      { category: 'Dil', text: 'Mırıldanır (ba-ba, ma-ma)', icon: '🗣️' },
      { category: 'Bilişsel', text: 'Merak eder, keşfeder', icon: '🔍' },
    ],
  },
  
  // 7-12 Ay
  '7-12': {
    title: '7-12 Ay',
    color: '#F6AD55',
    milestones: [
      { category: 'Fiziksel', text: 'Emekler', icon: '🚼' },
      { category: 'Fiziksel', text: 'Tutunarak ayağa kalkar', icon: '🧍' },
      { category: 'Dil', text: 'Basit kelimeler söyler', icon: '💬' },
      { category: 'Sosyal', text: 'El sallayarak veda eder', icon: '👋' },
      { category: 'Bilişsel', text: 'Nesneleri gösterir', icon: '☝️' },
    ],
  },
  
  // 1-2 Yaş
  '12-24': {
    title: '1-2 Yaş',
    color: '#48BB78',
    milestones: [
      { category: 'Fiziksel', text: 'Yürür', icon: '🚶' },
      { category: 'Fiziksel', text: 'Merdiven çıkar', icon: '🪜' },
      { category: 'Dil', text: '2-3 kelimelik cümleler kurar', icon: '💭' },
      { category: 'Sosyal', text: 'Diğer çocuklarla ilgilenir', icon: '👶👶' },
      { category: 'Bilişsel', text: 'Basit talimatları anlar', icon: '✅' },
      { category: 'Özbakım', text: 'Kaşıkla yemek yer', icon: '🥄' },
    ],
  },
  
  // 2-3 Yaş
  '24-36': {
    title: '2-3 Yaş',
    color: '#9F7AEA',
    milestones: [
      { category: 'Fiziksel', text: 'Koşar, zıplar', icon: '🏃' },
      { category: 'Fiziksel', text: 'Top atar ve yakalar', icon: '⚽' },
      { category: 'Dil', text: 'Tam cümleler kurar', icon: '🗨️' },
      { category: 'Sosyal', text: 'Sırayla oynamayı öğrenir', icon: '🎮' },
      { category: 'Bilişsel', text: 'Renkleri ve şekilleri tanır', icon: '🎨' },
      { category: 'Özbakım', text: 'Tuvalet eğitimi başlar', icon: '🚽' },
    ],
  },
  
  // 3-4 Yaş
  '36-48': {
    title: '3-4 Yaş',
    color: '#FF6B9D',
    milestones: [
      { category: 'Fiziksel', text: 'Tek ayak üzerinde durur', icon: '🦵' },
      { category: 'Fiziksel', text: 'Bisiklete biner', icon: '🚲' },
      { category: 'Dil', text: 'Hikaye anlatır', icon: '📖' },
      { category: 'Sosyal', text: 'Arkadaşlarıyla oynar', icon: '👫' },
      { category: 'Bilişsel', text: 'Sayıları 10\'a kadar sayar', icon: '🔢' },
      { category: 'Özbakım', text: 'Kendi başına giyinir', icon: '👕' },
    ],
  },
  
  // 4-5 Yaş
  '48-60': {
    title: '4-5 Yaş',
    color: '#4299E1',
    milestones: [
      { category: 'Fiziksel', text: 'Zıplayarak ilerler', icon: '🦘' },
      { category: 'Dil', text: 'Akıcı konuşur', icon: '🎤' },
      { category: 'Sosyal', text: 'Kuralları anlar', icon: '📋' },
      { category: 'Bilişsel', text: 'Harfleri tanır', icon: '🔤' },
      { category: 'Yaratıcılık', text: 'Çizimler yapar', icon: '✏️' },
    ],
  },
  
  // 5-6 Yaş
  '60-72': {
    title: '5-6 Yaş',
    color: '#F56565',
    milestones: [
      { category: 'Fiziksel', text: 'İp atlar', icon: '🪢' },
      { category: 'Dil', text: 'Okumaya başlar', icon: '📚' },
      { category: 'Sosyal', text: 'Empati gösterir', icon: '❤️' },
      { category: 'Bilişsel', text: 'Basit matematik yapar', icon: '➕' },
      { category: 'Özbakım', text: 'Tamamen bağımsız', icon: '🌟' },
    ],
  },
};

// Hamilelik Haftalık Bilgiler
export const pregnancyWeeks = {
  1: {
    week: 1,
    trimester: 1,
    babySize: 'Haşhaş tohumu',
    babyLength: '0.1 mm',
    motherTips: [
      'Folik asit almaya başlayın',
      'Sağlıklı beslenmeye dikkat edin',
      'Alkol ve sigaradan uzak durun',
    ],
    babyDevelopment: 'Döllenme henüz gerçekleşmedi, vücut yumurtlama ve gebelik için hazırlanıyor.',
  },

  2: {
    week: 2,
    trimester: 1,
    babySize: 'Haşhaş tohumu',
    babyLength: '0.2 mm',
    motherTips: [
      'Bol su için',
      'Hafif yürüyüşler yapın',
      'Dengeli beslenmeye devam edin',
    ],
    babyDevelopment: 'Yumurtlama dönemi yaklaşır; gebelik çoğu zaman henüz başlamamış olabilir.',
  },

  3: {
    week: 3,
    trimester: 1,
    babySize: 'Haşhaş tohumu',
    babyLength: '0.5 mm',
    motherTips: [
      'İlaç kullanmadan önce doktorunuza danışın',
      'Stresten uzak durmaya çalışın',
    ],
    babyDevelopment:
      'Döllenme genellikle bu hafta gerçekleşir; döllenen yumurta rahme doğru yol alır.',
  },

  4: {
    week: 4,
    trimester: 1,
    babySize: 'Haşhaş tohumu',
    babyLength: '2 mm',
    motherTips: [
      'İlk hamilelik testini yapabilirsiniz',
      'Folik asit alımına devam edin',
      'Doktorunuzdan ilk randevunuzu alın',
    ],
    babyDevelopment:
      'Embriyo rahim duvarına yerleşir. Gebelik testi bu haftalarda genellikle pozitif çıkar.',
  },

  5: {
    week: 5,
    trimester: 1,
    babySize: 'Susam tanesi',
    babyLength: '3–4 mm',
    motherTips: [
      'Bulantılar için küçük ve sık öğünler tercih edin',
      'Bol su içmeye özen gösterin',
    ],
    babyDevelopment:
      'Kalp, sinir sistemi ve temel organların ilk taslakları oluşmaya başlar.',
  },

  6: {
    week: 6,
    trimester: 1,
    babySize: 'Mercimek',
    babyLength: '5–6 mm',
    motherTips: [
      'Koku hassasiyetine neden olan ortamlardan uzak durun',
      'Yeterli uyku ve dinlenmeye zaman ayırın',
    ],
    babyDevelopment:
      'Kalp atışları ultrasonda görülebilir. Baş ve gövde ayrımı daha belirginleşir.',
  },

  7: {
    week: 7,
    trimester: 1,
    babySize: 'Yaban mersini',
    babyLength: '1 cm',
    motherTips: [
      'Bulantılar için çantanızda ufak atıştırmalıklar taşıyın',
      'Ağır kaldırmaktan kaçının',
    ],
    babyDevelopment: 'Yüz hatları gelişmeye başlar, kollar ve bacakların tomurcukları belirginleşir.',
  },

  8: {
    week: 8,
    trimester: 1,
    babySize: 'Ahududu',
    babyLength: '1.6–2 cm',
    motherTips: [
      'Sık sık dinlenin',
      'Bol su ve hafif besinler tüketin',
    ],
    babyDevelopment:
      'Parmaklar ve ayak parmakları şekillenmeye başlar, kalp düzenli olarak atar.',
  },

  9: {
    week: 9,
    trimester: 1,
    babySize: 'Kiraz',
    babyLength: '2–2.5 cm',
    motherTips: [
      'Protein ağırlıklı beslenmeye özen gösterin',
      'Aşırı yorgunluk hissederseniz dinlenin',
    ],
    babyDevelopment:
      'Bebek minik hareketler yapar ancak henüz anne tarafından hissedilmeyebilir.',
  },

  10: {
    week: 10,
    trimester: 1,
    babySize: 'Çilek',
    babyLength: '3–4 cm',
    motherTips: [
      'Hafif yürüyüşler yapabilirsiniz',
      'Uyku düzenine dikkat edin',
    ],
    babyDevelopment:
      'Embriyo dönemi sona erer, artık “fetus” olarak adlandırılır. Organlar gelişmeye devam eder.',
  },

  11: {
    week: 11,
    trimester: 1,
    babySize: 'İncir',
    babyLength: '4–5 cm',
    motherTips: [
      'Duygusal değişimlerin normal olduğunu unutmayın',
      'Sizi rahatlatan küçük rutinler oluşturun',
    ],
    babyDevelopment:
      'Bebek büyümeye devam eder, baş gövdeye göre hâlâ büyük olsa da vücut orantıları yavaş yavaş oturur.',
  },

  12: {
    week: 12,
    trimester: 1,
    babySize: 'Limon',
    babyLength: '5–6 cm',
    motherTips: [
      'İlk trimester tarama testleri için doktorunuza danışın',
      'Enerji seviyeniz artabilir, hafif egzersizlere devam edin',
      'Dengeli ve düzenli beslenmeye özen gösterin',
    ],
    babyDevelopment:
      'Birçok temel organ oluşmuştur. Bebek hareket eder ancak her zaman hissedilmeyebilir. İlk trimester sona erer.',
  },

  13: {
    week: 13,
    trimester: 2,
    babySize: 'Erik',
    babyLength: '7–8 cm',
    motherTips: [
      'İkinci trimester genelde daha rahat geçer, keyfini çıkarın',
      'Hafif egzersiz programını doktorunuzla netleştirin',
    ],
    babyDevelopment:
      'İkinci trimester başlar. Enerjiniz artabilir, bebek hızla büyümeye devam eder.',
  },

  14: {
    week: 14,
    trimester: 2,
    babySize: 'Nektarin',
    babyLength: '8–9 cm',
    motherTips: [
      'Sağlıklı atıştırmalıklar tercih edin',
      'Yeterli kalsiyum aldığınızdan emin olun',
    ],
    babyDevelopment:
      'Yüz mimikleri gelişir, kaş ve saç kökleri oluşmaya başlar. Bebek parmağını emme hareketleri yapabilir.',
  },

  15: {
    week: 15,
    trimester: 2,
    babySize: 'Elma',
    babyLength: '9–10 cm',
    motherTips: [
      'Sırt ve bel ağrıları için duruşunuza dikkat edin',
      'Uzun süre aynı pozisyonda kalmamaya çalışın',
    ],
    babyDevelopment:
      'Kasları güçlenir, hareketleri artar. Bebek dış sesleri duymaya yavaş yavaş başlayabilir.',
  },

  16: {
    week: 16,
    trimester: 2,
    babySize: 'Avokado',
    babyLength: '10–12 cm',
    motherTips: [
      'Hareketleri hissettiğinizde tarihleri not edebilirsiniz',
      'Doktorunuzdan onay alarak hafif egzersizlere devam edin',
    ],
    babyDevelopment:
      'Bazı anneler bu haftalarda ilk bebeğin kıpırtılarını hissetmeye başlar. Bebek daha aktif hâle gelir.',
  },

  17: {
    week: 17,
    trimester: 2,
    babySize: 'Armut',
    babyLength: '12–13 cm',
    motherTips: [
      'Lifli gıdalar ve bol su tüketerek kabızlığı önlemeye çalışın',
      'Gün içinde kısa dinlenme molaları verin',
    ],
    babyDevelopment:
      'Yağ dokusu oluşmaya başlar, iç organlar daha düzenli çalışır. Bebeğin duyuları gelişmeye devam eder.',
  },

  18: {
    week: 18,
    trimester: 2,
    babySize: 'Tatlı patates',
    babyLength: '14 cm',
    motherTips: [
      'Sol yana yatmak kan akışını ve rahatlamayı artırabilir',
      'Uzun süre ayakta kalmaktan kaçının',
    ],
    babyDevelopment:
      'Bebek oldukça aktiftir; tekme, dönme gibi hareketler hissedilebilir. İşitme duyusu daha da gelişir.',
  },

  19: {
    week: 19,
    trimester: 2,
    babySize: 'Mango',
    babyLength: '15 cm',
    motherTips: [
      'Bol sebze ve meyve tüketin',
      'Rahat kıyafet ve ayakkabılar seçin',
    ],
    babyDevelopment:
      'Derisi hâlâ ince ve kırışık olsa da, sinir sistemi ve duyuları hızla gelişmektedir.',
  },

  20: {
    week: 20,
    trimester: 2,
    babySize: 'Muz',
    babyLength: '25 cm',
    motherTips: [
      'Ayrıntılı (anomali) ultrason için randevunuzu aksatmayın',
      'Bebek hareketlerini daha düzenli takip etmeye başlayın',
    ],
    babyDevelopment:
      'Gebeliğin ortasına geldiniz. Bebek hareketleri genellikle belirginleşmiştir, cinsiyet çoğu kez görüntülenebilir.',
  },

  21: {
    week: 21,
    trimester: 2,
    babySize: 'Havuç',
    babyLength: '26–27 cm',
    motherTips: [
      'Ayaklarda şişlik olursa dinlenmeye ve ayakları yukarı kaldırmaya çalışın',
      'Su tüketimini artırın',
    ],
    babyDevelopment:
      'Bebek yutma ve nefes alıp verme hareketlerini taklit eder, sindirim sistemi çalışmaya hazırlanır.',
  },

  22: {
    week: 22,
    trimester: 2,
    babySize: 'Portakal',
    babyLength: '27–28 cm',
    motherTips: [
      'Hafif egzersizlere devam edin',
      'Protein, demir ve kalsiyum alımına dikkat edin',
    ],
    babyDevelopment:
      'Bebek seslere tepki verebilir, annesinin sesini ayırt etmeye başlar. Uyku–uyanıklık döngüleri belirginleşir.',
  },

  23: {
    week: 23,
    trimester: 2,
    babySize: 'Greyfurt',
    babyLength: '28–29 cm',
    motherTips: [
      'Gece krampları için esneme hareketleri yapın',
      'Magnezyum veya benzeri takviyeler için doktora danışın',
    ],
    babyDevelopment:
      'Cilt altı yağ dokusu artar, cilt daha az saydam hâle gelir. Bebek daha güçlü hareketler yapar.',
  },

  24: {
    week: 24,
    trimester: 2,
    babySize: 'Mısır koçanı',
    babyLength: '30 cm',
    motherTips: [
      'Şeker yükleme testi bu haftalarda planlanabilir',
      'Sebze, meyve ve tam tahıllı besinleri artırın',
    ],
    babyDevelopment:
      'Bebek dış dünyadaki seslere ve dokunuşlara daha duyarlıdır. Akciğerler gelişimini sürdürür.',
  },

  25: {
    week: 25,
    trimester: 2,
    babySize: 'Kabak',
    babyLength: '31–32 cm',
    motherTips: [
      'Nefes darlığı yaşadığınızda dinlenmeyi ihmal etmeyin',
      'Uykuda destek yastıkları kullanmayı deneyin',
    ],
    babyDevelopment:
      'Kasları güçlenir, tekmeleri daha kuvvetli hissedilebilir. Bebek, el ve ayaklarını daha aktif kullanır.',
  },

  26: {
    week: 26,
    trimester: 2,
    babySize: 'Marul başı',
    babyLength: '32–33 cm',
    motherTips: [
      'Uyku düzeninizi destekleyecek rahatlatıcı rutinler oluşturun',
      'Gün içinde sık sık su için',
    ],
    babyDevelopment:
      'Göz kapakları açılıp kapanabilir, ışığa tepki verebilir. Derisi hâlâ ince ve kırışıktır.',
  },

  27: {
    week: 27,
    trimester: 2,
    babySize: 'Küçük kavun',
    babyLength: '33–34 cm',
    motherTips: [
      'Üçüncü trimester için kontrollerinizi planlayın',
      'Dinlenmeye ve ayaklarınızı yükseltmeye özen gösterin',
    ],
    babyDevelopment:
      'İkinci trimesterin sonuna gelinir. Bebek hızla kilo almaya hazırlanır, hareket alanı biraz daralmaya başlar.',
  },

  28: {
    week: 28,
    trimester: 3,
    babySize: 'Kavun',
    babyLength: '35–37 cm',
    motherTips: [
      'Bebek hareketlerini günlük olarak takip edin',
      'Uzun süre ayakta kalmamaya çalışın',
    ],
    babyDevelopment:
      'Üçüncü trimester başlar. Akciğer ve beyin gelişimi yoğun biçimde devam eder.',
  },

  29: {
    week: 29,
    trimester: 3,
    babySize: 'Büyük kabak',
    babyLength: '37–38 cm',
    motherTips: [
      'Sırt ve bel ağrıları için doğru oturuş ve yatış pozisyonlarına dikkat edin',
      'Gevşeme ve nefes egzersizleri yapın',
    ],
    babyDevelopment:
      'Yağ dokusu artar, bebeğin vücudu daha yuvarlak görünmeye başlar. Hareketleri hâlâ oldukça güçlüdür.',
  },

  30: {
    week: 30,
    trimester: 3,
    babySize: 'Büyük lahana',
    babyLength: '38–39 cm',
    motherTips: [
      'Doğum çantanızı yavaş yavaş hazırlamaya başlayın',
      'Nefes egzersizleri ile doğuma hazırlanabilirsiniz',
    ],
    babyDevelopment:
      'Beyin kıvrımları gelişir, sinir sistemi olgunlaşmaya devam eder. Bebek doğuma kadar kilo almayı sürdürecektir.',
  },

  31: {
    week: 31,
    trimester: 3,
    babySize: 'Hindistan cevizi',
    babyLength: '40–41 cm',
    motherTips: [
      'Dinlenme aralarını sıklaştırın',
      'Yan yatış (özellikle sol yan) pozisyonunu tercih edin',
    ],
    babyDevelopment:
      'El ve ayak tırnakları belirginleşir. Hareket alanı daralmasına rağmen tekmeleri kuvvetli hissedilebilir.',
  },

  32: {
    week: 32,
    trimester: 3,
    babySize: 'Karnabahar',
    babyLength: '41–43 cm',
    motherTips: [
      'Kısa yürüyüşler kan dolaşımını destekler',
      'Doğum belirtileri hakkında doktorunuzla konuşun',
    ],
    babyDevelopment:
      'Bebeğin cildi daha pürüzsüz hâle gelir, yağ dokusu artar. Hareketleri belirgin ancak alanı dardır.',
  },

  33: {
    week: 33,
    trimester: 3,
    babySize: 'Ananas',
    babyLength: '43–44 cm',
    motherTips: [
      'Bacak krampları artabilir, esneme hareketleri yapın',
      'Yeterli su tükettiğinizden emin olun',
    ],
    babyDevelopment:
      'Kas ve kemik sistemi güçlenir. Bebeğin vücudu doğuma hazırlanmaya devam eder.',
  },

  34: {
    week: 34,
    trimester: 3,
    babySize: 'Kavun',
    babyLength: '45 cm',
    motherTips: [
      'Doğum planınızı, tercihlerinizi ve sorularınızı doktorunuzla netleştirin',
      'Gevşeme tekniklerini düzenli olarak uygulamaya başlayın',
    ],
    babyDevelopment:
      'Akciğerler neredeyse olgunlaşmıştır, bebek doğsa bile çoğu zaman iyi durumdadır; ancak gelişim sürer.',
  },

  35: {
    week: 35,
    trimester: 3,
    babySize: 'Kavun',
    babyLength: '46 cm',
    motherTips: [
      'Doğum çantanızı ve gerekli evrakları hazırlamış olun',
      'Bol dinlenmeye ve rahat pozisyonlar bulmaya çalışın',
    ],
    babyDevelopment:
      'Bebek kilo almaya devam eder, cilt altı yağ dokusu artar. Hareketleri biraz daha sınırlı hissedilebilir.',
  },

  36: {
    week: 36,
    trimester: 3,
    babySize: 'Kavun',
    babyLength: '47 cm',
    motherTips: [
      'Haftalık kontroller başlayabilir, randevularınızı ihmal etmeyin',
      'Nefes egzersizleri ve gevşeme teknikleri uygulayın',
    ],
    babyDevelopment:
      'Bebek çoğunlukla doğum pozisyonuna (baş aşağı) geçmiştir. Akciğerler büyük ölçüde olgunlaşmıştır.',
  },

  37: {
    week: 37,
    trimester: 3,
    babySize: 'Karpuz (küçük)',
    babyLength: '48 cm',
    motherTips: [
      'Doğum belirtilerini (düzenli kasılma, su gelmesi vb.) takip edin',
      'Hazırladığınız doğum planını yanınızda bulundurun',
    ],
    babyDevelopment:
      'Bebek artık “miadına yakın” kabul edilir. Her an doğum olabilir, kilo almaya devam eder.',
  },

  38: {
    week: 38,
    trimester: 3,
    babySize: 'Karpuz',
    babyLength: '49 cm',
    motherTips: [
      'Kasılmaların düzenini ve şiddetini takip edin',
      'Mümkün olduğunca sakin ve dinlenmiş kalmaya çalışın',
    ],
    babyDevelopment:
      'Bebek tamamen gelişmiştir. Yağ depolamaya devam eder, dış dünyaya uyum için hazırlık yapar.',
  },

  39: {
    week: 39,
    trimester: 3,
    babySize: 'Karpuz',
    babyLength: '50 cm',
    motherTips: [
      'Hastaneye ne zaman gideceğinizi doktorunuzla netleştirin',
      'Son hazırlıklarınızı tamamlayın',
    ],
    babyDevelopment:
      'Bebek doğum için hazırdır; kilo artışı yavaşlayabilir ancak organlar görevine hazır durumdadır.',
  },

  40: {
    week: 40,
    trimester: 3,
    babySize: 'Karpuz',
    babyLength: '51 cm',
    motherTips: [
      'Her an doğum başlayabilir, düzenli kasılmaları takip edin',
      'Sakin kalmaya çalışın ve destek alacağınız kişileri yanınızda bulundurun',
    ],
    babyDevelopment:
      'Bebek tamamen gelişmiş ve doğmaya hazırdır. Bazı gebelikler 40. haftayı birkaç gün/hafta geçebilir.',
  },
};

