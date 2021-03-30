import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@leawn-tickets-market/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        const ticket = await Ticket.findByEvent(data);

        if (!ticket) {
            throw new Error("Ticket not found");
        }

        const { title, price, version } = data;
        ticket.set({ title, price }); // here must add version if there is no if-current npm module for mongoose
        await ticket.save();

        msg.ack();
    }
}