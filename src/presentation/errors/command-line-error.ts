import { isProduction } from '../../main/config';

export class CommandLineError extends Error {
  constructor() {
    super();
    this.message = this.getErrorMessage();
  }

  private getErrorMessage() {
    const errorMessage = 'Caminho do arquivo não fornecido.';

    const command = isProduction ? 'start' : 'dev';
    const correctUsageMessage = `Uso: yarn ${command} <FILEPATH>`;

    return `${errorMessage}\n${correctUsageMessage}`;
  }
}
