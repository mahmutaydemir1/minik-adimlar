// Türkiye Aşı Takvimi (Sağlık Bakanlığı)

export const vaccineSchedule = [
  {
    id: 'bcg-birth',
    name: 'BCG (Verem)',
    ageMonths: 0,
    ageLabel: 'Doğumda',
    description: 'Tüberküloz (verem) hastalığına karşı koruma sağlar.',
    important: true,
  },
  {
    id: 'hepb-birth',
    name: 'Hepatit B (1. doz)',
    ageMonths: 0,
    ageLabel: 'Doğumda',
    description: 'Hepatit B virüsüne karşı koruma.',
    important: true,
  },
  {
    id: 'hepb-1',
    name: 'Hepatit B (2. doz)',
    ageMonths: 1,
    ageLabel: '1. Ay',
    description: 'Hepatit B aşısının ikinci dozu.',
  },
  {
    id: 'combo-2',
    name: 'KPA-DBT-İPA-Hib (1. doz)',
    ageMonths: 2,
    ageLabel: '2. Ay',
    description: 'Karma aşı: Boğmaca, difteri, tetanoz, çocuk felci, hemofilus influenza.',
    important: true,
  },
  {
    id: 'combo-4',
    name: 'KPA-DBT-İPA-Hib (2. doz)',
    ageMonths: 4,
    ageLabel: '4. Ay',
    description: 'Karma aşının ikinci dozu.',
    important: true,
  },
  {
    id: 'combo-6',
    name: 'KPA-DBT-İPA-Hib-HepB (3. doz)',
    ageMonths: 6,
    ageLabel: '6. Ay',
    description: 'Karma aşının üçüncü dozu + Hepatit B.',
    important: true,
  },
  {
    id: 'mmr-12',
    name: 'KKK (Kızamık-Kızamıkçık-Kabakulak)',
    ageMonths: 12,
    ageLabel: '12. Ay',
    description: 'Kızamık, kızamıkçık ve kabakulak hastalıklarına karşı koruma.',
    important: true,
  },
  {
    id: 'pneumo-12',
    name: 'KPA (Pnömokok) Rapel',
    ageMonths: 12,
    ageLabel: '12. Ay',
    description: 'Pnömokok bakterisine karşı rapel doz.',
  },
  {
    id: 'hepb-18',
    name: 'Hepatit B Rapel',
    ageMonths: 18,
    ageLabel: '18. Ay',
    description: 'Hepatit B aşısının rapel dozu.',
  },
  {
    id: 'combo-18',
    name: 'DBT-İPA-Hib Rapel',
    ageMonths: 18,
    ageLabel: '18. Ay',
    description: 'Karma aşının rapel dozu.',
  },
  {
    id: 'opv-18',
    name: 'OPA (Oral Çocuk Felci)',
    ageMonths: 18,
    ageLabel: '18. Ay',
    description: 'Çocuk felcine karşı ağızdan verilen aşı.',
  },
  {
    id: 'hepb-24',
    name: 'Hepatit A (1. doz)',
    ageMonths: 24,
    ageLabel: '2. Yaş',
    description: 'Hepatit A virüsüne karşı koruma.',
  },
  {
    id: 'mmr-48',
    name: 'KKK Rapel',
    ageMonths: 48,
    ageLabel: '4. Yaş',
    description: 'Kızamık, kızamıkçık ve kabakulak rapel dozu.',
  },
  {
    id: 'dbt-48',
    name: 'DBT-İPA Rapel',
    ageMonths: 48,
    ageLabel: '4. Yaş',
    description: 'Difteri, boğmaca, tetanoz ve çocuk felci rapel dozu.',
  },
  {
    id: 'opv-48',
    name: 'OPA Rapel',
    ageMonths: 48,
    ageLabel: '4. Yaş',
    description: 'Çocuk felci rapel dozu.',
  },
  {
    id: 'hepa-30',
    name: 'Hepatit A (2. doz)',
    ageMonths: 30,
    ageLabel: '2.5 Yaş',
    description: 'Hepatit A aşısının ikinci dozu.',
  },
];

// Aşı kategorileri
export const vaccineCategories = {
  mandatory: 'Zorunlu Aşılar',
  optional: 'Opsiyonel Aşılar',
  seasonal: 'Mevsimsel Aşılar',
};

// Opsiyonel aşılar
export const optionalVaccines = [
  {
    id: 'rotavirus',
    name: 'Rotavirüs',
    ageRange: '2-6 ay',
    description: 'Bebekler ve küçük çocuklarda ishal ve kusmaya neden olan virüse karşı koruma.',
  },
  {
    id: 'meningococcal',
    name: 'Meningokok',
    ageRange: '2 ay ve üzeri',
    description: 'Menenjit (beyin zarı iltihabı) hastalığına karşı koruma.',
  },
  {
    id: 'varicella',
    name: 'Suçiçeği',
    ageRange: '12 ay ve üzeri',
    description: 'Suçiçeği hastalığına karşı koruma.',
  },
  {
    id: 'flu',
    name: 'Grip (İnfluenza)',
    ageRange: '6 ay ve üzeri',
    description: 'Mevsimsel grip hastalığına karşı koruma. Her yıl tekrarlanmalı.',
    seasonal: true,
  },
];
