import { InitialStatesError } from '../../presentation/errors/initial-states-error';
import { State } from '../../domain/models';
import { Validation } from '../../presentation/protocols';

export class InitialStatesValidation implements Validation {
  validate(initialStates: State[]): Error {
    const isFirstElementNull = initialStates[0].getName() === '';
    if (isFirstElementNull) {
      return new InitialStatesError();
    }
  }
}
