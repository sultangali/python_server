import express from 'express'
import * as controller from '../controller/index.js'
import * as validation from '../service/validation.js'
import validationHandler from '../service/validationHandler.js'
import checkAuth from '../middleware/checkAuth.js'

const userRouter =  express.Router()

userRouter.post('/student/auth/registration', validation.registration, validationHandler, controller.student.registration)
userRouter.post('/student/auth/login', validation.login, validationHandler, controller.student.login)
userRouter.patch('/student/me/update', checkAuth, validation.updateProfile, validationHandler, controller.student.update )

userRouter.post('/student/me/attending', checkAuth, controller.act.attending )


userRouter.post('/employee/auth/registration', validation.registration, validationHandler, controller.employee.registration)
userRouter.post('/employee/auth/login', validation.login, validationHandler, controller.employee.login)
userRouter.patch('/employee/me/update', checkAuth, validation.updateProfile, validationHandler, controller.employee.update)

userRouter.get('/me', checkAuth, controller.student.me)
userRouter.get('/all-students', checkAuth, controller.student.all)
userRouter.get('/all-employees', checkAuth, controller.employee.all)
userRouter.patch('/student-status', checkAuth, controller.student.setStudentAccess)
userRouter.patch('/student-classroom', checkAuth, controller.student.setStudentClassroom)
userRouter.patch('/delete-student-classroom', checkAuth, controller.student.deleteStudentFromClassroom)

export default userRouter