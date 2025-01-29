import styled from "styled-components";
import { Sync } from "@mui/icons-material";

export const TitleContainer = styled.div`
  border-bottom: 2px solid #cccccc;
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: #1a1841;
  width: 100%;
  margin: 10px 0 30px;
  padding-bottom: 10px;
  letter-spacing: 1px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  width: 100%;
  align-items: baseline;
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

export const TermDetailsTitle = styled.p`
  text-align: center;
  font-weight: bold ;
  font-size: 15px;
  margin: 0 5px;
  border-right: 2px;
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

export const HeaderDiv = styled.div`
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

export const ProbabilityText = styled.span<{ probability: number }>`
  color: ${(props) => {
    if (props.probability > 90) return '#43a93e';
    if (props.probability >= 50) return '#cbb23a';
    return '#cb4444';
  }};
  font-weight: bold;
`;

export const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  margin: 100px 0 0 0;
`;

export const TitleActualKeywords = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  color: #2c3e50;
  margin: 30px 5px 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  border-bottom: 2px solid #007aa0;
  padding-bottom: 5px;
`;

export const KeywordsDetails = styled.p`
  text-align: left;
  font-weight: bold ;
  font-size: 15px;
  margin: 0 0 10px;
  border-right: 2px;
`;