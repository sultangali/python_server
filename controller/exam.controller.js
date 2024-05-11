import Employee from "../model/Employee.js"
import Exam from "../model/Exam.js"

export const create =  async (req, res) => {
    try {
        const { question, class_id, chapter_id, lesson_id } = req.body
        const userId = req.userId

        const teacher = await Employee.findById(userId)

        const document = new Exam({
            question,
            classroom: class_id,
            teacher: userId,
            subject: teacher.subject._id,
            chapter: chapter_id,
            lesson: lesson_id
        })

        const exam = await document.save()

        res.status(200).json(exam)

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const all = async (req, res) => {
    try {
        const exam = await Exam.find()
        res.status(200).json(exam)
    } catch (error) {
        res.status(500).json(error.message)
    }
}