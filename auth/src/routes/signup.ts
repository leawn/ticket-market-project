import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from "@leawn-tickets-market/common";

import { User } from '../models/user';

const router = express.Router();

router.get(
    '/api/users/signup',
    [
      body('email')
          .isEmail()
          .withMessage('Email must be valid'),
      body('password')
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage('Password must be between 4 and 20 characters long')
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password });
        await user.save();

        // Generate JWT
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!
        );

        // Setting jwt secret key in kubernetes cluster:
        // kubectl create secret generic jwt-secret --from-literal=JWT_KEY="*"

        // Store it on session object
        req.session = {
            jwt: userJwt
        }

        res.status(201).send(user);
    });

export { router as signupRouter };