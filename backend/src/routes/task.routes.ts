import express from 'express';
import { body } from 'express-validator';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

router.use(auth);

router.get('/', getTasks);


router.post(
    '/',
    [
        body('title').trim().notEmpty().withMessage('Title is required'),
        body('description').optional().trim(),
    ],
    createTask
);

router.put(
    '/:id',
    [
        body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
        body('description').optional().trim(),
        body('status').optional().isBoolean().withMessage('Status must be a boolean'),
    ],
    updateTask
);

router.delete('/:id', deleteTask);

export default router;
