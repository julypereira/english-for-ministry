import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ModuleStatus = "released" | "locked";

export interface Lesson {
  id: string;
  moduleId: number;
  title: string;
  order: number;
  theory: string;
  exercises: string;
  homework: string;
}

export interface StudentProgress {
  studentId: string;
  lessonId: string;
  completed: boolean;
  score: number; // 0-100
}

export interface Module {
  id: number;
  title: string;
  status: ModuleStatus;
}

export interface Class {
  id: string;
  name: string;
  moduleIds: number[];
  studentIds: string[];
}

interface SchoolStore {
  modules: Module[];
  classes: Class[];
  addClass: (newClass: Class) => void;
  updateClass: (updatedClass: Class) => void;
  deleteClass: (id: string) => void;
  releaseModule: (id: number) => void;
  lockModule: (id: number) => void;
}

export const useSchoolStore = create<SchoolStore>()(
  persist(
    (set) => ({
      modules: [
        { id: 1, title: "INICIANTE", status: "released" },
        { id: 2, title: "BÁSICO", status: "released" },
        { id: 3, title: "INTERMEDIÁRIO", status: "locked" },
        { id: 4, title: "AVANÇADO", status: "locked" },
        { id: 5, title: "FLUENTE", status: "locked" },
      ],
      classes: [
        { id: "1", name: "Turma Alpha", moduleIds: [1, 2], studentIds: ["2"] },
      ],
      addClass: (newClass) => set((state) => ({ classes: [...state.classes, newClass] })),
      updateClass: (updatedClass) => set((state) => ({ 
        classes: state.classes.map((c) => (c.id === updatedClass.id ? updatedClass : c)) 
      })),
      deleteClass: (id) => set((state) => ({ 
        classes: state.classes.filter((c) => c.id !== id) 
      })),
      releaseModule: (id) => set((state) => ({
        modules: state.modules.map(m => m.id === id ? { ...m, status: "released" } : m)
      })),
      lockModule: (id) => set((state) => ({
        modules: state.modules.map(m => m.id === id ? { ...m, status: "locked" } : m)
      })),
    }),
    {
      name: 'school-storage',
    }
  )
);
