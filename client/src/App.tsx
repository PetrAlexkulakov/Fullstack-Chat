import './App.css'
import io from 'socket.io-client';
import { useEffect, useState } from 'react'

const socket = io("http://localhost:3001")
function App() {
  const [message, setMessage] = useState('');
  const [messagesReceived, setMessagesReceived] = useState<string[]>([])//TODO надо создать бд и там по времени присылать сообщения по одному

  const sendMessage = () => {
    socket.emit("send_message", { message })
  }

  useEffect(() => {
    const receiveMessageHandler = (data: { message: string; }) => {
      setMessagesReceived((prevMessages) => [...prevMessages, data.message]);
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, []);

  return (
    <div className='App'>
      <input type="text" placeholder='Message...' onChange={(e) => { setMessage(e.target.value) }} />
      <button onClick={sendMessage}>Send Message</button>
      {messagesReceived.map((message, index) => {
        return(<div key={index}>{message}</div>)
      })}
    </div>
  )
}

export default App
