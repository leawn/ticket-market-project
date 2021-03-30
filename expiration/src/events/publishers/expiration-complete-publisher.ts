import { Subjects, Publisher, ExpirationCompleteEvent } from "@leawn-tickets-market/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}