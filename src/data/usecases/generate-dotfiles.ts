import { Automata, State } from '../../domain/models';
import { AutomataConstants, Colors, Symbols } from '../../domain/constants';
import { GenerateSimulationFile } from '../../domain/usecases';
import isFinalState from '../../presentation/helpers/is-final-state';
import createDotfile from '../../utils/create-dot-file';
import getStatesFromlambdaClosure from '../helpers/get-states-from-lambda-closure';

export class GenerateDotfiles implements GenerateSimulationFile {
  generate(
    dotfilesFolderPath: string,
    dotfileContent: string,
    automata: Automata,
    word: string
  ) {
    let numberOfImages = 0;
    let isWordAccepted = false;
    let hasError = false;

    const namesOfInitialStates = [];
    automata
      .getInitialStates()
      .forEach((initialState) =>
        namesOfInitialStates.push(initialState.getName())
      );

    const prefixLine = ` ${
      AutomataConstants.INITIAL_STATE_PREFIX
    } -> ${namesOfInitialStates.join(',')}\n`;

    const colorizedPrefixLine = ` ${
      AutomataConstants.INITIAL_STATE_PREFIX
    } -> ${namesOfInitialStates.join(',')} [color=${
      Colors.ACTIVE_PREFIX_EDGE
    }]\n`;

    const setInitialStates = automata.getInitialStates();
    let currentStates = [...setInitialStates];

    let currentStatesFromLambda = getStatesFromlambdaClosure(
      setInitialStates,
      automata
    );

    let beforeStates = new Set([...currentStates]);

    while (beforeStates.size !== 0) {
      currentStates = currentStates.concat([...currentStatesFromLambda]);

      currentStatesFromLambda = getStatesFromlambdaClosure(
        new Set([...beforeStates]),
        automata
      );

      beforeStates = currentStatesFromLambda;
    }

    let it = 0;

    const standardOutput = dotfileContent;

    if (it === 0) {
      dotfileContent = dotfileContent.replace(prefixLine, colorizedPrefixLine);
    }

    for (const symbol of word) {
      const isLastSymbol = ++it === word.length;

      let nextStates = new Set<State>();
      let lambda = new Set<State>();

      for (const currentState of currentStates) {
        const stateName = currentState.getName();

        let colorized = `  "${stateName}" [style=filled, fillcolor=${Colors.ACTIVE_STATE}]\n`;

        let next = automata.getStatesBySourceAndLabel(currentState, symbol);

        lambda = automata.getStatesBySourceAndLabel(
          currentState,
          Symbols.LAMBDA
        );

        if (lambda) {
          const array = [...lambda];

          for (const dest of array) {
            const colorizedEdgeLambda = `"${stateName}" -> "${dest.getName()}" [label=${
              Symbols.LAMBDA
            } color=${Colors.ACTIVE_EDGE}]`;

            const uncolorizedEdgeLambda = ` "${stateName}" -> "${dest.getName()}" [label=${
              Symbols.LAMBDA
            }]`;

            dotfileContent = dotfileContent.replace(
              uncolorizedEdgeLambda,
              colorizedEdgeLambda
            );
          }
        }
        let statesFromLambda = new Set<State>();

        if (next) {
          statesFromLambda = getStatesFromlambdaClosure(next, automata);
          next = new Set([...next, ...statesFromLambda]);
        }

        if (next) {
          const nextArray = [...next];

          for (const dest of nextArray) {
            let color = Colors.NORMAL;

            if (isLastSymbol) {
              const isFinal = isFinalState(dest, automata);

              if (isFinal) isWordAccepted = true;

              color = isFinal ? Colors.SUCCESS : Colors.FAILURE;
              colorized += `  "${dest.getName()}" [style=filled, fillcolor=${color}]\n`;
            }

            colorized += `  "${stateName}" -> "${dest.getName()}" [label=${symbol} color=${
              Colors.ACTIVE_EDGE
            }]`;

            const uncolorized = `  "${stateName}" -> "${dest.getName()}" [label=${symbol}]`;

            dotfileContent = dotfileContent.replace(uncolorized, colorized);
            colorized = '';
          }

          nextStates = new Set([...nextStates, ...next]);
        } else {
          dotfileContent = dotfileContent.replace('}', colorized + '}');
          hasError = true;
        }
      }

      if (hasError) {
        dotfileContent = dotfileContent.replace(
          ` error [style=filled, fillcolor=${Colors.NORMAL}]`,
          ` error [style=filled, fillcolor=${Colors.FAILURE}]`
        );
      }

      createDotfile(
        `output_${++numberOfImages}`,
        dotfilesFolderPath,
        dotfileContent
      );

      dotfileContent = standardOutput;

      currentStates = [...nextStates];

      const nextStatesFromLambda = getStatesFromlambdaClosure(
        nextStates,
        automata
      );

      if (nextStatesFromLambda) {
        currentStates = currentStates.concat([...nextStatesFromLambda]);
      }
    }

    return { isWordAccepted, hasError };
  }
}
