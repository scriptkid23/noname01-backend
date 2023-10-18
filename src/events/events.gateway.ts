import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventTypes, GameSize } from 'src/constants';
import { GameStorage, Player, Team } from 'src/storage';
import * as _ from 'lodash';
import { transformToPlayers } from 'src/utils';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(EventsGateway.name);
  private readonly gameStorage = GameStorage.getInstance();

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(EventTypes.CurrentlyAttacking)
  handleEventCurrentlyAttacking() {}

  @SubscribeMessage(EventTypes.BeingAttacked)
  handleEventBeingAttacked() {}

  @SubscribeMessage(EventTypes.JoinRoom)
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    client.join(roomId);

    const currentRoom = this.gameStorage.getRoomById(roomId);

    const playerOfRedTeam = Object.keys(currentRoom[Team.Red]).length;
    const playerOfBlueTeam = Object.keys(currentRoom[Team.Blue]).length;

    let newPlayer: Player;

    if (
      playerOfRedTeam === playerOfBlueTeam ||
      playerOfRedTeam < playerOfBlueTeam
    ) {
      // join red team
      newPlayer = new Player(
        client.id,
        GameSize.width / 2 - 150,
        GameSize.height / 2 + 150,
      );
      currentRoom[Team.Red][client.id] = newPlayer;

      this.gameStorage.setPlayerInRoom(client.id, roomId, Team.Red);
    } else {
      newPlayer = new Player(
        client.id,
        GameSize.width / 2 + 150,
        GameSize.height / 2 + 150,
      );
      currentRoom[Team.Blue][client.id] = newPlayer;
      this.gameStorage.setPlayerInRoom(client.id, roomId, Team.Blue);
    }

    const players = transformToPlayers(currentRoom);

    client.emit(EventTypes.FetchPlayers, players); // update players in room

    client.to(roomId).emit(EventTypes.PlayerJoined, newPlayer); // handle for other nodes when a player just joined
  }

  @SubscribeMessage(EventTypes.LeaveRoom)
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; team: number; useId: string },
  ) {
    const currentRoom = this.gameStorage.getRoomById(data.roomId);
    delete currentRoom[data.team][data.useId];
  }

  @SubscribeMessage(EventTypes.PlayerReady)
  handlePlayerReady(@ConnectedSocket() client: Socket) {
    const player = this.gameStorage.getPlayerInRoom(client.id);
    const currentRoom = this.gameStorage.getRoomById(player.roomId);

    currentRoom.readyCount += 1;

    console.log(currentRoom.readyCount);

    let canPlay = false;

    const playerOfRedTeam = Object.keys(currentRoom[Team.Red]).length;
    const playerOfBlueTeam = Object.keys(currentRoom[Team.Blue]).length;

    if (
      currentRoom.readyCount === playerOfRedTeam + playerOfBlueTeam &&
      playerOfBlueTeam + playerOfRedTeam > 1
    ) {
      canPlay = true;
    }
    this.server.emit(EventTypes.CanPlay, canPlay);
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client ${client.id} is connected`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    try {
      if (Object.keys(this.gameStorage.getPlayersInRoom()).length !== 0) {
        const player = this.gameStorage.getPlayerInRoom(client.id);

        if (!player) return;

        const room = this.gameStorage.getRoomById(player.roomId);
        
        room.readyCount = 0;

        delete room[player.team][client.id];

        client.leave(player.roomId);

        client.broadcast.emit(EventTypes.PlayerLeft, client.id);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
