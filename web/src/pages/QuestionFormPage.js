/**
 * {type: 'WITH RESULT (OPEN BOX WITH LINK)', category: 'SCIENCES', question: 'Prueba de nueva pregunta', userId: 'Voy3keopU7erdhopAMU795jfLHx1'}
category: "SCIENCES"
question: "Prueba de nueva pregunta"
type: "WITH RESULT (OPEN BOX WITH LINK)"
userId: "Voy3keopU7erdhopAMU795jfLHx1"
[[Prototype]]: Object
 */

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { postQuestion } from '../actions/questionActions'
import { connect } from 'react-redux'

const FormPage = ({ dispatch, loading, redirect, userId }) => {
    
    const [contentForm, setContentForm] = useState({
        category:''
    });
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    // const validateInput = ({question}) => {
    //     if(question.length && answer.length <=300) {
    //         return true;
    //     }
    //     return false;
    // }

    const onSubmit = data => {
        data.userId = userId;
        console.log(data);
        dispatch(postQuestion(data));
    };

    /** 
     * const validateInput = ({answer}) => {
        if(answer.length && answer.length <=300) {
            return true;
        }
        return false;
    }

    const onSubmit = e => {
        e.preventDefault()
        
        const data = {
            userId,
            questionId:id,
            answer:content
        }
        validateInput(data) && dispatch(postAnswer(data));
    }
    */

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    return (
        <section>
            <h1>New Question</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label for="type">Type</label>
                    <select {...register("type")} id="">
                        <option value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
                        <option value="OPINION (SHORT OPEN BOX)">OPINION (SHORT OPEN BOX)</option>
                        <option value="WITH RESULT (OPEN BOX WITH LINK)">WITH RESULT (OPEN BOX WITH LINK)</option>
                        <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">WITH EVIDENCE (OPEN BOX WITH VIDEO)</option>
                    </select>
                </div>
                <div>
                    <label for="category">Category</label>
                    <select {...register("category")} id="category">
                        <option value="TECHNOLOGY AND COMPUTER">TECHNOLOGY AND COMPUTER</option>
                        <option value="SCIENCES">SCIENCES</option>
                        <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                        <option value="SOCIAL SCIENCES">SOCIAL SCIENCES</option>
                        <option value="LANGUAGE">LANGUAGE</option>

                    </select>
                </div>

                <div>
                    <label for="question">Question</label>
                    <textarea id="question" {...register("question", { required: true, maxLength: 300 })} />
                    {/* <Input id="question" setContent={setContent} /> */}
                </div>
                <button type="submit" className="button" disabled={loading} >{
                    loading ? "Saving ...." : "Save"
                }</button>
            </form>
        </section>

    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid
})

export default connect(mapStateToProps)(FormPage)