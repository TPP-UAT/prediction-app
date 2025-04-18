import styled from "styled-components";

export const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1a1841;
  text-align: center;
  padding: 10px 20px;
  border-bottom: 2px solid #eee;
`;

export const SubitleText = styled.div<{ isBold?: boolean }>`
  text-align: center;
  font-weight: ${(props) => (props.isBold ? "bold" : "normal")};
  font-size: 18px;
  margin: 0 5px;
`;

export const Percentage = styled.span<{ probability: number }>`
  font-size: 18px;
  margin: 0 5px;
  font-weight: bold;
  color: ${(props) => {
    if (props.probability >= 75) return '#4d9e42';
    if (props.probability >= 50) return '#ffd414';
    return '#fa6436';
  }};
`;

export const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width:100%;
  padding: 5px 0 5px 0;
  text-overflow: ellipsis;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  width: 100%;
`;

export const PredictionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80%;
  margin: 0 10px;
`;

export const Arrows = styled.div`
  margin: 0 0 0 10px;
  display: flex;
`;

export const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  margin: 100px 0 0 0;
`;
