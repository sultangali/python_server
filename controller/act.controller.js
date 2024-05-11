import Student from "../model/Student.js"
import Subject from '../model/Subject.js'
import Lesson from '../model/Lesson.js'
import QuizAnswer from "../model/QuizAnswer.js"
import Quiz from "../model/Quiz.js"
import Exam from "../model/Exam.js"
import ExamAnswer from "../model/ExamAnswer.js"

export const attending = async (req, res) => {

    try {

        const {subject_id, lesson_id} = req.body

        const userId = req.userId
        
        const student = await Student.findById(userId)

        const subject = await Subject.findById(subject_id)

        const lesson = await Lesson.findById(lesson_id)
        
        student.subjects.python.attending.push(lesson)

        // switch(subject.python.name) {
        //     case 'Алгоритмдер, деректер құрылымы және программалау': 
        //         student.subjects.python.attending.push(lesson)
        //         break
        // }


        await student.save()
        res.status(200).json({success: true})
        

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const quizAnswer = async (req, res) => {
 
    try {

        const {subject_id, quiz_id, answer} = req.body

        const userId = req.userId

        const subject = await Subject.findById(subject_id).populate('chapters').exec()

        const quiz = await Quiz.findById(quiz_id).populate('chapter').populate('lesson').exec()

        const student = await Student.findById(userId)

        const document = new QuizAnswer({
            subject: subject._id,
            quiz: quiz._id,
            answer: answer,
            correct: quiz.correct == answer ? 1 : 0,
            student: student
        })

        const currentAnswer = await document.save()

        res.status(200).json({success: true, current: currentAnswer})
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const allQuizAnswers = async (req, res) => {

    try {

        const allAnswers = await QuizAnswer.find().populate('student').populate('subject').exec()

        res.status(200).json(allAnswers)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const examAnswer = async (req,res) => {
    try {
        const {subject_id, exam_id, answer} = req.body

        const userId = req.userId

        const subject = await Subject.findById(subject_id)

        const exam = await Exam.findById(exam_id)

        const document = new ExamAnswer({
            subject: subject._id,
            exam: exam._id,
            answer: answer,
            student: userId
        })

        const examAnswer = await document.save()

        res.status(200).json({success: true, current: examAnswer})

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const allExamAnswers = async (req, res) => {

    try {
        const userId = req.userId

        const sortedAnswers = []

        const answers = await ExamAnswer.find().populate('student').populate('exam').populate('subject').exec()

        res.status(200).json(
            answers
        )

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const checkExamAnswer = async (req, res) => {

    try {
        
        const { exam_answer_id, grade } = req.body

        await ExamAnswer.updateOne({
            _id: exam_answer_id
        }, {
            grade: grade
        })

        res.status(200).json({
            success: true
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}