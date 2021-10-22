import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { fetchQuestions } from '../actions/questionActions'
import { Question } from '../components/Question'
import { Link } from 'react-router-dom'

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {
    
    
    const [search, setSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    
    const questionFilteredCategory = questions.filter(question => question
            .category.toUpperCase().includes(categorySearch.toUpperCase()));

    const questionFilteredSearch = questionFilteredCategory.filter(question => question
            .question.toUpperCase().includes(search.toUpperCase()));

    const goToVariable = questionFilteredSearch[0]?.id;

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    
    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])
    
    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questionFilteredSearch.map(question => <Question key={question.id} 
                setcategorySearch={setCategorySearch}
                question={question} excerpt />)
    }

    return (
        <section className="">
            <h1 className="text-center mt-3 mb-3">Questions</h1>
            <form>
                <input type="text" onChange={handleSearch} />
                <Link to={`/question/${goToVariable}`}>
                    <input style={{style: 'none'}} type="submit" value="search" />
                </Link>    
            </form>
            {renderQuestions()}
        </section>
    )
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    questions: state.question.questions,
    hasErrors: state.question.hasErrors,
})

export default connect(mapStateToProps)(QuestionsPage)
