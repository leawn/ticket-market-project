import { Publisher, OrderCancelledEvent, Subjects } from "@leawn-tickets-market/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}