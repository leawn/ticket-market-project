import express, { Request, Response, NextFunction } from "express";
import {NotAuthorizedError, NotFoundError, requireAuth} from "@leawn-tickets-market/common";
import { Order } from "../models/order";

const router = express.Router();

router.get(
    "/api/orders/:orderId",
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        const order = await Order
            .findById(req.params.orderId)
            .populate("ticket");

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
    }
);

export { router as showOrderRouter };