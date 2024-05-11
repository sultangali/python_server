import express from 'express'
import multer from 'multer'

import * as controller from '../controller/upload.controller.js'
import checkAuth from '../middleware/checkAuth.js'
import storageService from '../service/diskStorage.js'

const uploadRouter = express.Router()

const uploadStudentAvatar = multer({
    storage: storageService('students')
})
const uploadEmployeeAvatar = multer({
    storage: storageService('employees')
})
const uploadLessonImg = multer({
    storage: storageService('lessons')
})

const uploadChapterImg = multer({
    storage: storageService('chapters')
})

uploadRouter.post('/student-avatar', checkAuth, uploadStudentAvatar.single('image'), controller.uploadStudentAvatar)

uploadRouter.post('/employee-avatar', checkAuth, uploadEmployeeAvatar.single('image'), controller.uploadEmployeeAvatar)

uploadRouter.post('/lesson-img', checkAuth, uploadLessonImg.single('image'), controller.uploadLessonImg)

uploadRouter.post('/chapter-img', checkAuth, uploadChapterImg.single('image'), controller.uploadChapterImg)

export default uploadRouter