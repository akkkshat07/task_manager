import { Request, Response } from 'express';
import { Task } from '../models/task.model';
import { validationResult } from 'express-validator';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find({ createdBy: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { title, description } = req.body;
        const task = new Task({
            title,
            description,
            createdBy: req.user._id,
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        if (title) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findOneAndDelete({ 
            _id: req.params.id, 
            createdBy: req.user._id 
        });

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
