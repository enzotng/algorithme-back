import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Graphique from './components/graphique/Graphique';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Graphique />
      <Footer />
    </div>
  </Router>
);

export default App;