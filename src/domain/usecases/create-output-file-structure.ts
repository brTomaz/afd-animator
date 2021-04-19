import { Automata } from '../models';

export interface CreateOutputFileStructure {
  create: (automata: Automata) => string;
}
