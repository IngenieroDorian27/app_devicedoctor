
import './App.css';

import Ventanalogin from './components/Ventanalogin';
import Ventanainforme from './components/Ventanainforme';
import Ventanaregistro from './components/Ventanaregistro';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Ventanalogin />}/>
        <Route path='/ventanaregistro/' element={<Ventanaregistro />} />
        <Route path="/ventanainforme/:idUsuario/:nombreUsuario/:marcaTelUsuario/:requerimientoUsuario/:estadoEquipoUsuario/:accesoriosUsuario/:pagoUsuario/" element={<Ventanainforme />}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
