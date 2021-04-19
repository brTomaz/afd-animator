import { Symbols } from '../../domain/constants';
import { Automata, State } from '../../domain/models';

export default function fillTransitionFunction(
  automata: Automata,
  lines: string[]
) {
  lines.forEach((line) => {
    const parts = line.split('>');
    const keyParts = parts[0].split(' ');
    const source = new State(keyParts[0]);
    let label = keyParts[1];

    if (label === Symbols.BAR_DOT) {
      label = Symbols.LAMBDA;
    }

    const dest = new State(parts[1].trim());
    automata.addTransition(source, dest, label);
  });
}
