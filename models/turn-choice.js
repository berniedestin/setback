export class TurnChoice {
  constructor(
    color,
    spaceNumber,
    fromHomeRow,
    distanceToVictory,
    willTakePiece,
    willLandOnEntrance,
  ) {
    this.color = color;
    this.spaceNumber = spaceNumber;
    this.fromHomeRow = fromHomeRow;
    this.distanceToVictory = distanceToVictory;
    this.willTakePiece = willTakePiece;
    this.willLandOnEntrance = willLandOnEntrance;
  }
}
