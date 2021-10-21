import React from 'react';
import {Link} from 'react-router-dom';

export const Footer = () => {
    return (
        <div className="footer-basic">
            <footer>
                <div class="social">
                    <a href="#">
                        <i class="fab fa-facebook"></i>
                    </a> 
                    <a href="#">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="#">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
                <p className="copyright">SofkaU © 2021</p>
            </footer>
        </div>
    )
}
