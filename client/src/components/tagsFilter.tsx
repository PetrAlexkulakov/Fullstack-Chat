import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";


const TagsFilter = ({ socket, tags, setTags }: 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  { socket: Socket<any, any>, tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [tag, setTag] = useState('');

  const sendTag = () => {
    const receiveTagsHandler = (tag: string) => {
      const improvedTag = tag.replace(/#/ig, '')
      setTags((prevTags) => [...prevTags, improvedTag])
      socket.emit("send_tags", { tags: tags.concat(improvedTag).join(';') })
    };
    receiveTagsHandler(tag)
    setTag('')
  }

  useEffect(() => {
    socket.emit("send_tags", { tags: '' })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="w-100">
        <h3>Tags:</h3>
        <div className='chat d-flex flex-column justify-content-between border border-success w-100'>
            <div className='d-flex flex-column justify-content-start' style={{ overflowY: 'auto' }}>
                {tags.map((tag, index) => {
                    return(<div key={index}>{tag}</div>)
                })}
            </div>
            <div className='border border-5 border-primary m-3 p-2'>
                <input type="text" placeholder='Tag...' className='border border-success w-50'
                    value={tag}
                    onChange={(e) => { setTag(e.target.value) }}
                />
                <button className='border border-success ms-3' onClick={sendTag}>Send Tag</button>
            </div>
        </div>
    </div>
  )
}

export default TagsFilter
