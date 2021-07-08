import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faHome,
  faListUl,
  faCog,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const Nav = styled.header`
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0px 1px 5px #b2b2b2;
  min-height: 60px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MenuLink = styled.a`
  text-decoration: none;
  color: #000;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  padding-right: 1rem;
`;

function Navbar() {
  return (
    <>
      <Nav>
        <Logo>Logo</Logo>

        <Menu>
          <MenuLink href="">
            <Icon icon={faHome} />
            Home
          </MenuLink>
          <MenuLink href="">
            <Icon icon={faListUl} />
            List
          </MenuLink>
          <MenuLink href="">
            <Icon icon={faUpload} />
            Escalation
          </MenuLink>
          <MenuLink href="">
            <Icon icon={faCog} />
            Settings
          </MenuLink>
          <MenuLink href="">
            <Icon icon={faUserCircle} />
            Accounts
          </MenuLink>
        </Menu>
      </Nav>
    </>
  );
}

export default Navbar;
