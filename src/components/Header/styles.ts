import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #007aa0;
  padding: 0;
  height: 60px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const LogoImage = styled.img`
  margin-left: 20px;
  height: 40px;
`;

export const NavTitle = styled.h1`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin: 0 auto;
  text-align: center;
`;

export const NavButtons = styled.div`
  display: flex;
  height: 100%;
`;

interface NavButtonProps {
    $active?: boolean;
}

export const NavButton = styled.button<NavButtonProps>`
  background-color: transparent;
  border: none;
  color: white;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  font-size: 14px;
  padding: 0 16px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  transition: 0.2s ease;
  border-bottom: ${({ $active }) => ($active ? '2px solid white' : '2px solid transparent')};
  border-radius: 0;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    transform: scale(0.97);
  }
`;
