import { Test, TestingModule } from '@nestjs/testing';
import { transformToPlayers } from './utils';

describe('Util Spec', () => {
  beforeEach(async () => {});

  describe('root', () => {
    it('01"', () => {
      const originalObject = {
        '0': {
          SHfPa89TPbp9R6ZhAAAN: {
            state: 0,
            id: 'SHfPa89TPbp9R6ZhAAAN',
            name: 'Orange Dragon',
            coordinate: { x: 10, y: 20 },
            healthyBarState: 0,
            healthy: 100,
          },
          sMKsTPpsM4q5Qq8QAAAP: {
            state: 0,
            id: 'sMKsTPpsM4q5Qq8QAAAP',
            name: 'Gold Dragon',
            coordinate: { x: 30, y: 40 },
            healthyBarState: 0,
            healthy: 100,
          },
        },
        '1': {
          'nVvEG-IrwHimW3xAAAAL': {
            state: 0,
            id: 'nVvEG-IrwHimW3xAAAAL',
            name: 'Red Lion',
            coordinate: { x: 50, y: 60 },
            healthyBarState: 0,
            healthy: 100,
          },
        },
      };

      const expected = {
        SHfPa89TPbp9R6ZhAAAN: {
          state: 0,
          id: 'SHfPa89TPbp9R6ZhAAAN',
          name: 'Orange Dragon',
          coordinate: { x: 10, y: 20 },
          healthyBarState: 0,
          healthy: 100,
        },
        sMKsTPpsM4q5Qq8QAAAP: {
          state: 0,
          id: 'sMKsTPpsM4q5Qq8QAAAP',
          name: 'Gold Dragon',
          coordinate: { x: 30, y: 40 },
          healthyBarState: 0,
          healthy: 100,
        },
        'nVvEG-IrwHimW3xAAAAL': {
          state: 0,
          id: 'nVvEG-IrwHimW3xAAAAL',
          name: 'Red Lion',
          coordinate: { x: 50, y: 60 },
          healthyBarState: 0,
          healthy: 100,
        },
      };
      expect(transformToPlayers(originalObject)).toEqual(expected);
    });
    it('2"', () => {
      const originalObject = {
        '0': {
          SHfPa89TPbp9R6ZhAAAN: {
            state: 0,
            id: 'SHfPa89TPbp9R6ZhAAAN',
            name: 'Orange Dragon',
            coordinate: { x: 10, y: 20 },
            healthyBarState: 0,
            healthy: 100,
          },
          sMKsTPpsM4q5Qq8QAAAP: {
            state: 0,
            id: 'sMKsTPpsM4q5Qq8QAAAP',
            name: 'Gold Dragon',
            coordinate: { x: 30, y: 40 },
            healthyBarState: 0,
            healthy: 100,
          },
        },
        '1': {},
      };

      const expected = {
        SHfPa89TPbp9R6ZhAAAN: {
          state: 0,
          id: 'SHfPa89TPbp9R6ZhAAAN',
          name: 'Orange Dragon',
          coordinate: { x: 10, y: 20 },
          healthyBarState: 0,
          healthy: 100,
        },
        sMKsTPpsM4q5Qq8QAAAP: {
          state: 0,
          id: 'sMKsTPpsM4q5Qq8QAAAP',
          name: 'Gold Dragon',
          coordinate: { x: 30, y: 40 },
          healthyBarState: 0,
          healthy: 100,
        },
      };
      expect(transformToPlayers(originalObject)).toEqual(expected);
    });

    it('3', () => {
      const originalObject = {
        '0': {},
        '1': {
          'nVvEG-IrwHimW3xAAAAL': {
            state: 0,
            id: 'nVvEG-IrwHimW3xAAAAL',
            name: 'Red Lion',
            coordinate: { x: 50, y: 60 },
            healthyBarState: 0,
            healthy: 100,
          },
        },
      };

      const expected = {
        'nVvEG-IrwHimW3xAAAAL': {
          state: 0,
          id: 'nVvEG-IrwHimW3xAAAAL',
          name: 'Red Lion',
          coordinate: { x: 50, y: 60 },
          healthyBarState: 0,
          healthy: 100,
        },
      };
      expect(transformToPlayers(originalObject)).toEqual(expected);
    });
    it('4"', () => {
      const originalObject = {
        '0': {
          SHfPa89TPbp9R6ZhAAAN: {
            state: 0,
            id: 'SHfPa89TPbp9R6ZhAAAN',
            name: 'Orange Dragon',
            coordinate: { x: 10, y: 20 },
            healthyBarState: 0,
            healthy: 100,
          },
        },
        '1': {
          'nVvEG-IrwHimW3xAAAAL': {
            state: 0,
            id: 'nVvEG-IrwHimW3xAAAAL',
            name: 'Red Lion',
            coordinate: { x: 50, y: 60 },
            healthyBarState: 0,
            healthy: 100,
          },
        },
      };

      const expected = {
        SHfPa89TPbp9R6ZhAAAN: {
          state: 0,
          id: 'SHfPa89TPbp9R6ZhAAAN',
          name: 'Orange Dragon',
          coordinate: { x: 10, y: 20 },
          healthyBarState: 0,
          healthy: 100,
        },

        'nVvEG-IrwHimW3xAAAAL': {
          state: 0,
          id: 'nVvEG-IrwHimW3xAAAAL',
          name: 'Red Lion',
          coordinate: { x: 50, y: 60 },
          healthyBarState: 0,
          healthy: 100,
        },
      };
      expect(transformToPlayers(originalObject)).toEqual(expected);
    });
    it('5', () => {
      const originalObject = {
        '0': {
          SHfPa89TPbp9R6ZhAAAN: {
            state: 0,
            id: 'SHfPa89TPbp9R6ZhAAAN',
            name: 'Orange Dragon',
            coordinate: { x: 10, y: 20 },
            healthyBarState: 0,
            healthy: 100,
          },
        },
        '1': {},
      };

      const expected = {
        SHfPa89TPbp9R6ZhAAAN: {
          state: 0,
          id: 'SHfPa89TPbp9R6ZhAAAN',
          name: 'Orange Dragon',
          coordinate: { x: 10, y: 20 },
          healthyBarState: 0,
          healthy: 100,
        },
      };
      expect(transformToPlayers(originalObject)).toEqual(expected);
    });

    it('6', () => {
      const originalObject = {
        '0': {},
        '1': {},
      };

      const expected = {};
      expect(transformToPlayers(originalObject)).toEqual(expected);
    });
  });
});
