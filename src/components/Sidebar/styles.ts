import { breakPoints } from "./../../styles/GlobalStyles";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { pallete } from "../../styles/GlobalStyles";
import { RiMenuFoldLine } from "react-icons/ri";

export const SidebarContainer = styled.div<{ close?: boolean }>`
  position: fixed;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  background-color: ${pallete.green[500]};
  width: 100vw;
  height: 10vh;
  z-index: 999;
  overflow-x: hidden;
  scrollbar-width: none;
  transition: all 300ms ease;
  display: flex;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: ${breakPoints.tablet}) {
    top: 0;
    left: 0;
    bottom: auto;
    width: ${(props) => (props.close ? "65px" : "200px")};
    height: 100svh;
    flex-direction: column;
  }
`;

export const Controllers = styled.div<{ show?: boolean }>`
  display: ${(props) => (props.show ? "flex" : "none")};
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 5vh;
  transition: all 300ms ease 0s;
  margin: 32px -16px;
`;

export const MenuIconDiv = styled.div<{ close: boolean }>`
  cursor: pointer;
  margin: 0;
  padding: 0;
  transition: 300ms;
  transform: ${(props) => (props.close ? "none" : "rotateY(180deg)")};
`;

export const ControllSidebarIcon = styled(RiMenuFoldLine)`
  cursor: pointer;
  width: 100%;
`;

export const SidebarList = styled.ul`
  margin: 0;
  padding: 0;
  align-self: center;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 18px;
  position: relative;
  @media (min-width: ${breakPoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    height: 80%;
  }
`;

export const SidebarItem = styled.li`
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  margin-left: 6px;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  opacity: 0.8;
  transition: all 350ms ease-in-out;
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
  gap: 4px;
  display: flex;
  align-items: center;
`;

export const Icon = styled.i<{ active?: boolean }>`
  align-items: center;
  min-width: 40px;
  display: flex;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${(props) => (props.active ? pallete.gray[500] : "transparent")};
  transition: all 350ms ease-in-out;
`;
