import {Alert, Box, Snackbar, Typography} from '@mui/material';
import type {AlignmentResult} from "../types/types";
import {useState} from "react";
import {AMINO_ACID_COLORS} from "../constants/amino-acids.constants";

export const AlignmentVisualization = ({sequence1, sequence2}: AlignmentResult) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setOpenSnackbar(true);
      setTimeout(() => setOpenSnackbar(false), 1000);
    });
  };

  const renderSequence = (sequence: string, isTop: boolean) => {
    return (
      <Box
        component="pre"
        sx={{
          fontFamily: 'monospace',
          fontSize: {xs: '14px', sm: '18px'},
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          margin: 0,
          backgroundColor: 'transparent',
          userSelect: 'text',
          cursor: 'pointer',
          '&:active': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)'
          }
        }}
        onClick={() => {
          const selection = window.getSelection();
          if (selection && selection.toString().length > 0) {
            handleCopy(selection.toString());
          }
        }}
      >
        {sequence.split('').map((char, index) => (
          <span
            key={`${isTop ? 'top' : 'bottom'}-${index}`}
            style={{
              backgroundColor: isTop
                ? AMINO_ACID_COLORS[char.toUpperCase()]
                : (char !== sequence1[index] ? '#ffcccc' : 'transparent'),
              padding: '1px',
              display: 'inline-block'
            }}
          >
            {char}
          </span>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{mt: 3}}>
      <Typography variant="h6" gutterBottom sx={{fontSize: {xs: '16px', sm: '20px'}}}>
        Результат выравнивания:
      </Typography>

      {renderSequence(sequence1, true)}
      {renderSequence(sequence2, false)}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert severity="success" sx={{width: '100%'}}>
          Скопировано: {copiedText.slice(0, 10)}{copiedText.length > 10 ? '...' : ''}
        </Alert>
      </Snackbar>
    </Box>
  );
}