import React, {useState} from 'react'
import {useSocket} from '../Context/Context'; 
import { useNavigate } from 'react-router-dom';


const Lobby2 = () => {
  const navigate = useNavigate();
  const socket = useSocket(); 
  const [name  , setname] = useState('')
  const [room  , setroom] = useState(0)

  const handleClick = ()=>{
    socket.emit('createroom' , {name : name})
    socket.on('roomCreated' , (data)=>{
      localStorage.setItem('roomNo', data.room);
      navigate(`/room/${data.room}`)
    })
   }
  const handleChange = (e)=>{
    console.log(e.target)
    if(e.target.name == 'name'){
      setname(e.target.value)
    }
    else{
      setroom(e.target.value)
    }
  }
  return (
    <div className="bg-gradient-to-r from-violet-600 to-fuchsia-400">

        <div className="enter w-9/12  mx-auto   min-h-screen  ">
            <form action=""  className="flex justify-center w-full min-h-screen   items-center flex-col ">
                <div  className="flex justify-around  text-white  items-center my-4 mx-4  ">
                <label htmlFor="name"  className="mx-2 ">Enter Your Name </label>
                <input type="text" name="name" id="name" className="border mx-4 text-black   " value={name}  onChange={handleChange}  className="text-black "/>
                </div>
                <div className="buttons" onClick={handleClick}>
                    <button type="button"  className="py-1 px-6  border-4  bg-gradient-to-r from-purple-800 to-pink-600 text-white ">Create  </button>
                </div>
           
       
            </form>
        </div>
    </div>
  )
}
export default Lobby2 ; 