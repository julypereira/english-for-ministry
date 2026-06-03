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
  lessons: Lesson[];
  classes: Class[];
  progress: StudentProgress[];
  addClass: (newClass: Class) => void;
  updateClass: (updatedClass: Class) => void;
  deleteClass: (id: string) => void;
  releaseModule: (id: number) => void;
  lockModule: (id: number) => void;
  completeLesson: (studentId: string, lessonId: string, score: number) => void;
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
        { id: "l1", moduleId: 1, title: "Introdução", order: 1, theory: "Seja bem-vindo ao curso ENGLISH FOR MINISTRY.\n\nNesta aula introdutória, vamos entender a importância do inglês no ministério cristão e como as ferramentas deste curso vão te ajudar a alcançar a fluência focada em seu propósito.", exercises: "1. Liste 3 objetivos que você deseja alcançar com o inglês no seu ministério.\n2. Traduza as palavras: Church, Bible, Ministry, Faith.", homework: "Assista a um vídeo curto de uma pregação em inglês e tente identificar 5 palavras conhecidas." },
        { id: "l2", moduleId: 1, title: "Saudações e Apresentações", order: 2, theory: "Greetings and Introductions:\n\n- Hello / Hi\n- Good morning / afternoon / evening\n- Nice to meet you\n- My name is...\n- I am a pastor / missionary / leader.", exercises: "Pratique apresentar-se como se estivesse em uma conferência internacional.\nEscreva um diálogo simples de saudação.", homework: "Grave um áudio de 30 segundos apresentando-se em inglês e envie para seu instrutor." },
        { id: "l3", moduleId: 1, title: "Vocabulário Bíblico Básico", order: 3, theory: "Nomes de livros da bíblia e termos fundamentais:\n\n- Genesis, Exodus, Psalms, Gospel, Epistle.\n- God, Jesus Christ, Holy Spirit, Grace, Salvation.", exercises: "Encontre 5 versículos conhecidos e tente ler em inglês.\nAssocie os termos bíblicos em português e inglês.", homework: "Leia o Salmo 23 em inglês (versão KJV ou NIV)." },
        { id: "l4", moduleId: 2, title: "Verbo To Be no Ministério", order: 1, theory: "O Verbo To Be (ser/estar) é a base de tudo.\n\n- I am a servant of God.\n- We are the church.\n- He is our Savior.", exercises: "Complete as sentenças com am, is ou are.\nCrie 5 frases declarando verdades bíblicas usando o Verbo To Be.", homework: "Escreva um pequeno parágrafo sobre quem você é em Cristo usando o Verbo To Be." },
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
