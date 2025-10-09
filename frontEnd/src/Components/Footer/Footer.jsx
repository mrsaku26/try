import React from "react";
import "./Footer.css";
import {assets, footer_data} from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-mid">
        <div className="footer-logo">
         <img src={assets.logo} alt="" />
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id dolorem et similique sequi deleniti est magnam alias deserunt temporibus dicta asperiores at doloremque illo, dolorum impedit? Odio inventore iure minus!</p>
        </div>
        <div className="footer-low">
         {footer_data.map((section,index)=> (
            <div key={index} className="footer-data">
               <h3>{section.title}</h3>
               <ul>
                  {section.links.map((link, i)=>(
                     <li key={i}>
                        <a href="#">{link}</a>
                     </li>
                  ))}
               </ul>
            </div>
         ))}
        </div>
      </div>
      <hr />
      <p>Copyright 2025 @ Blog GreatStack - All Right Reserved</p>
    </div>
  );
};

export default Footer;
