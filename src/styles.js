import styled from 'styled-components';
import { TableContainer, TableCell, Button, Table } from '@mui/material';

export const CustomTableContainer = styled(TableContainer)`
  max-width: 100%;
  max-height: 37vh;
  overflow-y: auto;
  background-color: #fafafa;
`;

export const CustomUrlCell = styled(TableCell)`
  text-decoration: underline;
  &&:hover {
    font-weight: bold;
    cursor: pointer;
  }
`;

export const CustomColumnHeaderCell = styled(TableCell)`
  && {
    font-size: 20px;
  }
`;

export const RunTestButton = styled(Button)`
  && {
    background-color: rgba(71, 141, 180, 0.8);
    color: #fafafa;
    font-size: 20px;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: rgba(71, 141, 180, 1);
    }
  }
`;

export const FullHistoryButton = styled(Button)`
  && {
    background-color: rgba(50, 50, 50, 0.8);
    color: #fafafa;
    font-size: 20px;
    transition: background-color 0.3s ease-in-out;
    margin-right: 10px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
`;

export const MostRecentHistoryButton = styled(Button)`
  && {
    background-color: rgba(186, 147, 216, 0.8);
    color: #fafafa;
    font-size: 20px;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: rgba(128, 79, 162, 0.8);
    }
  }
`;

export const CustomResultTableContainer = styled.div`
  && {
    background-color: #fafafa;
  }
`;

export const CustomResultsContainer = styled(Table)`
  && {
    background-color: #fafafa;
  }
`;

export const PageItemsContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const LightGreyButton = styled(Button)`
  && {
    background-color: rgba(220, 220, 220, 0.8);
    color: #333;
    font-size: 20px;
    transition: background-color 0.3s ease-in-out;
    margin-right: 10px;
    width: 400px;
    &:hover {
      background-color: rgba(200, 200, 200, 0.8);
    }
  }
`;

export const NewEntryContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const NewEntryElements = styled.div`
  && {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 400px;
  }
`;

export const CustomTooltip = styled.div`
  && {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 16px;
  }
`;