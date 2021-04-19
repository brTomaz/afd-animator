import { AutomataConstants, Colors } from '../../domain/constants';
import { Automata } from '../../domain/models';
import { CreateOutputFileStructure } from '../../domain/usecases';

export class CreateDotfileStructure implements CreateOutputFileStructure {
  create = (automata: Automata) => {
    let dotfileContent: string;
    dotfileContent = this.setupHeaderdotfileContent(automata);
    dotfileContent += '}';

    return dotfileContent;
  };

  private setupHeaderdotfileContent = (automata: Automata) => {
    let outputHeader: string;

    outputHeader = 'digraph fsm {\n';
    outputHeader += ' rankdir=LR\n';
    outputHeader += ' size = 10\n';

    const namesOfFinalStates = [];
    const namesOfInitialStates = [];

    automata
      .getFinalStates()
      .forEach((finalState) => namesOfFinalStates.push(finalState.getName()));

    automata
      .getInitialStates()
      .forEach((initialState) =>
        namesOfInitialStates.push(initialState.getName())
      );

    outputHeader += ` node [shape = doublecircle]; \n ${namesOfFinalStates.join(
      ','
    )}\n`;

    const initialStatePrefix = AutomataConstants.INITIAL_STATE_PREFIX;

    outputHeader += ` node [shape = point];\n ${initialStatePrefix}\n`;
    outputHeader += ' node [shape = circle]; \n';
    outputHeader += ` error [style=filled, fillcolor=${Colors.NORMAL}]\n`;

    outputHeader += ` ${initialStatePrefix} -> ${namesOfInitialStates.join(
      ','
    )}\n`;

    outputHeader += this.createAutomataStructure(automata);

    return outputHeader;
  };

  private createAutomataStructure = (automata: Automata) => {
    let structure = '';

    automata.getTransitionFunction().forEach((dest, key) => {
      const keyFields = key.split(',');
      const source = keyFields[0];
      const label = keyFields[1];
      const states = [...dest];

      for (const s of states) {
        const line = `  "${source}" -> "${s.getName()}" [label=${label}]\n`;
        structure += line;
      }
    });

    return structure;
  };
}
