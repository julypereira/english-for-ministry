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
  updateLessonProgress: (studentId: string, lessonId: string, currentSlide: number, totalSlides: number) => void;
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
        {
          id: `l1-1`,
          moduleId: 1,
          title: "Aula 001 - Alfabeto",
          order: 1,
          theory: `## The English Alphabet
        
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
Assista ao vídeo para praticar a sonoridade e o ritmo das letras.`,
          exercises: `### Exercise 1: Spelling Names
Soletre os seguintes nomes bíblicos em voz alta:
1. NOAH (N-O-A-H)
2. MARY (M-A-R-Y)
3. PETER (P-E-T-E-R)
4. RUTH (R-U-T-H)

### Exercise 2: Dictation
Ouça o professor soletrar 3 palavras e escreva-as:
1. _ _ _ _ _
2. _ _ _ _ _
3. _ _ _ _ _`,
          homework: `### Homework: My Ministry Profile
1. Escreva seu nome completo e grave um áudio soletre-o.
2. Escolha seu versículo favorito e soletre a primeira palavra dele.
3. Pratique a pronúncia das vogais (A, E, I, O, U) que são as mais diferentes do português.`,
          canvaUrl: "https://www.youtube.com/watch?v=um3YrKRfsr0",
          status: "released" as LessonStatus
        },
        ...Array.from({ length: 13 }, (_, i) => ({
          id: `l1-${i + 2}`,
          moduleId: 1,
          title: i === 0 ? "Saudações e Apresentações" : i === 1 ? "Vocabulário Bíblico Básico" : `Aula ${i + 2}`,
          order: i + 2,
          theory: `Conteúdo teórico da aula ${i + 2}...`,
          exercises: `Exercícios práticos da aula ${i + 2}...`,
          homework: `Dever de casa da aula ${i + 2}...`,
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
        { id: "1", name: "Turma Alpha", moduleIds: [1, 2, 3, 4, 5], studentIds: ["2", "3"] },
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
                  ? { ...p, completed: true, score: Math.max(p.score, score) } 
                  : p
              )
            };
          }
          return {
            progress: [...state.progress, { studentId, lessonId, completed: true, score }]
          };
        } catch (err) {
          console.error("Erro ao completar aula:", err);
          return state;
        }
      }),
      updateLessonProgress: (studentId, lessonId, currentSlide, totalSlides) => set((state) => {
        try {
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
                      score: Math.max(p.score, score),
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
              score, 
              lastSlide: currentSlide, 
              totalSlides 
            }]
          };
        } catch (err) {
          console.error("Erro ao atualizar progresso da aula:", err);
          return state;
        }
      }),
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
      name: 'school-storage',
    }
  )
);
