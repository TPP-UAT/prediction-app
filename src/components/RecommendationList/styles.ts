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
  padding-top: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RecommendationCard = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #f9f9f9;
  padding: 16px 24px;
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

export const ArticleTitle = styled.a`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

export const KeywordRow = styled(Row)`
  margin: 4px 0;
  font-size: 14px;
  color: #555;

  b {
    margin-right: 4px;
    color: #333;
  }
`;

export const KeywordList = styled.span`
  font-style: italic;
  color: #444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 800px;
  display: inline-block;
  vertical-align: bottom;
`;
