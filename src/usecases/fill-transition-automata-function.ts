import Automata from '../entities/Automata';
import State from '../entities/State';

export default function fillTransitionAutomataFunction(
  automata: Automata,
  lines: string[]
) {
  lines.forEach((line) => {
    const parts = line.split('>');
    const keyParts = parts[0].split(' ');
    const key = `${keyParts[0]},${keyParts[1]}`;
    const value = parts[1].trim();
    automata.transitionFunction.set(key, new State(value));
  });
}
