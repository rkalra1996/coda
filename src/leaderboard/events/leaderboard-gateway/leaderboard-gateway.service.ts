import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class LeaderboardGatewayService implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;
    users: number = 0;

    async handleConnection(){

        // A client has connected
        this.users++;
        console.log('total users connected ', this.users)
        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }

    async handleDisconnect(){

        // A client has disconnected
        this.users--;
        console.log('total users connected ', this.users)
        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }

    async notifyClientForUpdatedLeaderBoard(data: any) {
        this.server.emit('leaderboard-update', data)
    }
}
