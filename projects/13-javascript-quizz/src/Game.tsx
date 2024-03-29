import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import { type Question as QuestionType } from './types'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

// funcion que se crea 1 vez ya que no se ejecuta
// cada vez que se actualiza el Virtual-DOM
const getBackgroundColor = (info:QuestionType, index:number) => {
  const { userSelectedAnswer, correctAnswer } = info
  // el usuario no ha seleccionado nada todavia
  if (userSelectedAnswer == null) return 'transparent'
  // si la solcion es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  // si es la solucion correcta
  if (index === correctAnswer) return 'green'
  // si esta es la seleccion del usuario pero no es correcta
  if (index === userSelectedAnswer) return 'red'
  // si no es N/A
  return 'transparent'
}

const Question = ({ info }:{ info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex:number) => () => {
    selectAnswer(info.id, answerIndex)
  }
  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={monokai}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>

  )
}

export function Game () {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)

  // navcegacion de paginas
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion)

  console.log(questions)

  const questionInfo = questions[currentQuestion]
  // :x:  ❌ ✅
  return (
    <>
      <Stack direction='row' gap='2' alignItems='center' justifyContent='center'>
        <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
