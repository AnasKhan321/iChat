import React, {useState} from 'react'
import {useSocket} from '../Context/Context'; 
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
  const [name , setname] = useState(''); 
  const [roomNo , setroomNo] = useState(0);
  const navigate = useNavigate();
  const socket = useSocket()
  const handleChange = (e)=>{
    console.log(e.target)
    if(e.target.name == 'name'){
      setname(e.target.value)
    }
    else{
      setroomNo(e.target.value)
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault(); 
    console.log(name , roomNo )
    socket.emit('joinroom' , {name : name , room : roomNo})
    navigate(`/room/${roomNo}`)
    
  }
  const handleClick = ()=>{
    console.log('this is here ')
  }
  return (
    <div className="bg-gradient-to-r from-violet-600 to-fuchsia-400">

        <div className="enter w-9/12  mx-auto   min-h-screen  ">
            <form action=""  onSubmit={handleSubmit}  className="flex justify-center w-full min-h-screen   items-center flex-col ">
                <div  className="flex justify-center text-white  items-center my-4 ">
                <label htmlFor="name">Enter Your Name </label>
                <input type="text" name="name" id="name" className="border mx-4  " onChange={handleChange}/>
                </div>
                <div className="flex justify-center items-center text-white    my-4 ">
                <label htmlFor="room">Enter the Room No  </label>
                <input type="number" name="room" id="room" className="border  mx-4 text-black   " onChange={handleChange} />
                </div>
                <div className="buttons">
                    <button  onClick={handleClick} type="submit"  className="py-1 px-6  border-4  bg-gradient-to-r from-purple-800 to-pink-600 text-white ">Join </button>
                </div>
           
       
            </form>
        </div>
    </div>
  )
}
export default Lobby ; 