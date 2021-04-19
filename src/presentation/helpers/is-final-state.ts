import { Automata, State } from '../../domain/models';
import contains from '../../utils/contains';

const isFinalState = (state: State, automata: Automata) => {
  const setFinals = automata.getFinalStates();

  return contains(setFinals, state);
};

export default isFinalState;
