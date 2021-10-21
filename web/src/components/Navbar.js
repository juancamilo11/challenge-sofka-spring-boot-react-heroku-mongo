import React from 'react'
import { Link } from 'react-router-dom'
import favicon from '../img/favicon.ico'

export const PublicNavbar = () => (
  <nav>
      <img className="img-icon" src={favicon} alt="Icon" />
    <section>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/login">Login</Link>
    </section>
  </nav>
 
)

export const PrivateNavbar = () => (
  <nav>
    <section>
      <Link className="navbar-logo" to="/"><img src={favicon} alt="icon" /></Link>
      <Link to="/">Home</Link>
      <Link to="/questions">Questions</Link>
      <Link to="/new">New</Link>
      <Link to="/list">List</Link>
    </section>
  </nav>
)
