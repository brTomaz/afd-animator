import State from './State';

export default class Automata {
  transitionFunction: Map<string, State>;

  constructor(
    private readonly initialState: State,
    private readonly finalStates: State[]
  ) {
    this.transitionFunction = new Map();
  }

  getInitialState = (): State => {
    return this.initialState;
  };

  getFinalStates = (): State[] => {
    return this.finalStates;
  };

  process = (word: string) => {
    let outputFileContent: string;
    outputFileContent = 'strict digraph {';
    let state = this.getInitialState().getName();

    for (let iterator = 0; iterator < word.length; iterator++) {
      let currentKey: string;
      let prevState: string;

      if (iterator === 0) {
        prevState = this.getInitialState().getName();
        currentKey = `${prevState},${word[iterator]}`;
        state = this.transitionFunction.get(currentKey).getName();
      } else {
        prevState = state;
        currentKey = `${state},${word[iterator]}`;
        state = this.transitionFunction.get(currentKey).getName();
      }
      outputFileContent += `
    ${prevState} -> ${state} [label=${word[iterator]}]`;
    }

    outputFileContent += this.createAutomataStructure() + '\n}';

    let isWordAccept: boolean;

    for (const s of this.finalStates) {
      isWordAccept = s.getName() === state;
      if (isWordAccept) break;
    }
    return {
      isWordAccept,
      outputFileContent,
    };
  };

  private isAFinalState = (state: string) => {
    for (const s of this.finalStates) {
      const isFinal = s.getName() === state;
      if (isFinal) return true;
    }
    return false;
  };

  private createAutomataStructure = () => {
    let structure = '';

    this.transitionFunction.forEach((dest, key) => {
      const keyFields = key.split(',');
      const source = keyFields[0];
      const symbol = keyFields[1];
      const line = `
      ${source} [shape=${
        this.isAFinalState(source) ? 'doublecircle' : 'circle'
      }]
      ${source} -> ${dest.getName()} [label=${symbol}]`;
      structure += line;
    });

    return structure;
  };
}
