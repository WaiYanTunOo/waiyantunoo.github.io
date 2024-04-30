import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
   AiFillFacebook,
} from "react-icons/ai";
import { FaLinkedinIn,FaLine } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
             I am <b className="purple">25 </b> years old. I finished <b className="purple"> ACCA Part-1</b> subjects. I’m a curious person so that I can <b className="purple"> easily to adapt the
related work conditions.</b>  I’m eager to learn. <b className="purple"> An enthusiastic and driven learner, </b> I am looking to enhance my
practical knowledge in your job offer position. I enjoy overcoming challenges, and I’ve a genuine interest
in your job offer position and making organizations successful.
              <br />
             {/* <br />I am fluent in classics like
              <i>
                <b className="purple"> C++, Javascript and Go. </b>
              </i>
              <br /> 
              <br />
              My field of Interest's are building new &nbsp;
              <i>
                <b className="purple">Web Technologies and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                  Blockchain.
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              with <b className="purple">Node.js</b> and
              <i>
                <b className="purple">
                  {" "}
                  Modern Javascript Library and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js and Next.js</b>
              </i>*/}
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
               <li className="social-icons">
              <a
                href="https://line.me/ti/p/vi9O3RkM46"
                target="_blank" 
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <FaLine />
              </a>
            </li>
          
          
          
            <li className="social-icons">
              <a
                href="https://github.com/WaiYanTunOo/"
               target="_blank" 
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <AiFillGithub />
              </a>
            </li>
            
            
            <li className="social-icons">
              <a
                href="https://www.facebook.com/waiyantunoo.mm"
                target="_blank" 
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <AiFillFacebook />
              </a>
            </li>
           
            
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/waiyantunoo/"
                target="_blank" 
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/waiyantunoo_"
                target="_blank" 
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <AiFillInstagram />
              </a>
            </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
