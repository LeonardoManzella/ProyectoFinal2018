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
              <a href="#expert-system-section">¿COMO FUNCIONA?</a>
              <a href="#team-section">CONOCE A BOTIGO</a>
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
                    <button
                      onClick={() => this.setState({loginDropdownOpen: !this.state.loginDropdownOpen})}
                      className="transparent-button"
                    >
                      Comenzar
                    </button>
                  </div>
                </div>
                <div className="table">
                  <div className="welcome-title">
                    <h1><strong>Te ayudadamos a emprender</strong></h1>
                    <p>Con Inteligencia Artificial</p>
                    <button
                      onClick={() => this.setState({loginDropdownOpen: !this.state.loginDropdownOpen})}
                      className="transparent-button"
                    >
                      Iniciar
                    </button>
                  </div>
                </div>
                <div className="table">
                  <div className="welcome-title">
                    <h1><strong>Asistente 24/7</strong></h1>
                    <p>Botigo te acompaña como parte del equipo</p>
                    <button
                      onClick={() => this.setState({loginDropdownOpen: !this.state.loginDropdownOpen})}
                      className="transparent-button"
                    >
                      Empezar
                    </button>
                  </div>
                </div>
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
                    <h2>BOTIGO, EL ASISTENTE QUE USA INTELIGENCIA ARTIFICIAL</h2>
                    <h4>Botigo te brindará ayuda para que puedas realizar tu propio emprendimiento. Te otorgará información sobre distintos conceptos de negocio y te dará sugerencias basandose en tus características.</h4>
                    <span><button className="transparent-button">Botigo siempre contigo</button></span>
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
                    <h2>BOTIGO ES TU AMIGO, un miembro mas del equipo</h2>
                    <h4>Botigo es un asistente 24/7 para vos.</h4>
                    <span><button className="transparent-button">Vallas donde vallas Botigo estara contigo</button></span>
                  </div>
                </div>
                <div className="col-md-4">
                  <img src="/img/group.svg" height="200" className="img-files" />
                </div>
              </div>
            </div>
            <div id="contact-section" className="content-body white">
              <div className="table">
                <div className="welcome-title">
                  <h2>¿Queres saber como Botigo puede ayudarte? ¡Contactanos!</h2>
                  <h4>Tu consulta no molesta</h4>
                  <span><button className="transparent-button"><a href="mailto:botigo.contigo@gmail.com">Envia un mail a botigo.contigo@gmail.com</a></button></span>
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

