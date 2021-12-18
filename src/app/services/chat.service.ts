import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { Subject } from "rxjs";
import { Chat } from "../models/chat.model";

@Injectable()
export class ChatService {
    currentUser: string = '';
    private chats: Chat[] = [];
    chatSubject = new Subject<Chat[]>();
    socket: Socket;

    constructor(private http: HttpClient) {
        this.socket = io('ws://localhost:3000');
        this.initChat();
    }

    chatEmit() {
        this.chatSubject.next(this.chats.slice());
    }

    sendMsg(message: string) {
        const newChat = new Chat(this.currentUser, message, new Date());

        this.http.post('http://localhost:3000/api/chats', newChat).subscribe(
            () => console.log("sent!"),
            error => console.error("Erreur! ", error)
        );
    }

    checkServer() {
        this.socket.emit('test_connection', 'connected!');
    };

    initChat() {
        this.http.get('http://localhost:3000/api/chats').subscribe(
            (res: any) => {
                this.chats = res.chats;
                this.chatEmit();
            }, error => console.error('Erreur! ', error)
        );
    }

    updateChats() {
        this.socket.on('newChat',
            (newChat: any) => {
                this.chats.push(newChat);
                this.chatEmit();
            }
        )
    }
}



   
   
