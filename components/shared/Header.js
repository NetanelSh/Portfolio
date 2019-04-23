import React from 'react';
import Link from 'next/link';

import auth0 from '../../services/auth0';
import ActiveLink from '../ActiveLink';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";

const BsNavLink = (props) => {

    const { route, title } = props;
    const className = props.className || "";

    return (
      <ActiveLink activeClassName='active' route={route}>
        <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
      </ActiveLink>
    );
}

const Login = () => {
    return (
        <span onClick={auth0.login} className="nav-link port-navbar-link clickable"> Login </span>
    )
}
const Logout = () => {
    return (
        <span onClick={auth0.logout} className="nav-link port-navbar-link clickable"> Logout </span>
    )
}

class Header extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
        dropdownOpen: false
      };
      this.toggle = this.toggle.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
    }
    toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      });
    }

    toggleDropdown() {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    renderBlogMenu() {
      const { isSiteOwner } = this.props;

      if (isSiteOwner) {
        return (
          <Dropdown className="port-navbar-link port-dropdown-menu" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle className="port-dropdown-toggle" nav caret>
              Blog
          </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <BsNavLink className="port-dropdown-item" route="/blogs" title="Blogs" />
              </DropdownItem>
              <DropdownItem>
                <BsNavLink className="port-dropdown-item" route="/blogs/new" title="Create A Blog" />
              </DropdownItem>
              <DropdownItem>
                <BsNavLink className="port-dropdown-item" route="/blogs/dashboard" title="Blogs Dashboard" />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      }

      return (
        <BsNavLink route="/blogs" title="Blog" />
      )
    }

    render() {

        const { isAuthenticated, user, className } = this.props;
        const { isOpen } = this.state;

        const menuOpenClass = isOpen ? 'menu-open' : 'menu-close';

        return (
          <Navbar
            className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`}
            color="transparent"
            dark
            expand="md"
          >
            <NavbarBrand className="port-navbar-brand" href="/">
              Netanel Sheinbin
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/" title="Home" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/about" title="About" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/portfolios" title="Portfolio" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/works" title="Work" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  { this.renderBlogMenu() }
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink route="/cv" title="Cv" />
                </NavItem>
                <NavItem className="port-navbar-item">
                  <BsNavLink
                    route="https://github.com/NetanelSh/"
                    title="github"
                  />
                </NavItem>
                {!isAuthenticated && (
                  <NavItem className="port-navbar-item">
                    <Login />
                  </NavItem>
                )}
                {isAuthenticated && (
                  <NavItem className="port-navbar-item">
                    <Logout />
                  </NavItem>
                )}
              </Nav>
            </Collapse>
          </Navbar>
        );
    }
}

export default Header;