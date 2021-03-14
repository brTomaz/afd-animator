export default class State {
  constructor(private readonly name: string) {}
  getName = (): string => this.name;
}
