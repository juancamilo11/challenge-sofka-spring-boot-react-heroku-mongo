import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {  fetchQuestion, postAnswer } from '../actions/questionActions'
import { connect } from 'react-redux'
import { Question } from '../components/Question'
import { Input } from "../components/Input";
import swal from 'sweetalert';  

const FormPage = ({ dispatch, loading, redirect, match,hasErrors, question, userId, userEmail}) => {
    
    const [content, setContent] = useState('');
    const { id } = match.params;
    const history = useHistory();

    const validateInput = ({answer}) => {
        if(answer.length && answer.length <=500) {
            return true;
        }
        return false;
    }

    const onSubmit = e => {
        e.preventDefault();
        
        const data = {
            userId,
            userEmail,
            questionId:id,
            answer:content
        }
        if(validateInput(data)){
            swal({
                text:"The answer has been saved, an email has been sent to the person who asked the question.",
                icon:"success"
            });
            dispatch(postAnswer(data));
        }
    }

    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch, id])

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    const renderQuestion = () => {
        if (loading.question) return <p>Loading question...</p>
        if (hasErrors.question) return <p>Unable to display question.</p>

        return <Question question={question} />
    }


    return (
        <section>
            {renderQuestion()}
            <h1>New Answer</h1>

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="answer">Answer</label>
                    <Input id="answer" setContent={setContent} />
                </div>
                <button type="submit" className="button mt-2" disabled={loading} >{
                    loading ? "Saving ...." : "Save"
                }</button>
            </form>
        </section>

    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    question: state.question.question,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid,
    userEmail: state.auth.email
})

export default connect(mapStateToProps)(FormPage)