import express from 'express'
import * as controller from '../controller/index.js'
import * as validation from '../service/validation.js'
import validationHandler from '../service/validationHandler.js'
import checkAuth from '../middleware/checkAuth.js'
const studyRouter = express.Router()

studyRouter.post('/subject', validation.subject, validationHandler, controller.subject.create)
studyRouter.post('/exam', validation.exam, validationHandler, controller.exam.create)
studyRouter.post('/classroom', checkAuth, controller.classroom.create)
studyRouter.delete('/classroom/:id', checkAuth, controller.classroom.remove)
studyRouter.get('/classroom/all', checkAuth, controller.classroom.all)
studyRouter.post('/send-message', checkAuth, controller.question.sendQuestion)
studyRouter.get('/all-questions',checkAuth, controller.question.getAllQuestions)
studyRouter.patch('/answer-for-question', checkAuth, controller.question.answerForQuestion)

studyRouter.get('/all-subjects', checkAuth, controller.subject.all)

studyRouter.post('/create-chapter', checkAuth, controller.lesson.createChapter)
studyRouter.get('/all-chapters', checkAuth, controller.lesson.allChapters)

studyRouter.post('/create-lesson', checkAuth, controller.lesson.createLesson )
studyRouter.get('/all-lessons', checkAuth, controller.lesson.allLessons)

studyRouter.post('/create-test-question', checkAuth, controller.quiz.create)
studyRouter.get('/all-test-questions', checkAuth, controller.quiz.all)

studyRouter.post('/create-exam-question', checkAuth, controller.exam.create)
studyRouter.get('/all-exam-questions', checkAuth, controller.exam.all)

studyRouter.post('/quiz-answer', checkAuth, controller.act.quizAnswer)
studyRouter.get('/all-quiz-answers', checkAuth, controller.act.allQuizAnswers)

studyRouter.post('/exam-answer', checkAuth, controller.act.examAnswer)
studyRouter.get('/all-exam-answers', checkAuth, controller.act.allExamAnswers)

studyRouter.patch('/exam-answer-grade', checkAuth, controller.act.checkExamAnswer)

export default studyRouter