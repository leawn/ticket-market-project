import { Publisher, Subjects, TicketUpdatedEvent } from "@leawn-tickets-market/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}