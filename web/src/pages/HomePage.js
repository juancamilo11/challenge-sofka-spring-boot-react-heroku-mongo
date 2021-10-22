import React from 'react';
import { Link } from 'react-router-dom';
import image from '../img/question-and-answer.png';

const HomePage = ({children}) => (
  <div class="container">
    <div className="row">  
      <section className="col-12 mt-3 home-content">
        <h1>Home</h1>
        <p>welcome to the question and answer app.</p>
        <img className="home-img" src={image} alt="Q and A home" />
        <Link to="/questions" className="button">
          View Questions
        </Link>  
      </section>
      
      <div className="btn-logout">
        {children}
      </div>
    </div>
  </div>
)
export default HomePage;
