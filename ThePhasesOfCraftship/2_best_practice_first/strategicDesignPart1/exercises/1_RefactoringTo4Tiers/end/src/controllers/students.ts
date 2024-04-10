import express from 'express';

import {  parseForResponse } from '../shared/utils';
import Errors from '../shared/constants';
import { CreateStudentDTO, StudentID } from '../dtos/students';
import StudentService from '../services/students';
import { errorHandler } from '../shared/errors';

const router = express.Router();


// POST student created
router.post('/', async (req, res, next) => {
    try {
        const dto = CreateStudentDTO.fromRequest(req.body);
        const data = await StudentService.createStudent(dto);
        res.status(201).json({ error: undefined, data: parseForResponse(data), success: true });
    } catch (error) {
        next(error)
    }
});

// GET all students
router.get('/', async (req, res, next) => {
    try {
        const data = await StudentService.getAllStudents();
        res.status(200).json({ error: undefined, data: data, success: true });
    } catch (error) {
        next(error)
    }
});

// GET a student by id
router.get('/:id', async (req, res, next) => {
    try {
        const dto = StudentID.fromRequest(req.params);
        const data = await StudentService.getStudent(dto);
    
        if (!data) {
            return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
        }
        res.status(200).json({ error: undefined, data: parseForResponse(data), success: true });
    } catch (error) {
        next(error)
    }
});

// GET all student submitted assignments
router.get('/:id/assignments', async (req, res, next) => {
    try {
        const dto = StudentID.fromRequest(req.params);

        const data = await StudentService.getAssignments(dto);

        res.status(200).json({ error: undefined, data: parseForResponse(data), success: true });
    } catch (error) {
        next(error)
    }
});


// GET all student grades
router.get('/:id/grades', async (req, res, next) => {
    try {
        const dto = StudentID.fromRequest(req.params);

        const data = await StudentService.getGrades(dto);
    
        res.status(200).json({ error: undefined, data: parseForResponse(data), success: true });
    } catch (error) {
        next(error)
    }
})

router.use(errorHandler)

export default router;