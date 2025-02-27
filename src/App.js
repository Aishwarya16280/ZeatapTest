import React, { useState, useEffect } from 'react';
import './App.css';
// import Toolbar from './components/Toolbar';
// import FormulaBar from './components/FormulaBar';
// import Spreadsheet from './components/Spreadsheet';
// import Main from './Pages/Main';
import Chatbot from './Pages/Chatbot';

function App() {
  const [data, setData] = useState(Array(10).fill(Array(10).fill('')));
  const [formula, setFormula] = useState('');
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });

  const handleCellChange = (e, row, col) => {
    const newData = [...data];
    newData[row][col] = e.target.value;
    setData(newData);
  };

  const applyFormula = () => {
    // Apply logic for formula evaluation here
    // (e.g., SUM, AVERAGE, etc.)
  };

  return (
    <div className="App">
<Chatbot />
    </div>
  );
}

export default App;
