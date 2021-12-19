import { User } from "./user.model";

export class Chat{
    constructor(
        public writer_chat: User,
        public message_chat: string,
        public date_chat: Date,
    ) {}
}