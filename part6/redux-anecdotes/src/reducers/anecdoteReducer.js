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

export const initialise = (data) => {
  return {
    type: "INIT",
    data,
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

export const addAnecdote = (data) => {
  const obj = {
    type: "ADD_ANECDOTE",
    data,
  };

  return obj;
};

export default reducer;
