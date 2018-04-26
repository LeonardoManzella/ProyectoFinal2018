import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { TAPi18n } from 'meteor/tap:i18n';

export default class SharedDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFilter: ''
    };
  }

  componentWillReceiveProps() {
    this.setState({searchFilter: ''});
  }

  handleInputChange(event) {
    this.setState({ searchFilter: event.target.value});
  }

  renderOptionName(option) {
    if (this.props.dropdown === 'dropdownOpen') {
      return option.name;
    }
    return option.personalInformation.name;
  }

  contains(option, searchFilter) {
    return option.indexOf(searchFilter) !== -1;
  }

  getFilteredList(optionsList) {
    return (
      optionsList.filter((option) => {
        let optionName = '';
        if (this.renderOptionName(option)) {
          optionName = this.renderOptionName(option);
        }
        return this.contains(optionName.toLowerCase(),
          this.state.searchFilter.toLowerCase());
      })
    );
  }

  renderActionItem() {
    if (!this.props.actionName) {
      return '';
    }
    return (
      <div id={ 'createNew' + this.props.dropdown} className="dropdown-item search-item" name={this.props.dropdown}
        onClick={() => {
          this.props.changeModalStatus(this.props.modal);
          this.props.toggle(this.props.dropdown);
        }}>
        <a>
          <img src="/img/plus.svg" height="25" className="avatar-search" />
          <p className="search-text">{this.props.actionName}</p>
        </a>
      </div>
    );
  }

  render() {
    let optionsList = [];
    if (this.props.optionsList) {
      optionsList = this.props.optionsList;
    }
    return (
      <Dropdown isOpen={this.props.dropdownOpen} toggle={() => this.props.toggle(this.props.dropdown)}
        size="sm" id={this.props.dropdown}>
        <DropdownToggle caret className={this.props.dropdown}>
          {this.props.dropdownName ? this.props.dropdownName : 'Seleccionar'}
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-list">
          {this.renderActionItem()}
          <div className="dropdown-item search-item">
            <img src="/img/search.svg" height="25" className="avatar-search" />
            <input className="form-control form-sm search-usuarios" type="text"
              placeholder="Buscar..." onChange={this.handleInputChange.bind(this)} />
          </div>
          <DropdownItem divider/>
          {this.getFilteredList(optionsList).map((option, index) => (
            <div
              onClick={() => this.props.action(option, index)}
              className="dropdown-item" key={index}>
              <a>
                <p name={this.renderOptionName(option)} id={option._id}>
                  <img src="/img/avatar.png" height="25" className="avatar-jefe"/>
                  {this.renderOptionName(option)}
                </p>
              </a>
            </div>
          ))
          }
          {this.getFilteredList(optionsList).length === 0 ? (
            <div className="dropdown-item search-item">
              <p>{TAPi18n.__('noData.noResults')}</p>
            </div>
          ) : ''}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

SharedDropdown.propTypes = {
  dropdownOpen: PropTypes.bool,
  dropdownName: PropTypes.string,
  dropdown: PropTypes.string,
  toggle: PropTypes.func,
  changeModalStatus: PropTypes.func,
  modal: PropTypes.string,
  selectDropdownOption: PropTypes.func,
  optionsList: PropTypes.array,
  actionName: PropTypes.string,
  action: PropTypes.func
};

