import { mkdirSync, rmdirSync } from 'fs';
import path from 'path';
import chalk from 'chalk';

import Automata from './entities/Automata';
import getInputFileData from './utils/get-input-file-data';
import {
  fillTransitionAutomataFunction,
  generateAnimation,
  generateDotFiles,
  generateImages,
  getInitialAndFinalStates,
  getWord,
  splitFileIntoLines,
} from './helpers';

const file = getInputFileData();
!file && process.exit(1);

const lines = splitFileIntoLines(file);

const { initialState, finalState } = getInitialAndFinalStates(lines);
const automata = new Automata(initialState, [finalState]);

const word = getWord(lines);
fillTransitionAutomataFunction(automata, lines);

const outputFilePath = path.join(__dirname, '../output');

const imagesFilePath = path.join(__dirname, '../images');
rmdirSync(imagesFilePath, { recursive: true });
mkdirSync(imagesFilePath, { recursive: true });

const animationFilePath = path.join(__dirname, '../animation');
mkdirSync(animationFilePath, { recursive: true });

const { isWordAccept, outputFileContent } = automata.process(word);

generateDotFiles(
  outputFilePath,
  outputFileContent,
  word,
  automata,
  isWordAccept
);
generateImages(outputFilePath);
generateAnimation();

if (isWordAccept) {
  console.log(chalk.bold.green('A palavra fornecida foi aceita.'));
} else {
  console.log(chalk.bold.red('A palavra fornecida não foi aceita.'));
}

console.log();
