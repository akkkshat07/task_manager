import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { name, email, password } = req.body;

        
        const existingUser = await User.findOne({ email });        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        
        const user = new User({
            name,
            email,
            password,
        });

        await user.save();

      
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { email, password } = req.body;

       
        const user = await User.findOne({ email });        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        
        const isMatch = await user.comparePassword(password);        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
