
import Question from "../model/Question.js";

export const sendQuestion = async (req, res) => {
    try {

        const userId = req.userId

        const {question, teacher} = req.body

        const document = new Question({
            question: question,
            student: userId,
            teacher: teacher
        })

        const send = await document.save()

        res.status(200).json(send)

    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const getAllQuestions = async (req, res) => {
    try {
        
        const questions = await Question.find()
            .populate('student')
            .populate('teacher')
            .exec()

        res.status(200).json(questions)

    } catch (error) {
        res.status(500).json(error.message)
    }
}


export const answerForQuestion = async (req, res) => {

    try {

        const { questionId, answer } = req.body

        await Question.updateOne({
            _id: questionId
        }, {
            answer: answer,
            status: 'closed'
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}