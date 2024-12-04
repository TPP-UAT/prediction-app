import styled from "styled-components";


export const TitleContainer = styled.div`
  border-bottom: 1px solid '#DDDDDD';
  text-align: center;
  font-weight: bold ;
  font-size: 24px;
  width: 100%;
  margin: 5px 10px 30px;
`;

export const SubitleText = styled.div`
  text-align: center;
  font-weight: bold ;
  font-size: 18px;
  margin: 0 5px;
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

export const DetailsColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
  margin: 0 0 10px
`;

export const DetailsRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 70%;
`;

export const TitleRowDiv = styled.div`
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

export const TermTitle = styled.div`
  text-align: center;
  font-weight: bold ;
  font-size: 18px;
  margin: 0 5px 10px;
`;

export const TermDetailsTitle = styled.div`
  text-align: center;
  font-weight: bold ;
  font-size: 15px;
  margin: 0 5px;
`;

export const TermDetailsText = styled.div`
  text-align: center;
  font-size: 15px;
`;

export const SubtitleDetailsDiv = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 100%;
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

export const ArrowsDiv = styled.div`
  margin: 0 0 0 10px
`;