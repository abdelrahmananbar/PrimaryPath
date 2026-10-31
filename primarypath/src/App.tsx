import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { stopSpeaking } from './state'
import Login from './Login'
import { MapPage, MyExams, NewExamPaper } from './student/Home'
import { CheckPaper, PickPaper, Sent } from './student/Upload'
import { Mailbox, Result } from './student/Result'
import { Beaten, Cave, Riddle } from './student/Practice'
import PizzaScale from './student/PizzaScale'
import { Album, Trail } from './student/Progress'
import { Alerts, Exams, Home, Insights, LinaMessage, LinaProfile, Published, Roster, YoussefAlert } from './teacher/Pages'
import NewExam from './teacher/NewExam'
import Grading, { GuardianPractice } from './teacher/Grading'
import { Counsellor, Parent } from './teacher/OtherRoles'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    stopSpeaking()
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/s/map" element={<MapPage />} />
      <Route path="/s/exams" element={<MyExams />} />
      <Route path="/s/new-exam" element={<NewExamPaper />} />
      <Route path="/s/upload" element={<PickPaper />} />
      <Route path="/s/check" element={<CheckPaper />} />
      <Route path="/s/sent" element={<Sent />} />
      <Route path="/s/result" element={<Result />} />
      <Route path="/s/mail" element={<Mailbox />} />
      <Route path="/s/cave" element={<Cave />} />
      <Route path="/s/riddle" element={<Riddle />} />
      <Route path="/s/beaten" element={<Beaten />} />
      <Route path="/s/pizza" element={<PizzaScale />} />
      <Route path="/s/progress" element={<Trail />} />
      <Route path="/s/stickers" element={<Album />} />
      <Route path="/t" element={<Home />} />
      <Route path="/t/exams" element={<Exams />} />
      <Route path="/t/new/:step" element={<NewExam />} />
      <Route path="/t/grade/:step" element={<Grading />} />
      <Route path="/t/guardian" element={<GuardianPractice />} />
      <Route path="/t/preview/pizza" element={<PizzaScale preview />} />
      <Route path="/t/published" element={<Published />} />
      <Route path="/t/classes" element={<Roster />} />
      <Route path="/t/classes/lina" element={<LinaProfile />} />
      <Route path="/t/classes/lina/message" element={<LinaMessage />} />
      <Route path="/t/insights" element={<Insights />} />
      <Route path="/t/alerts" element={<Alerts />} />
      <Route path="/t/alerts/youssef" element={<YoussefAlert />} />
      <Route path="/parent" element={<Parent />} />
      <Route path="/counsellor" element={<Counsellor />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
