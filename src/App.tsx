import {useState} from 'react'
import './App.css'
import {SequenceForm} from './components/SequenceForm';
import {AlignmentVisualization} from './components/AlignmentVisualization';
import type {AlignmentResult} from "./types/types";
import {Container, CssBaseline} from '@mui/material';

function App() {
  const [result, setResult] = useState<AlignmentResult | null>(null);

  const handleSubmit = (data: AlignmentResult) => {
    setResult(data);
  };
  return (
    <Container
      sx={{
        maxWidth: '100%',
        px: {xs: 1, sm: 2},
        overflowX: 'auto'
      }}>
      <CssBaseline/>
      <h1 style={{color: '#C4C4C5'}}>Аминокислотное выравнивание</h1>
      <SequenceForm onSubmit={handleSubmit}/>
      {result && <AlignmentVisualization {...result} />}
    </Container>
  )
}

export default App
