import EventEmitter from 'events';
import TypedEmitter from 'typed-emitter';
import { Player as PlayerModel, PlayerLocation } from '../types/CoveyTownSocket';
// import TownController from './TownController';

export type PlayerEvents = {
  movement: (newLocation: PlayerLocation) => void;
};

export type PlayerGameObjects = {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  label: Phaser.GameObjects.Text;
  locationManagedByGameScene: boolean /* For the local player, the game scene will calculate the current location, and we should NOT apply updates when we receive events */;
};
export default class PlayerController extends (EventEmitter as new () => TypedEmitter<PlayerEvents>) {
  private _location: PlayerLocation;

  private _preTeleportLocation?: PlayerLocation | undefined;

  private readonly _id: string;

  private readonly _userName: string;

  public gameObjects?: PlayerGameObjects;

  constructor(id: string, userName: string, location: PlayerLocation) {
    super();
    this._id = id;
    this._userName = userName;
    this._location = location;
  }

  set location(newLocation: PlayerLocation) {
    this._location = newLocation;
    this._updateGameComponentLocation(false);
    this.emit('movement', newLocation);
  }

  get location(): PlayerLocation {
    return this._location;
  }

  set preTeleportLocation(newLocation: PlayerLocation | undefined) {
    if (newLocation) {
      this._preTeleportLocation = newLocation;
    }
  }

  get preTeleportLocation(): PlayerLocation | undefined {
    return this._preTeleportLocation;
  }

  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  toPlayerModel(): PlayerModel {
    return { id: this.id, userName: this.userName, location: this.location };
  }

  public teleport(newLocation: PlayerLocation) {
    // change player location without walking animations
    if (newLocation !== this._location) {
      const tempLocation = {
        x: this._location.x,
        y: this._location.y,
        rotation: this._location.rotation,
        moving: this._location.moving,
        interactableID: this._location.interactableID,
      };
      this._preTeleportLocation = tempLocation;
      this._location = newLocation;
      console.log('in PlayerController.teleport');
      console.log(
        'previous location:' + this._preTeleportLocation.x + ' ' + this._preTeleportLocation.y,
      );
      console.log('current location: ' + this._location.x + ' ' + this._location.y);
      this._updateGameComponentLocation(true);
      this.emit('movement', newLocation);
    }
  }

  private _updateGameComponentLocation(teleport: boolean) {
    if (this.gameObjects && (!this.gameObjects.locationManagedByGameScene || teleport)) {
      const { sprite, label } = this.gameObjects;
      if (!sprite.anims && !teleport) {
        return;
      }
      sprite.setX(this.location.x);
      sprite.setY(this.location.y);
      console.log('in updateGameComponent');
      console.log('new location:' + sprite.x + ' ' + sprite.y);
      label.setX(this.location.x);
      label.setY(this.location.y - 20);
      if (this.location.moving && !teleport) {
        sprite.anims.play(`misa-${this.location.rotation}-walk`, true);
      } else {
        sprite.anims.stop();
        sprite.setTexture('atlas', `misa-${this.location.rotation}`);
      }
    }
  }

  static fromPlayerModel(modelPlayer: PlayerModel): PlayerController {
    return new PlayerController(modelPlayer.id, modelPlayer.userName, modelPlayer.location);
  }
}
