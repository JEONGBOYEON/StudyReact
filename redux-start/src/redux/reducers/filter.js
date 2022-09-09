import { SHOW_COMPLATE, SHOW_ALL } from "../actions";

const initialState = [{ todos: [], filter: "ALL" }];
const filterInitialState = initialState.filter;

export default function filterReducer(
  previousState = filterInitialState,
  action
) {
  if (action.type === SHOW_COMPLATE) {
    return { ...previousState, filter: "Complate" };
  }

  if (action.type === SHOW_ALL) {
    return { ...previousState, filter: "ALL" };
  }

  return previousState;
}
