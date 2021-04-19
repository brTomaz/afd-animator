/* eslint-disable no-unused-vars */
enum AutomataConstants {
  INITIAL_STATE_PREFIX = 'INITIAL_STATE_PREFIX',
}

enum Colors {
  SUCCESS = 'green',
  FAILURE = 'red',
  ACTIVE_STATE = 'gray',
  NORMAL = 'white',
  ACTIVE_EDGE = 'blue',
  ACTIVE_PREFIX_EDGE = 'tomato',
}

enum Messages {
  ACCEPTED = 'A palavra fornecida foi aceita.',
  UNACCEPTED = 'A palavra fornecida não foi aceita.',
  ERROR = 'Uma ou mais opções de processamento navegou para o estado de erro',
}

enum Symbols {
  BAR_DOT = '/.',
  LAMBDA = 'λ',
}

export { AutomataConstants, Colors, Messages, Symbols };
