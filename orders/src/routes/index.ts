import express, { Request, Response, NextFunction } from "express";
import { requireAuth } from "@leawn-tickets-market/common";
import { Order } from "../models/order";

const router = express.Router();

router.get(
    "/api/orders",
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        const orders = await Order
            .find({
                userId: req.currentUser!.id
            })
            .populate("ticket");

        res.send(orders);
    }
);

export { router as indexOrderRouter };