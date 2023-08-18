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
    const receiveMessagesHandler = (data: { message: string; createdAt: string }[]) => {
      const receivedMessages = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map(elem => elem.message);
      setMessagesReceived(receivedMessages);
    };

    socket.on("receive_message", receiveMessageHandler);

    socket.on("receive_messages", receiveMessagesHandler)

    return () => {
      socket.off("receive_message", receiveMessageHandler);
      socket.off("receive_messages", receiveMessagesHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className='App d-flex flex-row w-100'>
      <TagsFilter socket={socket} />
      <Chat messagesReceived={messagesReceived} socket={socket} />
    </div>
  )
}

export default App
