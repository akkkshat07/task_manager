import express from 'express';
import { body } from 'express-validator';
import { signup, login } from '../controllers/auth.controller';

const router = express.Router();

router.use((req, res, next) => {
    console.log('Auth Route:', req.method, req.path);
    next();
});


router.get('/', (req, res) => {
    res.json({ message: 'Auth route is working' });
});

router.post(
    '/signup',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    ],
    signup
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    login
);

export default router;
