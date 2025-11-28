import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const generateId = (prefix) => `${prefix}-${Date.now()}`;

const useAppStore = create(
  persist(
    (set, get) => ({
      pregnancies: [],
      children: [],
      growthRecords: [],
      journalEntries: [],
      selectedChildId: undefined,

      addPregnancy: (payload) => {
        const newPregnancy = {
          ...payload,
          id: generateId('pregnancy'),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ pregnancies: [...state.pregnancies, newPregnancy] }));
      },

      addChild: (payload) => {
        const newChild = {
          ...payload,
          id: generateId('child'),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          children: [...state.children, newChild],
          selectedChildId: newChild.id,
        }));
      },

      selectChild: (childId) => set({ selectedChildId: childId }),

      addGrowthRecord: (payload) => {
        const newRecord = {
          ...payload,
          id: generateId('growth'),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          growthRecords: [newRecord, ...state.growthRecords].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          ),
        }));
      },

      addJournalEntry: (payload) => {
        const newEntry = {
          ...payload,
          id: generateId('journal'),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          journalEntries: [newEntry, ...state.journalEntries].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          ),
        }));
      },
    }),
    {
      name: 'minik-adimlar-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAppStore;
