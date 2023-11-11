import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom'; 
import Lobby from './Components/Lobby.js'; 
import Lobby2 from './Components/Lobby2.js'; 
import Room from './Components/Room.js'; 
import Home from './Components/Home.js'
function App() {
  return (
    <div> 


      <BrowserRouter>
          <Routes>
              <Route exact path='/createroom' element={<Lobby2/>} />
              <Route exact path='/joinroom' element={<Lobby/>} />
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/room/:id' element={<Room/>} />
          </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App;
