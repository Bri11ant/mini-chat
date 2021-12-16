import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ChatService } from './chat.service';

@Injectable({providedIn: 'root'})
export class authGuard implements CanActivate {
    constructor(private chatService: ChatService,
                private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.chatService.currentUser?true:false;
    }
}