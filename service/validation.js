import { body } from 'express-validator'

export const registration = [
    body('email').isEmail(),
    body('lastname').isString(),
    body('firstname').isString(),
    body('patronymic').isString(),
    body('phone').isLength({
        min: 11
    }).isString(),
    body('address').optional().isString(),
    body('role').optional().isString(),
    body('password').isString(),
]

export const login = [
    body('email').optional().isEmail(),
    body('phone').optional().isString(),
    body('password').isString()
]
 
export const updateProfile = [
    body('lastname').optional().isString(),
    body('firstname').optional().isString(),
    body('patronymic').optional().isString(),
        body('birthday').optional().isString(),
    body('phone').optional().isString(),
    body('address').optional().isString(),
    body('class').optional().isString(),
    body('abcd').optional().isString(),
    body('father_lname').optional().isString(),
    body('father_fname').optional().isString(),
    body('father_patron').optional().isString(),
    body('father_phone').optional().isString(),
    body('mother_lname').optional().isString(),
    body('mother_fname').optional().isString(),
    body('mother_patron').optional().isString(),
    body('mother_phone').optional().isString(),
]

export const exam = [
    body('title').isString(),
    body('img').optional().isString(),
]

export const subject = [
    body('name').isString(),
    body('img').optional().isString(),
]