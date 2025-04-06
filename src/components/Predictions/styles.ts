import styled from "styled-components";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width:100%;
  padding: 5px 0 5px 0;
  text-overflow: ellipsis;
`;

export const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  color: #2c3e50;
  margin: 0 5px 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  border-bottom: 2px solid #007aa0;
  padding-bottom: 5px;
`;
