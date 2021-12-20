import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { User } from "../models/user.model";
import { ChatService } from "./chat.service";

@Injectable()
export class UserService {

    constructor(private http: HttpClient,
                private chatService: ChatService,
                private cookie: CookieService) {
    }

    startSession(user: User) {
        const strUser = JSON.stringify(user);
        const expiration = Date.now() + (1*120*1000);

        this.cookie.set('session_user', strUser, expiration);
    }

    signup(user: User) {
        return new Observable<boolean>(subscriber => {
            this.http.post('http://localhost:3000/api/users/signup', user).subscribe(
                (res: any) => {
                    if(res) {
                        this.chatService.currentUser = user;
                        this.startSession(res.val);
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
                        this.startSession(res.val);
                        subscriber.next(true);
                    }
                },
                error => console.error('erreur:', error)
            )
        })
    }

    logout() {
        this.cookie.set('session_user', '', 0);
    }
}