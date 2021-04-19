import { Automata, State } from '../../domain/models';
import lambdaClosure from './lambda-closure';

export default function getStatesFromlambdaClosure(
  states: Set<State>,
  automata: Automata
): Set<State> {
  let lambdaClosureForStates: Set<State> = new Set();

  states.forEach((state) => {
    const currentlambdaClosure = lambdaClosure(state, automata);

    if (currentlambdaClosure) {
      lambdaClosureForStates = new Set([
        ...lambdaClosureForStates,
        ...currentlambdaClosure,
      ]);
    }
  });

  return lambdaClosureForStates;
}
