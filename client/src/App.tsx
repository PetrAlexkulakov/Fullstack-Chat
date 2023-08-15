import './App.css'
import io from 'socket.io-client';
import { useEffect, useState } from 'react'

const socket = io("http://localhost:3001")
function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState<string[]>([])

  const sendMessage = () => {
    socket.emit("send_message", { message })
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived([...messageReceived, data.message])
    })
  }, [socket])

  return (
    <div className='App'>
      <input type="text" placeholder='Message...' onChange={(e) => { setMessage(e.target.value) }} />
      <button onClick={sendMessage}>Send Message</button>
      {messageReceived.map((message, index) => {
        return(<div key={index}>{message}</div>)
      })}
    </div>
  )
}

export default App
