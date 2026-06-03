import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LessonStatus = "released" | "locked";
export type ModuleStatus = "released" | "locked";

export interface Lesson {
  id: string;
  moduleId: number;
  title: string;
  order: number;
  theory: string;
  exercises: string;
  homework: string;
  canvaUrl?: string;
  status: LessonStatus;
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
  lessons: Lesson[];
  classes: Class[];
  progress: StudentProgress[];
  addClass: (newClass: Class) => void;
  updateClass: (updatedClass: Class) => void;
  deleteClass: (id: string) => void;
  releaseModule: (id: number) => void;
  lockModule: (id: number) => void;
  releaseLesson: (id: string) => void;
  lockLesson: (id: string) => void;
  completeLesson: (studentId: string, lessonId: string, score: number) => void;
  addLesson: (lesson: Lesson) => void;
  updateLesson: (lesson: Lesson) => void;
  deleteLesson: (id: string) => void;
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
      lessons: [
        // INICIANTE (14 aulas)
        ...Array.from({ length: 14 }, (_, i) => ({
          id: `l1-${i + 1}`,
          moduleId: 1,
          title: i === 0 ? "Introdução" : i === 1 ? "Saudações e Apresentações" : i === 2 ? "Vocabulário Bíblico Básico" : `Aula ${i + 1}`,
          order: i + 1,
          theory: i === 0 ? "Seja bem-vindo ao curso ENGLISH FOR MINISTRY.\n\nNesta aula introdutória..." : `Conteúdo teórico da aula ${i + 1}...`,
          exercises: `Exercícios práticos da aula ${i + 1}...`,
          homework: `Dever de casa da aula ${i + 1}...`,
          canvaUrl: i === 0 ? "https://canva.link/ag3jyi13rb43top" : undefined,
          status: "released" as LessonStatus
        })),
        // BÁSICO (18 aulas)
        ...Array.from({ length: 18 }, (_, i) => ({
          id: `l2-${i + 1}`,
          moduleId: 2,
          title: i === 0 ? "Verbo To Be no Ministério" : `Aula ${i + 1}`,
          order: i + 1,
          theory: `Conteúdo teórico da aula ${i + 1}...`,
          exercises: `Exercícios práticos da aula ${i + 1}...`,
          homework: `Dever de casa da aula ${i + 1}...`,
          status: "released" as LessonStatus
        })),
        // INTERMEDIÁRIO (25 aulas)
        ...Array.from({ length: 25 }, (_, i) => ({
          id: `l3-${i + 1}`,
          moduleId: 3,
          title: `Aula ${i + 1}`,
          order: i + 1,
          theory: `Conteúdo teórico da aula ${i + 1}...`,
          exercises: `Exercícios práticos da aula ${i + 1}...`,
          homework: `Dever de casa da aula ${i + 1}...`,
          status: "locked" as LessonStatus
        })),
        // AVANÇADO (27 aulas)
        ...Array.from({ length: 27 }, (_, i) => ({
          id: `l4-${i + 1}`,
          moduleId: 4,
          title: `Aula ${i + 1}`,
          order: i + 1,
          theory: `Conteúdo teórico da aula ${i + 1}...`,
          exercises: `Exercícios práticos da aula ${i + 1}...`,
          homework: `Dever de casa da aula ${i + 1}...`,
          status: "locked" as LessonStatus
        })),
        // FLUENTE (Contínuo - simulando 50 inicialmente)
        ...Array.from({ length: 50 }, (_, i) => ({
          id: `l5-${i + 1}`,
          moduleId: 5,
          title: `Aula ${i + 1}`,
          order: i + 1,
          theory: `Conteúdo teórico da aula ${i + 1}...`,
          exercises: `Exercícios práticos da aula ${i + 1}...`,
          homework: `Dever de casa da aula ${i + 1}...`,
          status: "locked" as LessonStatus
        })),
      ],
      classes: [
        { id: "1", name: "Turma Alpha", moduleIds: [1, 2], studentIds: ["2"] },
      ],
      progress: [],
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
      completeLesson: (studentId, lessonId, score) => set((state) => {
        const existing = state.progress.find(p => p.studentId === studentId && p.lessonId === lessonId);
        if (existing) {
          return {
            progress: state.progress.map(p => 
              (p.studentId === studentId && p.lessonId === lessonId) 
                ? { ...p, completed: true, score: Math.max(p.score, score) } 
                : p
            )
          };
        }
        return {
          progress: [...state.progress, { studentId, lessonId, completed: true, score }]
        };
      }),
    }),
    {
      name: 'school-storage',
    }
  )
);
