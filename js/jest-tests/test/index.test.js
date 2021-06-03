import { Rover } from '../src/mars/models/rover';
import { COMMAND } from '../src/mars/models/command.enum';
import { DIRECTION } from '../src/mars/models/direction.enum';

describe('Mars rover', () => {
  describe('init', () => {
    it('should return default status', () => {
      const river = new Rover(1, 2, DIRECTION.NORTH);

      expect(river.x).toEqual(1);
      expect(river.y).toEqual(2);
      expect(river.direction).toEqual(DIRECTION.NORTH);
    });
  });

  describe('command', () => {
    let river;

    beforeEach(() => {
      river = new Rover(1, 2, DIRECTION.NORTH);
    });

    it('should process an empty set of commands', () => {
      river.command([]);
    });

    const cases = [
      [new Rover(1, 2, DIRECTION.NORTH), COMMAND.FORWARD, 1, 3, DIRECTION.NORTH],
      [new Rover(1, 2, DIRECTION.SOUTH), COMMAND.FORWARD, 1, 1, DIRECTION.SOUTH],
      [new Rover(1, 2, DIRECTION.WEST), COMMAND.FORWARD, 0, 2, DIRECTION.WEST],
      [new Rover(1, 2, DIRECTION.EAST), COMMAND.FORWARD, 2, 2, DIRECTION.EAST],
      [new Rover(1, 2, DIRECTION.NORTH), COMMAND.BACKWARD, 1, 1, DIRECTION.NORTH],
      [new Rover(1, 2, DIRECTION.SOUTH), COMMAND.BACKWARD, 1, 3, DIRECTION.SOUTH],
      [new Rover(1, 2, DIRECTION.WEST), COMMAND.BACKWARD, 2, 2, DIRECTION.WEST],
      [new Rover(1, 2, DIRECTION.EAST), COMMAND.BACKWARD, 0, 2, DIRECTION.EAST],
    ]

    describe.each(cases)(`when command is`, (rover, command, expectedX, expectedY, expectedDirection) => {
      describe(command.toString(), () => {
        describe(`and direction is ${expectedDirection.toString()}`, () => {
          it('should process the command', () => {
            rover.command([command])
  
            expect(rover.x).toBe(expectedX)
            expect(rover.y).toBe(expectedY)
            expect(rover.direction).toBe(expectedDirection)
          });                            
        });
      });
    });
  });
});