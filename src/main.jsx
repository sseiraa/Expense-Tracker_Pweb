import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Pengeluaran from './Pengeluaran.jsx';
import Laporan from './Laporan.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pengeluaran" element={<Pengeluaran />} />
        <Route path="/laporan" element={<Laporan />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
