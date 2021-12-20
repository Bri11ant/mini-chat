import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.sevice';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  currentUser: any;
  chats: Chat[] = [];

  constructor(private chatService: ChatService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.chatService.updateChats();
    this.chatService.chatSubject.subscribe(
      (res: Chat[]) => this.chats = res.sort(
        () => -1
      ),
    );
    this.chatService.chatEmit();

    this.currentUser = this.chatService.currentUser;
  }

  onSubmit(form: NgForm) {
    this.chatService.sendMsg(form.value['message']);
    form.reset();
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
