import express from 'express';

import { prisma } from '../database';
import { isMissingKeys, isUUID, parseForResponse } from '../utils/api_utils';
import Errors from '../utils/errors';
import { CreateStudentDTO } from '../dtos/students';
import { InvalidRequestBodyError } from '../utils/exceptions';
import student from '../services/students';

const router = express.Router();

// POST student created
router.post('/', async (req, res) => {
    try {
        const dto = CreateStudentDTO.fromRequest(req.body);
        const data = await student.createStudent(dto);
        res.status(201).json({ error: undefined, data: parseForResponse(data), success: true });
    } catch (error) {
        if (error instanceof InvalidRequestBodyError) {
            res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
});

// GET all students
router.get('/', async (req, res) => {
    try {
        const data = await student.getAllStudents();
        res.status(200).json({ error: undefined, data: parseForResponse(data), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
});


// GET a student by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if(!isUUID(id)) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }
        const student = await prisma.student.findUnique({
            where: {
                id
            },
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }
        });
    
        if (!student) {
            return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
        }
    
        res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
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


export default router;