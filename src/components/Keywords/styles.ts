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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  color:#2c3e50;
  margin: 30px 5px 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  border-bottom: 2px solid #007aa0;
  padding-bottom: 5px;
`;

export const DetailsColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
  margin: 0 0 10px;
`;

export const KeywordsDetails = styled.p`
  text-align: left;
  font-weight: bold ;
  font-size: 15px;
  margin: 0;
  border-right: 2px;
`;
