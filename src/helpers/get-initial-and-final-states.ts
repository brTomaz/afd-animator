import State from '../entities/State';

export default function getInitialAndFinalStates(lines: string[]) {
  const firstLineStates = lines[0].split(';');
  lines.shift();
  const initialState: State = new State(firstLineStates[0].trim());
  const finalState: State = new State(firstLineStates[1].trim());

  return {
    initialState,
    finalState,
  };
}
