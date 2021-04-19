import chalk from 'chalk';

import { CreateOutputFileStructure } from '../domain/usecases';
import { Messages } from '../domain/constants';

import { CreateDotfileStructure } from '../data/usecases/create-dotfile-structure';
import { makeAutomataControllerFactory } from './factories/controllers/automata-controller-factory';
import { createOutputDirectors } from './helpers';
import { CreateGif, CreateImages, GenerateDotfiles } from '../data/usecases';

const automataController = makeAutomataControllerFactory();

try {
  const { automata, word } = automataController.handle().body;

  const { dotfilesFolderPath } = createOutputDirectors();

  const createOutputStructure: CreateOutputFileStructure = new CreateDotfileStructure();
  const dotfileContent = createOutputStructure.create(automata);

  const { isWordAccepted, hasError } = new GenerateDotfiles().generate(
    dotfilesFolderPath,
    dotfileContent,
    automata,
    word
  );

  const imagesCreator = new CreateImages();
  imagesCreator.create(dotfilesFolderPath);

  const animationCreator = new CreateGif();
  animationCreator.create();

  if (hasError) {
    console.log(chalk.bold.yellow(Messages.ERROR));
  }
  if (isWordAccepted) {
    console.log(chalk.bold.green(Messages.ACCEPTED));
  } else {
    console.log(chalk.bold.red(Messages.UNACCEPTED));
  }
} catch (error) {
  console.log(chalk.redBright(error));
}
