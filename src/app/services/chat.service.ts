import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Chat } from "../models/chat.model";

@Injectable()
export class ChatService {
    currentUser: string = '';
    private chats: Chat[] = [];
    chatSubject = new Subject<Chat[]>();

    constructor(private http: HttpClient) {
    /*
        CHAT SAMPLE
    */
        const chat_1 = new Chat('Jhonny', `Hi everyone`, new Date);
        const chat_2 = new Chat('Kevin', `Hi Jhonny`, new Date);
        const chat_3 = new Chat('Jhonny', `I'm from england and you?`, new Date);
        const chat_4 = new Chat('Kevin', `I'm from Madagascar`, new Date);
        const chat_5 = new Chat('Brillant', `Za koa avy any madagascar!`, new Date);

        this.chats.push(chat_1,chat_2,chat_3,chat_4,chat_5);
    /*
     *
     */
   }

   chatEmit() {
       this.chatSubject.next(this.chats.slice());
   }

   sendMsg(message: string) {
       const newChat = new Chat(this.currentUser, message, new Date());
       this.chats.push(newChat);
       this.chatEmit();

   }

    checkServer() {
        this.http.get('http://localhost:3000').subscribe(
            (res: any) => console.log(res.message),
        );
   }
}