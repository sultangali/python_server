import mongoose from 'mongoose'
import Classroom from '../model/Classroom.js'
import Employee from '../model/Employee.js'

export const create = async (req, res) => {

    try {

        const userId = req.userId

        const {title, abcd} = req.body

        const document = new Classroom({
            name: title,
            abcd,
            teacher: userId
        })

        console.log(document)

        const classroom = await document.save()

        const employee = await Employee.findOne({
            _id: userId
        })

        employee.classrooms.push(classroom._id)

        await employee.save()


        res.status(200).json(employee)

    } catch (error) {
        res.status(500).json(error.message)
    }
} 

export const remove = (req, res) => {
    try {

        const {id} = req.params

        Classroom.findOneAndDelete(
            {
              _id: id,
            },
            (err, doc) => {
              if (err) {
                return res.status(500).json({
                  message: err.message,
                });
              }
      
              if (!doc) {
                return res.status(404).json({
                  message: "Сынып жүйеде жоқ",
                });
              }
              res.status(200).json({
                doc
              });
            }
          );

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const all = async (req, res) => {
    try {
        const classrooms = await Classroom.find().populate('teacher').populate('students').exec()
        res.status(200).json(classrooms)
    } catch (error) {
        res.status(500).json(error.message)
    }
}