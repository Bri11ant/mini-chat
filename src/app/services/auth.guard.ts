import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ChatService } from './chat.service';

@Injectable({providedIn: 'root'})
export class authGuard implements CanActivate {
    constructor(private chatService: ChatService,
                private router: Router,
                private cookie: CookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const sessionUser = JSON.parse(this.cookie.get('session_user'));
        if(sessionUser) {
            this.chatService.currentUser = sessionUser;
        }
        return this.chatService.currentUser?true:false;
    }
}