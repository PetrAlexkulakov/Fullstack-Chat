import { useState } from 'react'
import { Socket } from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Chat = ({ messagesReceived, socket }: { messagesReceived: string[], socket: Socket<any, any> }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    socket.emit("send_message", { message })
    setMessage('')
  }

  return (
    <div className="w-100">
        <h3>Table Of Messages:</h3>
        <div className='chat d-flex flex-column justify-content-between border border-success w-100'>
            <div className='d-flex flex-column align-items-end justify-content-start' style={{ overflowY: 'auto' }}>
                {messagesReceived.map((message, index) => {
                    return(<div className='message' key={index}>{message}</div>)
                })}
            </div>
            <div className='input-wrapper border border-5 border-primary m-3 p-2 flex-nowrap'>
                <input type="text" placeholder='Message...' 
                    className='border border-success w-50' 
                    value={message}
                    onChange={(e) => { setMessage(e.target.value) }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    />
                <button className='border border-success ms-3' onClick={sendMessage}>Send Message</button>
            </div>
        </div>
    </div>
  )
}

export default Chat
