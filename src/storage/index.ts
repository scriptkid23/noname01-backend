import { generateRandomName } from 'src/utils';

enum PlayerState {
  Idle,
  Death,
  Hurt,
}

export enum Team {
  Red,
  Blue,
}

enum HealthyBarState {
  Normal,
  Warning,
}

enum SkillState {
  Normal,
  Until,
}

type Coordinate = {
  x: number;
  y: number;
};

export class Player {
  id: string;
  coordinate: Coordinate;
  state: PlayerState;
  healthyBarState: HealthyBarState;
  healthy: number;
  name: string;

  constructor(id: string, x: number, y: number, name?: string) {
    this.state = PlayerState.Idle;
    this.id = id;
    this.name = generateRandomName();

    this.coordinate = {
      x: x,
      y: y,
    };

    this.healthyBarState = HealthyBarState.Normal;
    this.healthy = 100;
  }
}

class PlayerRoom {
  team: number; // team 1 or team 2
  player: Player;
}

export class Skill {
  coordinate: Coordinate;
  state: SkillState;
}

export class Room {
  [key: string]: {
    [team: number]: {
      [id: string]: Player;
    };
  };
}

type PlayerInRoom = {
  [id: string]: {
    roomId: string;
    team: Team;
  };
};

export class GameStorage {
  private static instance: GameStorage;

  private rooms: Room;
  private players: PlayerInRoom = {};

  private constructor() {
    this.rooms = {
      room00: {
        [Team.Red]: {},
        [Team.Blue]: {},
      },
    };
  }

  public static getInstance(): GameStorage {
    if (GameStorage.instance) {
      return GameStorage.instance;
    }
    return new GameStorage();
  }

  public setPlayerInRoom = (id: string, roomId: string, team: Team) => {
    this.players[id] = { roomId: roomId, team: team };
  };

  public getPlayerInRoom = (id: string): { roomId: string; team: Team } => {
    return this.players[id];
  };

  public getRoomById = (id: string) => {
    return this.rooms[id];
  };
}