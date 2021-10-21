import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { postQuestion } from '../actions/questionActions'
import { connect } from 'react-redux'
import {Input} from '../components/Input'

const FormPage = ({ dispatch, loading, redirect, userId }) => {
    
    const [formState, setformState] = useState({
        type:'',
        category:''
    })
    const [content, setContent] = useState('');
    const history = useHistory();

    const validateInput = ({question}) => {
        if(question.length && question.length <=500) {
            return true;
        }
        return false;
    }

    // const onSubmit = data => {
    //     data.userId = userId;
    //     dispatch(postQuestion(data));
    // };
  
    const onSubmit = e => {
        e.preventDefault();
        
        const data = {...formState,
            userId,
            question:content
        }
        console.log(data);
        validateInput(data) && dispatch(postQuestion(data));
    }

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    const handleInputTypeChange = ({target}) => {
        setformState({...formState, type:target.value});
    }

    const handleInputCategoryChange = ({target}) => {
        setformState({...formState, category:target.value});
    }

    return (
        <section>
            <h1>New Question</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label value={0} htmlFor="type">Type</label>
                    <select onChange={handleInputTypeChange} id="type">
                        <option defaultValue value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
                        <option value="OPINION (SHORT OPEN BOX)">OPINION (SHORT OPEN BOX)</option>
                        <option value="WITH RESULT (OPEN BOX WITH LINK)">WITH RESULT (OPEN BOX WITH LINK)</option>
                        <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">WITH EVIDENCE (OPEN BOX WITH VIDEO)</option>
                    </select>
                </div>
                <div>
                    <label value={0} htmlFor="category">Category</label>
                    <select onChange={handleInputCategoryChange} id="category">
                        <option defaultValue value="TECHNOLOGY AND COMPUTER">TECHNOLOGY AND COMPUTER</option>
                        <option value="SCIENCES">SCIENCES</option>
                        <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                        <option value="SOCIAL SCIENCES">SOCIAL SCIENCES</option>
                        <option value="LANGUAGE">LANGUAGE</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="question">Question</label>
                    <Input id="question" setContent={setContent}/>
                    {/* <textarea id="question" {...register("question", { required: true, maxLength: 300 })} /> */}
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


// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
// import { postQuestion } from '../actions/questionActions'
// import { connect } from 'react-redux'

// const FormPage = ({ dispatch, loading, redirect, userId }) => {
//     const { register, handleSubmit } = useForm();
//     const history = useHistory();

//     const onSubmit = data => {
//         data.userId = userId;
//         //console.log(data);
//         dispatch(postQuestion(data));
//     };

//     useEffect(() => {
//         if (redirect) {
//             history.push(redirect);
//         }
//     }, [redirect, history])

//     return (
//         <section>
//             <h1>New Question</h1>

//             <form onSubmit={handleSubmit(onSubmit)}>

//                 <div>
//                     <label for="type">Type</label>
//                     <select {...register("type")} id="">
//                         <option value="OPEN (LONG OPEN BOX)">OPEN (LONG OPEN BOX)</option>
//                         <option value="OPINION (SHORT OPEN BOX)">OPINION (SHORT OPEN BOX)</option>
//                         <option value="WITH RESULT (OPEN BOX WITH LINK)">WITH RESULT (OPEN BOX WITH LINK)</option>
//                         <option value="WITH EVIDENCE (OPEN BOX WITH VIDEO)">WITH EVIDENCE (OPEN BOX WITH VIDEO)</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label for="category">Category</label>
//                     <select {...register("category")} id="category">
//                         <option value="TECHNOLOGY AND COMPUTER">TECHNOLOGY AND COMPUTER</option>
//                         <option value="SCIENCES">SCIENCES</option>
//                         <option value="SOFTWARE DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
//                         <option value="SOCIAL SCIENCES">SOCIAL SCIENCES</option>
//                         <option value="LANGUAGE">LANGUAGE</option>

//                     </select>
//                 </div>

//                 <div>
//                     <label for="question">Question</label>
//                     <textarea id="question" {...register("question", { required: true, maxLength: 300 })} />
//                 </div>
//                 <button type="submit" className="button" disabled={loading} >{
//                     loading ? "Saving ...." : "Save"
//                 }</button>
//             </form>
//         </section>

//     );
// }

// const mapStateToProps = state => ({
//     loading: state.question.loading,
//     redirect: state.question.redirect,
//     hasErrors: state.question.hasErrors,
//     userId: state.auth.uid
// })

// export default connect(mapStateToProps)(FormPage)