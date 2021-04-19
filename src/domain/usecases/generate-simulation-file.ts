import { Automata } from '../models';
import { ResultSimulation } from './protocols/result-simulation';

export interface GenerateSimulationFile {
  generate: (
    path: string,
    content: string,
    automata: Automata,
    word: string
  ) => ResultSimulation;
}
