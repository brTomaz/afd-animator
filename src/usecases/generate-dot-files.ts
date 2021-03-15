import { mkdirSync, rmdirSync } from 'fs';

import Automata from '../entities/Automata';
import createDotFile from '../utils/create-dot-file';

export default function generateDotFiles(
  outputFilePath: string,
  outputFileContent: string,
  word: string,
  automata: Automata,
  isWordAccepted: boolean
) {
  rmdirSync(outputFilePath, { recursive: true });
  mkdirSync(outputFilePath, { recursive: true });

  const outputFileBreaked = outputFileContent.split('\n');
  let numberOfImages = 0;
  let count = 0;

  for (let it = 0; it < outputFileBreaked.length; it++) {
    let line = outputFileBreaked[it];
    if (line.includes('-')) {
      const aux = line;
      line = line.replace(']', ' color=lightseagreen]');

      const firstSymbol = line.split(' ')[4];
      line = `${firstSymbol} [style=filled, fillcolor=gray]\n` + line;
      outputFileBreaked[it] = line;
      outputFileContent = outputFileBreaked.join('\n');
      numberOfImages++;
      createDotFile(
        `output_${numberOfImages}`,
        outputFilePath,
        outputFileContent
      );
      outputFileBreaked[it] = aux;
      count++;

      if (count === word.length) break;
    }
  }
  const quantLinesTransitionFunction = automata.transitionFunction.size;
  const linesOfDefaultStructure = quantLinesTransitionFunction * 2;
  const shift = 2;
  const lastContentLineIndex =
    outputFileBreaked.length - linesOfDefaultStructure - shift;
  let line = outputFileBreaked[lastContentLineIndex];
  const firstSymbol = line.split(' ')[6];
  const finalStateColor = isWordAccepted ? 'springgreen' : 'red';
  line = `${firstSymbol} [style=filled, fillcolor=${finalStateColor}]\n` + line;
  outputFileBreaked[lastContentLineIndex] = line;
  outputFileContent = outputFileBreaked.join('\n');

  createDotFile(
    `output_${numberOfImages + 1}`,
    outputFilePath,
    outputFileContent
  );
}
