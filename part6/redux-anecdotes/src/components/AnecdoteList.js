import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) {
      return anecdotes;
    }

    return anecdotes.filter((a) => a.content.includes(filter));
  });

  const dispatch = useDispatch();

  const vote = ({ id, content, votes }) => {
    // add user vote
    const object = {
      votes: votes + 1,
    };

    dispatch(addVote(id, object));
    // user feedback message
    dispatch(setNotification(`You voted for '${content}'`, 3));
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
