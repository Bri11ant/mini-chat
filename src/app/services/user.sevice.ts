import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { ChatService } from "./chat.service";

@Injectable()
export class UserService {

    constructor(private http: HttpClient,
                private chatService: ChatService) {
    }

    signup(user: User) {
        return new Observable<boolean>(subscriber => {
            this.http.post('http://localhost:3000/api/users/signup', user).subscribe(
                (res: any) => {
                    if(res) {
                        this.chatService.currentUser = user;
                        subscriber.next(true);
                    }
                },
                error => console.error('erreur:', error)
            )
        })
    }

    login(user: any) {
        return new Observable<boolean>(subscriber => {
            this.http.post('http://localhost:3000/api/users/login', user).subscribe(
                (res: any) => {
                    if(res) {
                        this.chatService.currentUser = res.val;
                        subscriber.next(true);
                    }
                },
                error => console.error('erreur:', error)
            )
        })
    }
}