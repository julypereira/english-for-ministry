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
  lastSlide?: number;
  totalSlides?: number;
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
  updateLessonProgress: (studentId: string, lessonId: string, currentSlide: number, totalSlides: number) => Promise<void>;
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
        ...Array.from({ length: 150 }, (_, i) => ({
          id: `lesson-${i + 1}`,
          moduleId: Math.floor(i / 30) + 1, // Distribui 30 aulas por módulo
          title: `Aula ${String(i + 1).padStart(3, '0')}`,
          order: (i % 30) + 1,
          theory: i === 0 ? `## The English Alphabet
        
O alfabeto inglês possui **26 letras**. É a base para a comunicação no ministério, essencial para soletrar nomes (spelling names), endereços e termos bíblicos.

### Pronúncia das Letras (A-Z)

Abaixo está a guia de pronúncia aproximada para brasileiros:

*   **A** /ei/
*   **B** /bi/
*   **C** /si/
*   **D** /di/
*   **E** /i/
*   **F** /éf/
*   **G** /dji/
*   **H** /eitch/
*   **I** /ai/
*   **J** /djei/
*   **K** /kei/
*   **L** /él/
*   **M** /ém/
*   **N** /én/
*   **O** /ou/
*   **P** /pi/
*   **Q** /kiu/
*   **R** /ar/
*   **S** /és/
*   **T** /ti/
*   **U** /iu/
*   **V** /vi/
*   **W** /dábliu/
*   **X** /éks/
*   **Y** /uai/
*   **Z** /zi/ (Americano) ou /zed/ (Britânico)

### Prática Ministerial: Spelling
No ministério, você frequentemente precisará soletrar:
1. **Your name:** "My name is John, that's J-O-H-N."
2. **Biblical terms:** "Can you spell 'Grace'?" "G-R-A-C-E."

### Video Lesson
Assista ao vídeo para praticar a sonoridade e o ritmo das letras.` : `Conteúdo da Aula ${String(i + 1).padStart(3, '0')}...`,
          exercises: i === 0 ? `### Exercise 1: Spelling Names
Soletre os seguintes nomes bíblicos em voz alta:
1. NOAH (N-O-A-H)
2. MARY (M-A-R-Y)
3. PETER (P-E-T-E-R)
4. RUTH (R-U-T-H)

### Exercise 2: Dictation
Ouça o professor soletrar 3 palavras e escreva-as:
1. _ _ _ _ _
2. _ _ _ _ _
3. _ _ _ _ _` : `Exercícios da Aula ${String(i + 1).padStart(3, '0')}...`,
          homework: i === 0 ? `### Homework: My Ministry Profile
1. Escreva seu nome completo e grave um áudio soletre-o.
2. Escolha seu versículo favorito e soletre a primeira palavra dele.
3. Pratique a pronúncia das vogais (A, E, I, O, U) que são as mais diferentes do português.` : `Dever de casa da Aula ${String(i + 1).padStart(3, '0')}...`,
          canvaUrl: i === 0 ? "https://canva.link/82k4vlu18tcaicv" : "",
          status: i < 5 ? "released" as LessonStatus : "locked" as LessonStatus
        }))
      ],
      classes: [
        { id: "1", name: "Turma Alpha", moduleIds: [1, 2, 3, 4, 5], studentIds: ["3"] },
      ],
      progress: [],
      addClass: (newClass) => set((state) => {
        try {
          return { classes: [...state.classes, newClass] };
        } catch (err) {
          console.error("Erro ao adicionar turma:", err);
          return state;
        }
      }),
      updateClass: (updatedClass) => set((state) => {
        try {
          return { 
            classes: state.classes.map((c) => (c.id === updatedClass.id ? updatedClass : c)) 
          };
        } catch (err) {
          console.error("Erro ao atualizar turma:", err);
          return state;
        }
      }),
      deleteClass: (id) => set((state) => {
        try {
          return { 
            classes: state.classes.filter((c) => c.id !== id) 
          };
        } catch (err) {
          console.error("Erro ao deletar turma:", err);
          return state;
        }
      }),
      releaseModule: (id) => set((state) => ({
        modules: state.modules.map(m => m.id === id ? { ...m, status: "released" } : m)
      })),
      lockModule: (id) => set((state) => ({
        modules: state.modules.map(m => m.id === id ? { ...m, status: "locked" } : m)
      })),
      releaseLesson: (id) => set((state) => ({
        lessons: state.lessons.map(l => l.id === id ? { ...l, status: "released" } : l)
      })),
      lockLesson: (id) => set((state) => ({
        lessons: state.lessons.map(l => l.id === id ? { ...l, status: "locked" } : l)
      })),
      completeLesson: (studentId, lessonId, score) => set((state) => {
        try {
          const existing = state.progress.find(p => p.studentId === studentId && p.lessonId === lessonId);
          if (existing) {
            return {
              progress: state.progress.map(p => 
                (p.studentId === studentId && p.lessonId === lessonId) 
                  ? { ...p, completed: true, score: 100 } 
                  : p
              )
            };
          }
          return {
            progress: [...state.progress, { studentId, lessonId, completed: true, score: 100 }]
          };
        } catch (err) {
          console.error("Erro ao completar aula:", err);
          return state;
        }
      }),
      updateLessonProgress: async (studentId, lessonId, currentSlide, totalSlides) => {
        try {
          set((state) => {
            const score = Math.round((currentSlide / totalSlides) * 100);
            const completed = currentSlide >= totalSlides;
            
            const existing = state.progress.find(p => p.studentId === studentId && p.lessonId === lessonId);
            if (existing) {
              return {
                progress: state.progress.map(p => 
                  (p.studentId === studentId && p.lessonId === lessonId) 
                    ? { 
                        ...p, 
                        completed: p.completed || completed, 
                        score: completed ? 100 : Math.max(p.score, score),
                        lastSlide: Math.max(p.lastSlide || 0, currentSlide),
                        totalSlides: totalSlides
                      } 
                    : p
                )
              };
            }
            return {
              progress: [...state.progress, { 
                studentId, 
                lessonId, 
                completed, 
                score: completed ? 100 : score, 
                lastSlide: currentSlide, 
                totalSlides 
              }]
            };
          });
        } catch (err) {
          const { handleError } = await import("./error-handler");
          handleError(err, { store: "SchoolStore", action: "updateLessonProgress" });
        }
      },
      addLesson: (lesson) => set((state) => {
        try {
          return { lessons: [...state.lessons, lesson] };
        } catch (err) {
          console.error("Erro ao adicionar aula:", err);
          return state;
        }
      }),
      updateLesson: (lesson) => set((state) => {
        try {
          return {
            lessons: state.lessons.map((l) => (l.id === lesson.id ? lesson : l))
          };
        } catch (err) {
          console.error("Erro ao atualizar aula:", err);
          return state;
        }
      }),
      deleteLesson: (id) => set((state) => {
        try {
          return {
            lessons: state.lessons.filter((l) => l.id !== id)
          };
        } catch (err) {
          console.error("Erro ao deletar aula:", err);
          return state;
        }
      }),
    }),
    {
      name: 'school-storage-v2',
    }
  )
);
