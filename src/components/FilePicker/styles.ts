import styled from "styled-components";

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  width: 100%;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    font-size: 18px;
    color: #1a1841;
  }

  input[type="file"] {
    font-size: 16px;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 8px;
    width: 100%;
    background: #f9f9f9;
    cursor: pointer;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 10px 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Button = styled.button<{ fullwidth?: boolean }>`
  background-color: ${({ fullwidth }) => (fullwidth ? '#005f80' : '#007aa0')};
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  padding: 14px 24px;
  margin-top: 10px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ fullwidth }) => (fullwidth ? '0 6px 20px rgba(0, 95, 128, 0.3)' : '0 4px 14px rgba(0, 122, 160, 0.25)')};
  width: ${({ fullwidth }) => (fullwidth ? '100%' : 'auto')};
  text-align: center;

  &:hover {
    background-color: ${({ fullwidth }) => (fullwidth ? '#004a66' : '#005f80')};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const FileName = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  text-align: center;
  max-width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
