import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  currentUser: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.currentUser = this.chatService.currentUser;
  }

}
