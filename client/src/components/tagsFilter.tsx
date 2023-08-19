import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { baseURL } from "../shared/baseURL";
import AsyncCreatableSelect from 'react-select/async-creatable';
import axios from "axios";

const TagsFilter = ({ socket, tags, setTags }: 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  { socket: Socket<any, any>, tags: string[], setTags: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [tag, setTag] = useState<string | null>(null);

  const handleSelectChange = (selectedOption: { tagName: string } | null) => {
    if (selectedOption !== null) {
      setTag(selectedOption.tagName);
    } else {
      setTag(null);
    }
  };

  const handleCreateTag = async (newTag: string) => {
    const normalizedTag = newTag.trim().replace(/#/ig, ''); // Удалите символы # и пробелы
    const alreadyExists = tags.some((tag) => tag.toLowerCase() === normalizedTag.toLowerCase());
  
    if (normalizedTag && !alreadyExists) {
      setTags((prevTags) => [...prevTags, normalizedTag]);
      setTag(normalizedTag);
      socket.emit("send_tags", { tags: [...tags, normalizedTag].join(';') });
      setTag(null)
    }
  };

  const sendTag = () => {
    const receiveTagsHandler = (tag: string | null) => {
      if ( tag !== null) {
        const improvedTag = tag.replace(/#/ig, '')
        setTags((prevTags) => [...prevTags, improvedTag])
        socket.emit("send_tags", { tags: tags.concat(improvedTag).join(';') })
        setTag(null)
      }
    };
    receiveTagsHandler(tag)
  }

  const deleteTag = (index: string) => {
    const newTags = tags.filter((_, i) => i !== Number(index))
    setTags(newTags)
    socket.emit("send_tags", { tags: newTags.join(';') })
  }

  const promiseOptions = (inputValue: string) => {
    return new Promise((resolve) => {
      axios.get(`${baseURL}/tags`).then((res) => {
        const changedData = res.data.filter((i: { tagName: string }) => 
          i.tagName.toLowerCase().includes(inputValue.toLowerCase())).map((elem: { label: string; tagName: string; }) => {
            elem.label = elem.tagName
            return elem
          })
        resolve(changedData)
      })
    })
  };

  useEffect(() => {
    socket.emit("send_tags", { tags: '' })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="w-50">
        <h3>Tags:</h3>
        <div className='chat d-flex flex-column justify-content-between border border-success w-100'>
            <div className='d-flex flex-column justify-content-start' style={{ overflowY: 'auto' }}>
                {tags.map((tag, index) => {
                    return(
                      <div key={index} className="d-flex justify-content-center align-items-center gap-3">
                        <div>{tag}</div>
                        <button
                          id={String(index)}
                          className="btn-delete p-0" 
                          onClick={(e) => deleteTag((e.target as HTMLButtonElement).id)}
                        />
                      </div>
                    )
                })}
            </div>
            <div className='border border-5 border-primary m-3 p-2 d-flex flex-nowrap justify-content-center'>
                <AsyncCreatableSelect
                  className="w-50"
                  cacheOptions
                  defaultOptions
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  loadOptions={promiseOptions as any}
                  value={tag !== null ? { tagName: tag, label: tag } : null}
                  onChange={handleSelectChange}
                  onCreateOption={(newTag) => handleCreateTag(newTag)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendTag();
                    }
                  }}
                />
                <button className='border border-success ms-3' onClick={sendTag}>Send Tag</button>
            </div>
        </div>
    </div>
  )
}

export default TagsFilter
