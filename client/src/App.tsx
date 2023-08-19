import './App.scss'
import { baseURL } from './shared/baseURL';
import io from 'socket.io-client';
import { useEffect, useState } from 'react'
import Chat from './components/chat';
import TagsFilter from './components/tagsFilter';
import { findAllTags } from './shared/findAllTags';

function App() {
  const [messagesReceived, setMessagesReceived] = useState<string[]>([])
  const socket = io(baseURL)
  const [tags, setTags] = useState<string[]>([]);

  const receiveMessageHandler = (data: { message: string; }) => {
    const dataTags = findAllTags(data.message)
    if (tags.some(element => dataTags.includes(element)) || dataTags.length === 0) {
      setMessagesReceived((prevMessages) => [...prevMessages, data.message]);
    }
  };

  const receiveMessagesHandler = (data: { message: string; createdAt: string }[]) => {
    const receivedMessages = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map(elem => elem.message);
    setMessagesReceived(receivedMessages);
  };

  useEffect(() => {
    socket.on("receive_message", receiveMessageHandler);

    socket.on("receive_messages", receiveMessagesHandler)

    return () => {
      socket.off("receive_message", receiveMessageHandler);
      // socket.off("receive_messages", receiveMessagesHandler);
    };
  }, [socket]);

  return (
    <div className='App d-flex flex-row w-100'>
      <TagsFilter socket={socket} tags={tags} setTags={setTags} />
      <Chat messagesReceived={messagesReceived} socket={socket} />
    </div>
  )
}

export default App
