import styled from "styled-components";

export const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width:100%;
  padding: 5px 0 5px 0;
  text-overflow: ellipsis;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  width: 100%;
`;

export const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  margin: 100px 0 0 0;
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

export const SubitleText = styled.div<{ isBold?: boolean }>`
  text-align: center;
  font-weight: ${(props) => (props.isBold ? "bold" : "normal")};
  font-size: 18px;
  margin: 0 5px;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
`;
