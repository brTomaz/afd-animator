import { State } from '../../domain/models';

export default function getInitialAndFinalStates(lines: string[]) {
  const firstLineStates = lines[0].split(';');
  lines.shift();

  const namesInitialStates = firstLineStates[0].trim().split(' ');
  const namesFinalStates = firstLineStates[1].trim().split(' ');

  const initialStates: State[] = namesInitialStates.map(
    (name) => new State(name)
  );

  const finalStates: State[] = namesFinalStates.map((name) => new State(name));

  return {
    initialStates,
    finalStates,
  };
}
