import { useState } from 'react'
import { Socket } from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Chat = ({ messagesReceived, socket }: { messagesReceived: string[], socket: Socket<any, any> }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    socket.emit("send_message", { message })
  }

  return (
    <div className="w-100">
        <h3>Messages:</h3>
        <div className='chat d-flex flex-column justify-content-between border border-success w-100'>
            <div className='d-flex flex-column justify-content-start'>
                {messagesReceived.map((message, index) => {
                    return(<div key={index}>{message}</div>)
                })}
            </div>
            <div className='border border-5 border-primary m-3 p-2'>
                <input type="text" placeholder='Message...' className='border border-success w-75' 
                    onChange={(e) => { setMessage(e.target.value) }} />
                <button className='border border-success' onClick={sendMessage}>Send Message</button>
            </div>
        </div>
    </div>
  )
}

export default Chat
