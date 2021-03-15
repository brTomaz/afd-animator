import chalk from 'chalk';
import { readFileSync } from 'fs';

export default function getInputFileData() {
  if (process.argv.length < 3) {
    const errorMessage = 'ERRO! Caminho do arquivo não fornecido.';

    const isDevelopment = process.env.NODE_ENV === 'development';
    const command = isDevelopment ? 'dev' : 'start';
    const correctUsageMessage = `Uso: yarn ${command} <FILEPATH>`;

    console.error(chalk.red(errorMessage));
    console.log(correctUsageMessage + '\n');

    return null;
  }

  const file = readFileSync(process.argv[2], 'utf-8');

  return file;
}
