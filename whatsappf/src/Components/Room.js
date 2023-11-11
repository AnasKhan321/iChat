import React, {useState  , useEffect} from 'react'
import {useSocket} from '../Context/Context'; 
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Room = () => {
  const { id } = useParams();
  const socket = useSocket(); 
  const [message, setmessage] = useState('')
  const [RoomNo, setRoomNo] = useState(0)
  const createElementt = (name)=>{
    let p = document.getElementById('messages'); 
    let ele = document.createElement('div')
    ele.innerHTML = `${name} joined the chat `; 
    ele.className = 'text-green-600  px-4 py-1  bg-stone-200  w-2/6  border my-2   ';
    p.appendChild(ele)
  }
  const createElement2 = (name)=>{
    let p = document.getElementById('messages'); 
    let ele = document.createElement('div')
    ele.innerHTML = `${name} disconnected `; 
    ele.className = 'text-red-400   px-4 py-1  bg-stone-200  w-2/6  border my-2 ';
    p.appendChild(ele)
  }

  const createElement3 = (message)=>{
    let p = document.getElementById('messages'); 
    let ele = document.createElement('div')
    ele.innerHTML = `You :  ${message} `; 
    ele.className = 'text-black   self-end   px-4 py-1  bg-stone-200  w-2/6  border my-2 ';
    p.appendChild(ele)
  }
  const style3 = {
    minHeight : "70vh",
    maxHeight: "70vh",
  }
  const handleChange = (e)=>{
    setmessage(e.target.value)
  }
  const handleClick = ()=>{
    socket.emit('sendmessage' , {message : message})
    setmessage('')
    createElement3(message)
  }

  const SendMessage = (name , message)=>{
    let p = document.getElementById('messages'); 
    let ele = document.createElement('div')
    ele.innerHTML = `${name} :  ${message} `; 
    ele.className = ' px-4 py-1  bg-stone-200  w-2/6  border my-2   ';
    p.appendChild(ele)
    
  }

  useEffect(() => {
    const handleNewUserJoined = (data) => {
      createElementt(data.name);
    };

    socket.on('newUserJoined', handleNewUserJoined);

    return () => {
      socket.off('newUserJoined', handleNewUserJoined);
    };
  }, []);

  
useEffect(()=>{
 
},[])


  useEffect(() => {
    const handleNewUserJoined = (data) => {
      SendMessage(data.name , data.message);
    };

    socket.on('receive', handleNewUserJoined);

    return () => {
      socket.off('receive', handleNewUserJoined);
    };
  }, []);

  useEffect(() => {
    const handleNewUserJoined = (data) => {
      setRoomNo(data.room)
    };

    socket.on('roomCreated', handleNewUserJoined);

    return () => {
      socket.off('roomCreated', handleNewUserJoined);
    };
  }, []);


  
  useEffect(() => {
    const handleNewUserJoined = (data) => {
      createElement2(data.name)
    };

    socket.on('userdisconnected', handleNewUserJoined);

    return () => {
      socket.off('userdisconnected', handleNewUserJoined);
    };
  }, []);



  



  return (
    <div className="bg-gradient-to-r from-violet-600 to-fuchsia-400 min-h-screen " >
      <h1 className="text-center text-white text-2xl ">Welcome to iChat </h1>
      <h3 className="text-center text-white text-lg" >Our room no is {id} </h3>
      <div className="container mx-auto  my-auto  " style={style3}>
      <div className="flex flex-col w-4/6 mx-auto mt-6 " id="messages">
        
        


        </div>
      </div>

      <div className="send flex w-4/6 mx-auto flex justify-center ">
        <input type="text" name="message" id="message"  className="w-5/6 px-2 " value={message} onChange={handleChange}/>
        <button type="submit " className="py-1 px-4 bg-gradient-to-r from-violet-700 to-fuchsia-700 text-white  " onClick={handleClick} >Send </button>
      </div>
    </div>
  )
}

export default Room