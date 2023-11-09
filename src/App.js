import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './pages/Nav'
import Home from './pages/Home'
import TTT from './pages/TicTacToe'
import APITest from './pages/APITest'
import NOPAGE from './pages/NoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav/>} >

          <Route index element={<Home/>}></Route>

          <Route path="/ttt" element={<TTT/>}></Route>

          <Route path="/apitest" element={<APITest/>}></Route>

          <Route path="*" element={<NOPAGE/>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>);
}

export default App;
