import React from 'react';
import { PORTFOLIO_DATA } from '../../config/data';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h4 className="footer-name">{PORTFOLIO_DATA.personal.name}</h4>
            <p className="footer-role">{PORTFOLIO_DATA.personal.role}</p>
          </div>
          
          <div className="footer-right">
            <p className="footer-copyright">© {PORTFOLIO_DATA.personal.name}</p>
            <p className="footer-tagline">Built with curiosity.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
