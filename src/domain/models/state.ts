export default class State {
  constructor(private readonly name: string) {}
  getName = (): string => this.name;

  equals(other: State) {
    return other.getName() === this.getName();
  }
}
