import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';

class SwotElements extends React.Component {

  addSwotButton(swotElement) {
    return (
      <Dropdown isOpen={this.props.dropdownsOpen[swotElement]}
        toggle={() => this.props.toggle(swotElement)}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={this.props.dropdownsOpen[swotElement]}
        >
          <a className="icon">
            <img src="/img/add.svg" />
          </a>
        </DropdownToggle>
        <DropdownMenu>
          <div>
            <input
              className='dropdown-input'
              placeholder="Ej: Perseverante"
              onChange={this.props.handleSwotInputChange}/>
          </div>
          <div className="dropdown-row">
            <button onClick={() => this.props.addSwotElement(swotElement)}>Agregar</button>
            <button onClick={() => this.props.toggle(swotElement)}>Cancelar</button>
          </div>
        </DropdownMenu>
      </Dropdown>
    );
  }

  renderSwotElement(swotElement, classname) {
    return (
      <div className={"col-md-5 section " + classname}>
        {
          this.props.swot[swotElement].map((element, index) => (
            <div key={index} className="row swot-element">
              <p key={index}>{element}</p>
              <a className="icon" onClick={() => this.props.removeSwotElement(swotElement, index)}>
                <img src="/img/rubbish-bin-gray.svg" />
              </a>
            </div>
          ))
        }
        <div className="actions">
          {this.addSwotButton(swotElement)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="swot">
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-5">
            <h4> POSITIVO </h4>
          </div>
          <div className="col-md-5">
            <h4> NEGATIVO </h4>
          </div>
        </div>
        <div className="row row-data">
          <div className="col-md-2">
            <h4> INTERNO </h4>
          </div>
          {this.renderSwotElement('strengths', 'strength')}
          {this.renderSwotElement('weaknesses', 'weakness')}
        </div>
        <div className="row row-data">
          <div className="col-md-2">
            <h4> EXTERNO </h4>
          </div>
          {this.renderSwotElement('opportunities', 'opportunity')}
          {this.renderSwotElement('threats', 'threat')}
        </div>
      </div>
    );
  }
}

SwotElements.propTypes = {
  swot: PropTypes.object,
  toggle: PropTypes.func,
  addSwotElement: PropTypes.func,
  removeSwotElement: PropTypes.func,
  handleSwotInputChange: PropTypes.func,
  dropdownsOpen: PropTypes.object
};

export default SwotElements;