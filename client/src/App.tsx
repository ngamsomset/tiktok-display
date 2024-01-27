import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import './App.css';
import Redirect from './components/Redirect';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/redirect' element={<Redirect />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
