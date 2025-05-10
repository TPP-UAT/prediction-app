import styled from "styled-components";

export const Row = styled.div<{ isRight?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props) => (props.isRight ? "justify-content: flex-end;" : "justify-content: flex-start;")}
`;

export const ProbabilityDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  padding-bottom: 5px;
`;

export const Title = styled.p`
  text-align: center;
  font-weight: bold ;
  font-size: 15px;
  margin: 0 5px;
  border-right: 2px;
`;

export const Percentage = styled.span<{ probability: number }>`
  color: ${(props) => {
    if (props.probability >= 75) return '#4d9e42';
    if (props.probability >= 50) return '#ffd414';
    return '#fa6436';
  }};
  font-weight: bold;
`;
