import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

interface State{
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit:number) => Promise<void>
  selectAnswer: (quesionId: number, answerIndex:number) => void
  goNextQuestion:()=>void
  goPrevQuestion:()=>void
  reset:()=>void
}

export const useQuestionsStore = create<State>()(persist((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async (limit:number) => {
    const res = await fetch('http://localhost:5173/data.json')
    const json = await res.json()

    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions })
  },
  selectAnswer: (quesionId: number, answerIndex:number) => {
    const { questions } = get() // <- get obtiene el objeto actual
    // structureClone <- clona un objeto de manera prfunda
    const newQuestions = structuredClone(questions)
    // obtenemos el indice de la pregunta
    const questionIndex = newQuestions.findIndex(q => q.id === quesionId)
    // obtenemos la informacion de la pregunta
    const questionInfo = newQuestions[questionIndex]
    // averiguamos si el usuario ha seleccionado la respuesta correcta
    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
    if (isCorrectUserAnswer) confetti()
    // cambiar esta informacion en la copia de la pregunta
    newQuestions[questionIndex] = { ...questionInfo, isCorrectUserAnswer, userSelectedAnswer: answerIndex }
    // actualizar el estado
    set({ questions: newQuestions })
  },
  goNextQuestion () {
    const { currentQuestion, questions } = get()
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion })
    }
  },
  goPrevQuestion () {
    const { currentQuestion } = get()
    const prevQuestion = currentQuestion - 1
    if (prevQuestion >= 0) {
      set({ currentQuestion: prevQuestion })
    }
  },
  reset () {
    set({ currentQuestion: 0, questions: [] })
  }
}), {
  name: 'questions'
}
))
