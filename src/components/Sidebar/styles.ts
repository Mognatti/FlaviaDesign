import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { pallete } from "../../styles/GlobalStyles";
import { RiLogoutCircleLine, RiMenuFoldLine } from "react-icons/ri";
import Switch from "@mui/material/Switch";

export const SidebarContainer = styled.div<{ isLowOpacity?: boolean }>`
  position: fixed;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  top: 0;
  left: 0;
  background-color: ${pallete.lightGreen};
  width: 200px;
  height: 100%;
  z-index: 1000;
  overflow-x: hidden;
  scrollbar-width: none;
  transition: all 300ms ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5vh;
  opacity: ${(props) => (props.isLowOpacity ? "0.5" : "1")};
  &::-webkit-scrollbar {
    display: none;
  }
  &.close {
    width: 60px;
  }
`;
export const Controllers = styled.div`
  position: absolute;
  top: 26vh;
  left: 12vw;
  gap: 2vh;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 5vh;
  transition: all 300ms ease 0s;
  &.close {
    left: 1.5vw;
  }
`;
export const MaterialUISwitch = styled(Switch)``;

export const MenuIconDiv = styled.div<{ open: boolean }>`
  transition: 300ms;
  transform: ${(props) => (props.open ? "none" : "rotateY(180deg)")};
`;

export const MenuIcon = styled(RiMenuFoldLine)`
  cursor: pointer;
`;

export const SidebarList = styled.ul`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Icon = styled.i`
  min-width: calc(60px - ((4px + 6px) * 2));
  display: flex;
  justify-content: center;
`;

export const SidebarLink = styled(NavLink)<{
  active?: boolean;
  close?: boolean;
}>`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  width: ${(props) => (props.close ? "calc(48px - (4px*2))" : "100%")};
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 48px;
  font-size: 16px;
  white-space: nowrap;
  overflow-x: hidden;
  transition: all 300ms ease;
  color: black;
`;

export const SidebarItem = styled.li<{ active?: boolean }>`
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  height: 48px;
  background: ${(props) => (props.active ? pallete.white : "transparent")};
  margin-left: 6px;
  border-radius: 48px 0 0 48px;
  padding: 4px;
  display: flex;
  align-items: center;
  opacity: 0.8;
  transition: all 300ms ease;
`;

export const Button = styled.button`
  color: #d32f2f;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 16px;
`;

export const LogoutIcon = styled(RiLogoutCircleLine)`
  color: #d32f2f;
`;
