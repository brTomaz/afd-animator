import Automata from '../../src/entities/Automata';
import {
  fillTransitionAutomataFunction,
  getInitialAndFinalStates,
  getWord,
  splitFileIntoLines,
} from '../../src/helpers';
import mockAcceptedWordFile from '../mocks/mock-accepted-word-file';
import mockWordNotAcceptedFile from '../mocks/mock-word-not-accepted-file';

describe('Automata', () => {
  it('should accept word', () => {
    const isWordAccept = getIsWordAccept(mockAcceptedWordFile);
    expect(isWordAccept).toBeTruthy();
  });

  it('should not accept word', () => {
    const isWordAccept = getIsWordAccept(mockWordNotAcceptedFile);
    expect(isWordAccept).toBeFalsy();
  });
});

function getIsWordAccept(file: string) {
  const lines = splitFileIntoLines(file);
  const { initialState, finalState } = getInitialAndFinalStates(lines);
  const automata = new Automata(initialState, [finalState]);
  const word = getWord(lines);
  fillTransitionAutomataFunction(automata, lines);
  const { isWordAccept } = automata.process(word);

  return isWordAccept;
}
