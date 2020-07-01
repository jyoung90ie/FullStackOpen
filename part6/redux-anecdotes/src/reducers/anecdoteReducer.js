import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find((a) => a.id === id);

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      );
    case "ADD_ANECDOTE":
      const anecdote = action.data;

      return [...state, anecdote];
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export const initialise = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();

    return dispatch({
      type: "INIT",
      data: anecdotes,
    });
  };
};

export const addVote = (id) => {
  return {
    type: "VOTE",
    data: {
      id,
    },
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);

    return dispatch({
      type: "ADD_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export default reducer;
