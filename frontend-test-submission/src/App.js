import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';
import { Log } from './services/logger';
import './styles/main.css';

function App() {
  Log("debug", "app", "Frontend initialized");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;