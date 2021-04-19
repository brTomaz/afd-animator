import { CommandLineError } from '../../presentation/errors/command-line-error';
import { Validation } from '../../presentation/protocols';

export class CommandLineValidation implements Validation {
  validate(): Error {
    if (process.argv.length < 3) {
      return new CommandLineError();
    }
  }
}
