import { Symbols } from '../../domain/constants';
import { Automata, State } from '../../domain/models';

export default function lambdaClosure(state: State, automata: Automata) {
  return automata.getStatesBySourceAndLabel(state, Symbols.LAMBDA);
}
