// Not sure if this is necessary after using map to keep trak of next player
export class Player {
  constructor(isHuman, color, name) {
    this.isHuman = isHuman;
    this.color = color;
    this.name = name;
    if (color == "red") {
      this.nextColor = "green";
    } else if (color == "green") {
      this.nextColor = "yellow";
    } else if (color == "yellow") {
      this.nextColor = "blue";
    } else if (color == "blue") {
      this.nextColor = "red";
    }
  }
}
