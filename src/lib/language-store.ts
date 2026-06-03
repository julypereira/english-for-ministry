import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'pt' | 'en';

interface LanguageState {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: 'pt',
      setLang: (lang) => set({ lang }),
      toggleLang: () => set((state) => ({ lang: state.lang === 'pt' ? 'en' : 'pt' })),
    }),
    {
      name: 'language-storage',
    }
  )
);
