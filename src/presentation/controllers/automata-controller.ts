import { readFileSync } from 'fs';

import { Automata, State } from '../../domain/models';
import { Controller, Validation } from '../protocols';
import { Response } from '../protocols/response';
import {
  fillTransitionFunction,
  getInitialAndFinalStates,
  getWord,
} from '../helpers';
import { splitFileIntoLines } from '../../utils';

export class AutomataController implements Controller {
  constructor(
    private readonly commandLineValidation: Validation,
    private readonly initialStatesValidation: Validation
  ) {}

  handle(): Response {
    const commandLineError = this.commandLineValidation.validate();

    if (commandLineError) {
      throw commandLineError;
    }

    const file = readFileSync(process.argv[2], 'utf-8').trim();

    const lines = splitFileIntoLines(file);
    const { initialStates, finalStates } = getInitialAndFinalStates(lines);

    const initialStatesError = this.initialStatesValidation.validate(
      initialStates
    );

    if (initialStatesError) {
      throw initialStatesError;
    }

    const automata = new Automata(
      new Set<State>(initialStates),
      new Set<State>(finalStates)
    );

    const word = getWord(lines);
    fillTransitionFunction(automata, lines);

    return {
      body: {
        automata,
        word,
      },
    };
  }
}
