import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchQuestion, deleteAnswer } from '../actions/questionActions'

import { Question } from '../components/Question';
import { Answer } from '../components/Answer';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import QuestionReviewForm from '../components/QuestionReviewForm';

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  redirect,
  userId
}) => {
  const { id } = match.params
  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, redirect, id])

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return( 
    <div>  
      <Question question={question} />
      <QuestionReviewForm question={question} />
    </div>
    );
  }

  const onDelete = id => {
    swal({
       title:"Do you really want to delete the answer?",
       text:"By pressing the delete button the answer will be deleted.",
       icon:"warning",
       buttons:["Cancel", "Confirm"]
    }).then(answerDeleted => {
        if(answerDeleted) {
            dispatch(deleteAnswer(id))
            swal({
                text:"The answer has been deleted.",
                icon:"success"
            });
        }
    })
}

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} userId={userId} onDelete={onDelete}/>
    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  redirect: state.question.redirect,
  userId: state.auth.uid
})

export default connect(mapStateToProps)(SingleQuestionPage)
