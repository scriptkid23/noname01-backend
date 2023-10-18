import * as _ from 'lodash';
import { Player, Room } from './storage';

export function generateRandomName(): string {
  const adjectives = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Purple',
    'Orange',
    'Silver',
    'Gold',
  ];
  const nouns = [
    'Dragon',
    'Phoenix',
    'Tiger',
    'Lion',
    'Wolf',
    'Eagle',
    'Bear',
    'Snake',
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

export function transformToPlayers(room: {
  [team: number]: {
    [id: string]: Player;
  };
}): { [id: string]: Player } {
  let result = {};
  for (let i in Object.keys(room)) {
    _.merge(result, _.pick(room[i], Object.keys(room[i])));
  }

  return result;
}
