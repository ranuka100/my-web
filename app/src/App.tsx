import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutingSetup from './routes/AppRoutingSetup';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutingSetup />
      </BrowserRouter>
    </>
  );
}

export default App;
