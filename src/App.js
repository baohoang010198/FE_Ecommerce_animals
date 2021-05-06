import React from 'react';
import { BrowserRouter as Router,  } from 'react-router-dom';
import Header from './components/header/Header';
import MainPages from './components/mainpage/Page';
import { DataProvider } from "./GlobalState";


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <MainPages/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
