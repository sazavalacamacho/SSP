import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Inicio from './pages/Inicio';
import Categorias from './pages/Categorias';
import Compras from './pages/Compras';
import Productos from './pages/Productos';
import Usuarios from './pages/Usuarios';
import Niveles from './pages/Niveles';
import ProdCat from './pages/ProdCat';

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' exact element={<Inicio />}> </Route>
          <Route path='/categorias' exact element={<Categorias />}> </Route>
          <Route path='/compras' exact element={<Compras />}> </Route>
          <Route path='/productos' exact element={<Productos />}> </Route>
          <Route path='/usuarios' exact element={<Usuarios />}> </Route>
          <Route path='/niveles' exact element={<Niveles />}> </Route>
          <Route path='/prodcat' exact element={<ProdCat />}> </Route>


        </Routes>
      </Router>
    </>
  );
}

export default App;
