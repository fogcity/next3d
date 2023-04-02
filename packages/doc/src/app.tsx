import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Home from './pages/home';


function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
      
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {

  const basename = '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
