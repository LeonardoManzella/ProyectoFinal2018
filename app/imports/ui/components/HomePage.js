import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'nuka-carousel';
import Login from './login/Login';

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginDropdownOpen: false
    };
  }

  render() {
    return (
      <div>
        <main id="page-wrap">
        <nav className="landing navbar navbar-expand-lg navbar-light">
          <div className="container">
            <img src="/img/emprendimientos-logo.png" height="30"/>
            <div className="page-sections">
              <a href="#expert-system-section">SISTEMA EXPERTO</a>
              <a href="#team-section">NUESTRO EQUIPO</a>
              <a href="#clients-section">CLIENTES</a>
              <a href="#news-section">NOTICIAS</a>
              <a href="#contact-section">CONTACTO</a>
              <Login loginDropdownOpen={this.state.loginDropdownOpen}/>
            </div>
          </div>
        </nav>
          <div className="landing">
            <div className="content-body initial-section">
              <Carousel>
                <div className="table">
                  <div className="welcome-title">
                    <h1><strong>Botigo</strong></h1>
                    <p>Emprende Contigo</p>
                    <span><button className="transparent-button">Comenzar</button></span>
                  </div>
                </div>
                <img src="/img/team.jpeg" />
                <img src="/img/creative_ideas.jpg" />
              </Carousel>
            </div>
            <div id="expert-system-section" className="content-body white expert-system">
              <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-3">
                  <img src="/img/brain.svg" height="200" className="img-files" />
                </div>
                <div className="col-md-6">
                  <div className="welcome-title">
                    <h2>SISTEMA EXPERTO</h2>
                    <h4>Nuestro sistema experto te brindará ayuda para que puedas realizar tu propio emprendimiento creativo. Te otorgará información sobre distintos conceptos de negocio y te dará sugerencias basandose en tus características.</h4>
                    <span><button className="transparent-button">Ver más</button></span>
                  </div>
                </div>
              </div>
            </div>
            <div id="team-section" className="content-body gray team">
              <div className="row">
                <div className="col-md-2">
                </div>
                <div className="col-md-6">
                  <div className="welcome-title">
                    <h2>NUESTRO EQUIPO</h2>
                    <h4>El equipo se compone por consultores con conocimiento en industrias creativas, que junto con el sistema experto permitirán hacer un seguimiento del emprendimiento, además de un equipo de desarrollo.</h4>
                    <span><button className="transparent-button">Ver más</button></span>
                  </div>
                </div>
                <div className="col-md-4">
                  <img src="/img/group.svg" height="200" className="img-files" />
                </div>
              </div>
            </div>
            <div id="clients-section" className="content-body white clients">
              <div className="table">
                <div className="welcome-title">
                  <h2>NUESTROS CLIENTES</h2>
                  <div className="row">
                    <img src="/img/icon_proyecto.svg" height="200" className="landing-clients" />
                    <img src="/img/icon_proyecto.svg" height="200" className="landing-clients" />
                    <img src="/img/icon_proyecto.svg" height="200" className="landing-clients" />
                  </div>
                  <span><button className="transparent-button">Ver más</button></span>
                </div>
              </div>
            </div>
            <div id="news-section" className="content-body gray">
              <div className="table">
                <div className="welcome-title">
                  <h2>NOTICIAS</h2>
                  <span><button className="transparent-button">Ver más</button></span>
                </div>
              </div>
            </div>
            <div id="contact-section" className="content-body white">
              <div className="table">
                <div className="welcome-title">
                  <h2>Necesitás ayuda? Contactanos!</h2>
                  <h4>Estamos para ayudarte. Podes contactarnos por teléfono, mail o a través de nuestras redes sociales.</h4>
                  <span><button className="transparent-button">Ver más</button></span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

HomePage.propTypes = {
};

