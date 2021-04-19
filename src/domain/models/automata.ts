import State from './state';

export default class Automata {
  private transitionFunction: Map<string, Set<State>>;

  constructor(
    private readonly initialStates: Set<State>,
    private readonly finalStates: Set<State>
  ) {
    this.transitionFunction = new Map();
  }

  getInitialStates = (): Set<State> => {
    return this.initialStates;
  };

  getFinalStates = (): Set<State> => {
    return this.finalStates;
  };

  addTransition(source: State, dest: State, label: string) {
    const sourceName = source.getName();

    const key = `${sourceName},${label}`;

    if (!this.transitionFunction.get(key)) {
      this.transitionFunction.set(key, new Set<State>());
    }

    const states = this.transitionFunction.get(key);
    this.transitionFunction.set(`${sourceName},${label}`, states.add(dest));
  }

  getStatesBySourceAndLabel(source: State, label: string) {
    const key = `${source.getName()},${label}`;
    return this.transitionFunction.get(key);
  }

  getTransitionFunction = () => {
    return this.transitionFunction;
  };
}
