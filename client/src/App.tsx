import './App.scss'
import io from 'socket.io-client';
import { useEffect, useState } from 'react'
import Chat from './components/chat';
import TagsFilter from './components/tagsFilter';

function App() {
  const [messagesReceived, setMessagesReceived] = useState<string[]>([])
  const socket = io("http://localhost:3001")

  useEffect(() => {
    const receiveMessageHandler = (data: { message: string; }) => {
      setMessagesReceived((prevMessages) => [...prevMessages, data.message]);
    };
    const receiveMessagesHandler = (data: { message: string; }[]) => {
      setMessagesReceived(data.map((elem) => {
        return elem.message
      }))
    };

    socket.on("receive_message", receiveMessageHandler);

    socket.on("receive_messages", receiveMessagesHandler)

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, []);

  return (
    <div className='App d-flex flex-row w-100'>
      <TagsFilter socket={socket} />
      <Chat messagesReceived={messagesReceived} socket={socket} />
    </div>
  )
}

export default App
