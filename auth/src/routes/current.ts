import express, { Request, Response, NextFunction } from 'express';

import { currentUser } from "@leawn-tickets-market/common";

const router = express.Router();

router.get(
    '/api/users/current',
    currentUser,
    (req: Request, res: Response, next: NextFunction) => {
        res.send({ currentUser: req.currentUser || null });
    });

export { router as currentRouter };