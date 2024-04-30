import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { FaLinkedinIn, FaLine } from "react-icons/fa";
function Footer() {
  let date = new Date();
 {/* let year = date.getFullYear(); */}
  return (
    <Container fluid className="footer">
      <Row>
        <Col className="footer-copywright">
          <h3>Designed and Developed by Wai Yan Tun Oo</h3>
        </Col>
       {/* <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} </h3>
        </Col> */}
        <Col style={{textAlign: 'right'}} className="footer-body">
          <ul className="footer-icons">
          
           <li className="social-icons">
              <a
                href="https://line.me/ti/p/vi9O3RkM46"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLine />
              </a>
            </li>
         
          
          
            <li className="social-icons">
              <a
                href="https://github.com/WaiYanTunOo/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            
            
            <li className="social-icons">
              <a
                href="https://www.facebook.com/waiyantunoo.mm"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillFacebook />
              </a>
            </li>
           
            
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/waiyantunoo/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/waiyantunoo_"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
    
      </Row>
    </Container>
  );
}

export default Footer;
