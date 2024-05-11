import Student from "../model/Student.js"
import Employee from "../model/Employee.js"

export const uploadStudentAvatar = async (req, res) => {

    const url = `/upload/students/${req.file.originalname}`

    await Student.updateOne({
        _id: req.userId
    }, {
        avatar: url
    })
    res.json({
        url: url
    })
}

export const uploadEmployeeAvatar = async (req, res) => {

    const url = `/upload/employees/${req.file.originalname}`

    await Employee.updateOne({
        _id: req.userId
    }, {
        avatar: url
    })
    res.json({
        url: url
    })
}

export const uploadLessonImg = async (req, res) => {
    const url = `/upload/lessons/${req.file.originalname}`
    res.json({
        url: url
    })
}

export const uploadChapterImg = async (req, res) => {
    const url = `/upload/chapters/${req.file.originalname}`
    res.json({
        url: url
    })
}