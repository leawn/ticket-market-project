import { Subjects, Publisher, PaymentCreatedEvent } from "@leawn-tickets-market/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}