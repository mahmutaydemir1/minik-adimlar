// Cinsiyet için sabitler
export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
};

// Pregnancy model
// {
//   id: string,
//   userId: string,
//   lmpDate?: string,   // Last menstrual period (ISO)
//   dueDate?: string,
//   createdAt: string,
//   childId?: string,
// }

// Child model
// {
//   id: string,
//   userId: string,
//   name: string,
//   birthDate: string,  // ISO
//   gender?: 'male' | 'female' | 'other',
//   photoUri?: string,
//   pregnancyId?: string,
//   createdAt: string,
// }

// GrowthRecord model
// {
//   id: string,
//   childId: string,
//   date: string,
//   weightKg?: number,
//   heightCm?: number,
//   headCircumferenceCm?: number,
//   note?: string,
// }

// ChildJournalEntry model
// {
//   id: string,
//   childId: string,
//   date: string,
//   mood?: number,
//   sleepHours?: number,
//   note?: string,
//   tags?: string[],
// }
