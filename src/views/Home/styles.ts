import styled from "styled-components";

export const Title = styled.div`
  border-bottom: 2px solid #cccccc;
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: #1a1841;
  width: 100%;
  margin: 10px 0 30px;
  padding-bottom: 10px;
  letter-spacing: 1px;
  background-color:rgb(255, 255, 255);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  color: ${(props) => {
    if (props.probability >= 80) return '#4d9e42';
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

export const FormContainer = styled.div`
  width:50%;
  padding: 30px 10px;
  text-overflow: ellipsis;
  margin: 0 auto;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const PredictionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80%;
  margin: 20px 10px;
`;

export const Button = styled.button`
  padding: 7px 15px;
  font-size: 15px;
  border: none;
  font-weight: bold ;
  border-radius: 8px;
  margin: 15px 0 0 0;
  cursor: pointer;
  background-color: '#101AEC';
  color: '#FFFFFF';

  &:hover {
    background-color: '#871e79';
  }
;`

export const Arrows = styled.div`
  margin: 0 0 0 10px;
  display: flex;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #007aa0;
`;

export const LogoImage = styled.img`
  width: 300px;
  height: auto;
  margin: 10px;
`;

export const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  margin: 100px 0 0 0;
`;
