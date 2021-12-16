import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  currentUser: string = '';
  chats: Chat[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.chatSubject.subscribe(
      (res: Chat[]) => this.chats = res.sort(
        (oldChat,newChat) => {
          return oldChat.date_chat.getTime() < newChat.date_chat.getTime()? 1:-1;
        }
      ),
    );
    this.chatService.chatEmit();

    this.currentUser = this.chatService.currentUser;
  }

  onSubmit(form: NgForm) {
    this.chatService.sendMsg(form.value['message']);
  }

}
