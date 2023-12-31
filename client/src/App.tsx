import './App.scss'
import io from 'socket.io-client';
import { useEffect, useState } from 'react'
import Chat from './components/chat';
import TagsFilter from './components/tagsFilter';
import { findAllTags } from './shared/findAllTags';
import ModalWindow from './components/modalWindow';

function App() {
  const [messagesReceived, setMessagesReceived] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const socket = io(baseURL)
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setIsModalOpen(true)
  }, [])

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
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <>
      <ModalWindow show={isModalOpen} handleClose={() => setIsModalOpen(false)} />
      <div className='App d-flex flex-column border border-black w-75'>
        <div className='d-flex flex-row' style={{height: '93vh'}}>
          <TagsFilter socket={socket} tags={tags} setTags={setTags} />
          <Chat messagesReceived={messagesReceived} socket={socket} />
        </div>
        <h4 className='mt-4'>You can write whatever you want and it will be here forever!</h4>
      </div>
    </>
  )
}

export default App
