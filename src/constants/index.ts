export enum EventTypes {
  CurrentlyAttacking = 'CURRENTLY_ATTACKING',
  ActivateCurrentlyAttacking = 'ACTIVATE_CURRENTLY_ATTACKING',
  BeingAttacked = 'BEING_ATTACKED',
  ActivateBeingAttacked = 'ACTIVATE_BEING_ATTACKED',
  JoinRoom = 'JOIN_ROOM',
  LeaveRoom = 'LEAVE_ROOM',
  FetchPlayers = "FETCH_PLAYERS",
  PlayerJoined = 'PLAYER_JOINED', // 
  PlayerLeft = "PLAYER_LEFF",
  PlayerReady = "PLAYER_READY",
  CanPlay = "CAN_PLAY",
  InitSkill = 'INIT_SKILL',
  SkillFrom = 'SKILL_FROM'
}

export const GameSize = {
  width: 400,
  height: 640,
};
