import './App.css';
import React from 'react';
import RoutesGrit from './routes/routes';
import {AuthProvider} from '../src/providers/auth';

/** This is a description of the App function. */
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RoutesGrit />
      </AuthProvider>
    </div>
  );
}

export default App;
