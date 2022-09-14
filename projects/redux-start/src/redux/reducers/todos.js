import { ADD_TODO, COMPLETE_TODO } from "../actions";

const initialState = [{ todos: [], filter: "ALL" }];
const todosInitialState = initialState.todos;

export default function todosReducer(
  previousState = todosInitialState,
  action
) {
  if (action.type === ADD_TODO) {
    return [...previousState, { text: action.text, completed: false }];
  }

  if (action.type === COMPLETE_TODO) {
    return previousState.map((todo, index) => {
      if (index === action.index) {
        return { ...todo, completed: true };
      }

      return todo;
    });
    // const newState = [];
    // for (let i = 0; i < previousState.length; i++) {
    //   newState.push(
    //     i === action.index
    //       ? { ...previousState[i], completed: true }
    //       : { ...previousState[i] },
    //   );
    // }
    // return newState;
  }

  return previousState;
}
