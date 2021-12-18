import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";

export class SocketService {
    socket: Socket;

    constructor() {
        this.socket = io('ws://localhost:3000');
    }

    listen(event: string) {
        return new Observable(subscriber => {
            this.socket.on(event, res => {
                subscriber.next(res);
                console.warn('Socket:', res);
            });
        });
    }

    emit(event: string, data: any) {
        this.socket.emit(event, data);
    }
}