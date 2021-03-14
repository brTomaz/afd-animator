import { mkdirSync, rmdirSync } from 'fs';
import path from 'path';
import chalk from 'chalk';

import Automata from './entities/Automata';
import State from './entities/State';
import fillTransitionAutomataFunction from './helpers/fill-transition-automata-function';
import generateAnimation from './helpers/generate-animation';
import generateDotFiles from './helpers/generate-dot-files';
import generateImages from './helpers/generate-images';
import getInputFileData from './utils/get-input-file-data';

const file = getInputFileData();
!file && process.exit(1);

const lines = file.split('\n');
lines.pop();
const wordLine = lines.pop();

const firstLineStates = lines[0].split(';');
lines.shift();

const initialState: State = new State(firstLineStates[0].trim());
const finalState: State = new State(firstLineStates[1].trim());
const automata = new Automata(initialState, [finalState]);

const word = wordLine.split(':')[1].trim();
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
