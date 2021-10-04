import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const styles = {
    main: { marginBottom: 10 },
    votes: {
      fontSize: 12,
      fontStyle: 'italic'
    },
    voteButton: {
      marginRight: 7,
      fontSize: 12
    }
  }

  const vote = (anecdote) => { 
    props.voteAnecdote(anecdote.id)
    props.updateNotification(`You voted for the anecdote: ${anecdote.content}`, 3)
  }

  return (
    <>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id} style={styles.main}>
          <div>
            {anecdote.content}
          </div>
          <div style={styles.votes}>
            <button onClick={() => vote(anecdote)} style={styles.voteButton}>vote</button>
            {anecdote.votes} vote{anecdote.votes === 1 ? null : 's'}
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) > -1)
      .sort((a, b) => a.votes < b.votes ? 1 : -1)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  updateNotification
}

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedList