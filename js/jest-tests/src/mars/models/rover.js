import { DIRECTION } from './direction.enum'
import { COMMAND } from './command.enum'

export class Rover {
  constructor(x, y, d) {
    this._x = x;
    this._y = y;
    this._d = d;

    this._commandDirectionMap = {
      [`${COMMAND.FORWARD.toString()}-${DIRECTION.NORTH.toString()}`]: { x: 0, y: 1 },
      [`${COMMAND.FORWARD.toString()}-${DIRECTION.SOUTH.toString()}`]: { x: 0, y: -1 },
      [`${COMMAND.FORWARD.toString()}-${DIRECTION.WEST.toString()}`]: { x: -1, y: 0 },
      [`${COMMAND.FORWARD.toString()}-${DIRECTION.EAST.toString()}`]: { x: 1, y: 0 },
      [`${COMMAND.BACKWARD.toString()}-${DIRECTION.NORTH.toString()}`]: { x: 0, y: -1 },
      [`${COMMAND.BACKWARD.toString()}-${DIRECTION.SOUTH.toString()}`]: { x: 0, y: 1 },
      [`${COMMAND.BACKWARD.toString()}-${DIRECTION.WEST.toString()}`]: { x: 1, y: 0 },
      [`${COMMAND.BACKWARD.toString()}-${DIRECTION.EAST.toString()}`]: { x: -1, y: 0 },
    }
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get direction() {
    return this._d;
  }

  command(commands) {
    commands.forEach(c => {
      this._processCommand(c);
    });
  }

  _processCommand(command) {
    const operation = this._commandDirectionMap[`${command.toString()}-${this._d.toString()}`]
    
    if (!operation) {
      return;
    }

    this._x += operation.x;
    this._y += operation.y;
  }
}