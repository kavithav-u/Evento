import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

function Footer() {
  return (
    <footer className="footer py-8 bg-black">
  <Container>
    <Row>
      <Col lg="3" md="4" sm="6">
        <div className="footer__logo text-start">
          <img alt="logo" className="w-[calc(100% - 80%)] mb-2" />
          <h5 className="font-semibold text-lg mb-3">Evento</h5>
          <p className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            pariatur accusamus
          </p>
        </div>
      </Col>

      <Col lg="3" md="4" sm="6">
        <h5 className="footer__title text-lg font-semibold  text-white bg-black">Quick Links</h5>
        <ListGroup className="deliver__time-list">
        <ListGroupItem className="delivery__time-item border-0 ps-0 bg-black text-gray-700">
            <span className="font-semibold text-lg to-black ">Home</span>
          </ListGroupItem>
          <ListGroupItem className="delivery__time-item border-0 ps-0 bg-black">
            <span className="font-semibold text-lg">About Us</span>
          </ListGroupItem>
          <ListGroupItem className="delivery__time-item border-0 ps-0 bg-black text-gray-700">
            <span className="font-semibold text-lg ">Services</span>
          </ListGroupItem>
          <ListGroupItem className="delivery__time-item border-0 ps-0 bg-black text-gray-700">
            <span className="font-semibold text-lg ">Gallery</span>
          </ListGroupItem>
          
        </ListGroup>
      </Col>

      <Col lg="3" md="4" sm="6">
        <h5 className="footer__title text-lg text-gray-700 font-semibold">Contact</h5>
        <ListGroup className="deliver__time-list">
        <ListGroupItem className="delivery__time-item border-0 ps-0 bg-black text-gray-700">
            <p>Location: Bangalore</p>
          </ListGroupItem>
          <ListGroupItem className="delivery__time-item border-0 ps-0 bg-black text-gray-700">
            <span className="font-semibold text-lg">Phone: 9876543210</span>
          </ListGroupItem>
          <ListGroupItem className="delivery__time-item border-0 ps-0 bg-black text-gray-700">
            <span className="font-semibold text-lg">Email: example@gmail.com</span>
          </ListGroupItem>
        </ListGroup>
      </Col>

      <Col lg="3" md="4" sm="6">
        <h5 className="footer__title text-lg text-gray-700 font-semibold">Newsletter</h5>
        <p className="text-blue-900 text-sm">Subscribe our newsletter</p>
        <div className="newsletter flex justify-between items-center border border-blue-900 rounded p-2 cursor-pointer">
          <input type="email" placeholder="Enter your email" className="bg-transparent border-none outline-none" />
          <span className="bg-red-500 rounded p-2">
            <i className="ri-send-plane-line text-white"></i>
          </span>
        </div>
      </Col>
    </Row>

    <Row className="mt-5">
      <Col lg="6" md="6">
        <p className="copyright__text text-sm text-red-500">
          Copyright - 2022, @Evento Management. All Rights Reserved.
        </p>
      </Col>
      <Col lg="6" md="6">
        <div className="social__links flex items-center gap-4 justify-end">
          <p className="m-0 text-gray-700 text-sm">Follow: </p>
          <span>
            <a href="https://www.facebook.com">
              <i className="ri-facebook-line text-white bg-red-500 rounded-full p-1"></i>
            </a>
          </span>
          <span>
            <a href="https://github.com">
              <i className="ri-github-line text-white bg-red-500 rounded-full p-1"></i>
            </a>
          </span>
          <span>
            <a href="https://www.youtube.com">
              <i className="ri-youtube-line text-white bg-red-500 rounded-full p-1"></i>
            </a>
          </span>
          <span>
            <a href="https://www.linkedin.com">
              <i className="ri-linkedin-line text-white bg-red-500 rounded-full p-1"></i>
            </a>
          </span>
        </div>
      </Col>
    </Row>
  </Container>
</footer>
  );
}

export default Footer;