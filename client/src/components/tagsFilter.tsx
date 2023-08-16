import { useState } from "react";
import { Socket } from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TagsFilter = ({ socket }: { socket: Socket<any, any> }) => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const sendTag = () => {
    const improvedTag = `#${tag}`
    socket.emit("send_tag", { improvedTag }) //? надо ли это делать в реальном времени?
    setTags([...tags, improvedTag])
    setTag('')
  }

  return (
    <div className="w-100">
        <h3>Tags:</h3>
        <div className='chat d-flex flex-column justify-content-between border border-success w-100'>
            <div className='d-flex flex-column justify-content-start'>
                {tags.map((tag, index) => {
                    return(<div key={index}>{tag}</div>)
                })}
            </div>
            <div className='border border-5 border-primary m-3 p-2'>
                <input type="text" placeholder='Tag...' className='border border-success w-75'
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
