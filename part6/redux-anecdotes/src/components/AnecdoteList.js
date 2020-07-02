import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const vote = ({ id, content, votes }) => {
    // add user vote
    const object = {
      votes: votes + 1,
    };

    props.addVote(id, object);
    // user feedback message
    props.setNotification(`You voted for '${content}'`, 3);
  };

  return (
    <div>
      {props.anecdotes
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

const mapStateToProps = (state) => {
  console.log(state);
  if (!state.filter) {
    return { anecdotes: state.anecdotes };
  }

  return {
    anecdotes: state.anecdotes.filter((a) => a.content.includes(state.filter)),
  };
};

const mapDispatchToProps = {
  addVote,
  setNotification,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdotes;
