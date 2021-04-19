export class InitialStatesError extends Error {
  constructor() {
    super();
    this.message =
      'Deve-se especificar um ou mais estados iniciais no arquivo de entrada.';
  }
}
