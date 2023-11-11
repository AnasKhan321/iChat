import React ,{useContext , useState , useEffect }  from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from '../Context/Context';
import {useSocket} from '../Context/Context'; 

const Home = () => {
  return (
    <div  className="bg-gradient-to-r from-violet-600 to-fuchsia-400 min-h-screen " >
        <h1 className='text-center text-white py-4 text-2xl ' >Welcome to iChat</h1>
        <div className="buttons flex justify-center items-center flex-col  ">
            <button className='py-1 px-4  bg-gradient-to-r from-fuchsia-400 to-violet-600 border text-white my-2  ' > <Link to='/joinroom'> Join a Room  </Link>  </button>
            <button  className="py-1 px-4  bg-gradient-to-r from-fuchsia-400 to-violet-600 border text-white my-2 "> <Link to='/createroom'> Create a Room
            </Link> </button>
        </div>
    </div>
  )
}

export default Home