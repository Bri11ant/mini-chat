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
        //
   }

   chatEmit() {
       this.chatSubject.next(this.chats.slice());
   }

   sendMsg(message: string) {
       const newChat = new Chat(this.currentUser, message, new Date());
       this.chats.push(newChat);
       this.chatEmit();

       this.http.post('http://localhost:3000/api/chats', newChat).subscribe(
           () => console.log("sent!"),
           error => console.error("Erreur! ", error)
       );
   }

    checkServer() {
        this.http.get('http://localhost:3000').subscribe(
            (res: any) => console.log(res.message),
        );
   }
   
    updateChats() {
        this.http.get('http://localhost:3000/api/chats').subscribe(
            (res: any) => {
                this.chats = res.chats;
                this.chatEmit();
            }, error => console.error('Erreur! ', error)
        );
    }
}