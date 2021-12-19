import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatService } from './services/chat.service';
import { ChatBoxComponent } from './pages/chat-box/chat-box.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserService } from './services/user.sevice';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatBoxComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ChatService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
