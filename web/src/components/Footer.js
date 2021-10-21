import React from 'react'

export const Footer = () => {
    return (
        <footer className="footer-app">
        <div className="footer__item">
           <div className="contact__item">
              <a href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook"></i></a>
           </div>
           <div className="contact__item">
              <a href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram"></i></a>
           </div>
        </div>
        <div className="footer__item footer__item--copyright">
           <img className="author-rights__item footer-copyright--logo" src="../img/logo-navbar.png" alt="logo"/>
           <div className="author-rights">
              <p className="author-rights__item">&copy; Copyright © 2021. @SofkaU. </p>
              <p className="author-rights__item">All Rights Reserved</p>
           </div>
        </div>
     </footer>
    )
}
