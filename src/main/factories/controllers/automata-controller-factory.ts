import { AutomataController } from '../../../presentation/controllers/automata-controller';
import { Controller } from '../../../presentation/protocols';
import {
  CommandLineValidation,
  InitialStatesValidation,
} from '../../../validation/validators';

export const makeAutomataControllerFactory = (): Controller => {
  const controller = new AutomataController(
    new CommandLineValidation(),
    new InitialStatesValidation()
  );

  return controller;
};
