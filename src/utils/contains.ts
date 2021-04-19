import { State } from '../domain/models';

export default function contains(set: Set<State>, state: State) {
  const arrayFromSet = [...set];

  if (arrayFromSet) {
    for (const s of arrayFromSet) {
      if (state.equals(s)) {
        return true;
      }
    }
  }

  return false;
}
