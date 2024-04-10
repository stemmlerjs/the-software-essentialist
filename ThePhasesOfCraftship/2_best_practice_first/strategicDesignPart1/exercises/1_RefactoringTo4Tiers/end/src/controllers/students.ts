import express from 'express';

import { prisma } from '../database';
import { isMissingKeys, isUUID, parseForResponse } from '../shared/utils';
import Errors from '../shared/constants';
import { CreateStudentDTO, GetStudentDTO } from '../dtos/students';
import { InvalidRequestBodyError } from '../shared/exceptions';
import student from '../services/students';
import { errorHandler } from '../shared/errors';

const router = express.Router();

// POST student created
router.post('/', async (req, res, next) => {
    try {
        const dto = CreateStudentDTO.fromRequest(req.body);
        const data = await student.createStudent(dto);
        res.status(201).json({ error: undefined, data: parseForResponse(data), success: true });
    } catch (error) {
        next(error)
    }
});

// GET all students
router.get('/', async (req, res, next) => {
    try {
        const data = await student.getAllStudents();
        res.status(200).json({ error: undefined, data: data, success: true });
    } catch (error) {
        next(error)
    }
});

// GET a student by id
router.get('/:id', async (req, res, next) => {
    try {
        const dto = GetStudentDTO.fromRequest(req.params);
        const data = await student.getStudent(dto);
    
        if (!data) {
            return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
        }
        res.status(200).json({ error: undefined, data: parseForResponse(data), success: true });
    } catch (error) {
        next(error)
    }
});

// GET all student submitted assignments
router.get('/:id/assignments', async (req, res) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id
            }
        });

        if (!student) {
            return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
        }

        const studentAssignments = await prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted'
            },
            include: {
                assignment: true
            },
        });
    
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
});


// GET all student grades
router.get('/:id/grades', async (req, res) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id
            }
        });

        if (!student) {
            return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
        }

        const studentAssignments = await prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted',
                grade: {
                    not: null
                }
            },
            include: {
                assignment: true
            },
        });
    
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
})

router.use(errorHandler)

export default router;