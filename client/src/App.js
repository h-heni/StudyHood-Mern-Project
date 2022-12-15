import './App.css';
import Login from './components/views/Login';
import React, { useState } from "react";
import  Register  from './components/views/Register';
import { Routes,Route } from 'react-router-dom';
import HomePage from './components/views/HomePage';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));


  
  return (
    <div className="app">
       <ThemeProvider theme={theme}>
          <CssBaseline />
      <Routes>
        
      <Route path='/home' element={isAuth ?<HomePage/> : <div className="App"><Login/></div> }/>
      </Routes>
      </ThemeProvider>
      <div className="App">

      <Routes>

      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Routes>
      </div>
      
      </div>
  );
}




export default App;