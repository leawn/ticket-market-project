import express, { Request, Response, NextFunction } from "express";
import {NotAuthorizedError, NotFoundError, requireAuth} from "@leawn-tickets-market/common";
import { Order, OrderStatus } from "../models/order";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
    "/api/orders/:orderId",
    requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate("ticket");

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        order.status = OrderStatus.Cancelled;
        await order.save();

        // Publishing an event this was cancelled
        await new OrderCancelledPublisher(natsWrapper.client).publish({
           id: order.id,
           version: order.version,
           ticket: {
               id: order.ticket.id,
               price: order.ticket.price
           }
        });

        res.status(204).send(order);
        // probably would be better with a patch or put or post?
    }
);

export { router as deleteOrderRouter };