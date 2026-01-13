import { useState } from 'react';
import Main from './components/Main';
import Saju from './components/Saju';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [view, setView] = useState('MAIN'); // 'MAIN', 'SAJU', 'CHAT'

  return (
    <div className="App">
      {view === 'MAIN' && <Main onSelect={setView} />}
      {view === 'SAJU' && <Saju onHome={() => setView('MAIN')} />}
      {view === 'CHAT' && <Chatbot onHome={() => setView('MAIN')} />}
    </div>
  );
}

export default App;