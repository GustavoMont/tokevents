import React from 'react';
import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Rotas from './routes'
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <>
    <AuthProvider>
      <Rotas />
    </AuthProvider>
    </>
  )
}

export default App;
