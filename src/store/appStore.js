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
      vaccineRecords: [], // { childId, vaccineId, completedDate }
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

      updateChild: (childId, payload) => {
        set((state) => ({
          children: state.children.map((child) =>
            child.id === childId ? { ...child, ...payload } : child
          ),
        }));
      },

      deleteChild: (childId) => {
        set((state) => {
          const newChildren = state.children.filter((child) => child.id !== childId);
          const newSelectedId = state.selectedChildId === childId 
            ? (newChildren.length > 0 ? newChildren[0].id : undefined)
            : state.selectedChildId;
          
          return {
            children: newChildren,
            selectedChildId: newSelectedId,
            growthRecords: state.growthRecords.filter((r) => r.childId !== childId),
            journalEntries: state.journalEntries.filter((e) => e.childId !== childId),
            vaccineRecords: state.vaccineRecords.filter((r) => r.childId !== childId),
          };
        });
      },

      selectChild: (childId) => set({ selectedChildId: childId }),

      updatePregnancy: (pregnancyId, payload) => {
        set((state) => ({
          pregnancies: state.pregnancies.map((pregnancy) =>
            pregnancy.id === pregnancyId ? { ...pregnancy, ...payload } : pregnancy
          ),
        }));
      },

      deletePregnancy: (pregnancyId) => {
        set((state) => ({
          pregnancies: state.pregnancies.filter((p) => p.id !== pregnancyId),
        }));
      },

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

      updateGrowthRecord: (recordId, payload) => {
        set((state) => ({
          growthRecords: state.growthRecords.map((record) =>
            record.id === recordId ? { ...record, ...payload } : record
          ),
        }));
      },

      deleteGrowthRecord: (recordId) => {
        set((state) => ({
          growthRecords: state.growthRecords.filter((record) => record.id !== recordId),
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

      updateJournalEntry: (entryId, payload) => {
        set((state) => ({
          journalEntries: state.journalEntries.map((entry) =>
            entry.id === entryId ? { ...entry, ...payload } : entry
          ),
        }));
      },

      deleteJournalEntry: (entryId) => {
        set((state) => ({
          journalEntries: state.journalEntries.filter((entry) => entry.id !== entryId),
        }));
      },

      toggleVaccine: (childId, vaccineId) => {
        set((state) => {
          const existing = state.vaccineRecords.find(
            (r) => r.childId === childId && r.vaccineId === vaccineId
          );
          
          if (existing) {
            // Aşı tamamlanmışsa, kaldır
            return {
              vaccineRecords: state.vaccineRecords.filter(
                (r) => !(r.childId === childId && r.vaccineId === vaccineId)
              ),
            };
          } else {
            // Aşı tamamlanmamışsa, ekle
            const newRecord = {
              id: generateId('vaccine'),
              childId,
              vaccineId,
              completedDate: new Date().toISOString(),
            };
            return {
              vaccineRecords: [...state.vaccineRecords, newRecord],
            };
          }
        });
      },
    }),
    {
      name: 'minik-adimlar-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAppStore;
