import { useEffect, useRef, useState} from 'react';
import React from "react";
import { URL } from "./constant.js";
import Answers from './components/Answers.jsx';
import './index.css';
import { Loader2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentHistory, setRecentHistory]=useState(JSON.parse(localStorage.getItem('history')));
  const [selectedHistory, setSelectedHistory]=useState(null);
  const scrollToAnswer=useRef();
  

  

  const handleClick = () => {
    setLoading(true);

    // simulate async upload (just for button animation)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const askQuestion = async () => {

    if(!question && !selectedHistory){
      return false;
    }
    if(question){
    if(localStorage.getItem('history')){
      let history=(JSON.parse(localStorage.getItem('history')));
      history=[question,...history];
      if(history.length>5) history.pop();
      localStorage.setItem('history',JSON.stringify(history));
      setRecentHistory(history);
    }
    else{
      let history=[question];
      localStorage.setItem('history',JSON.stringify(history));
      setRecentHistory(history);
    }
  }

  const payloadData = question ? question : selectedHistory;
  const payload = {
    contents: [
      {
        parts: [
          {
            text: payloadData
          }
        ]
      }
    ]
  };
   setLoading(true);
    try {
      let response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });
    

      response = await response.json();
      let datastring = response.candidates[0].content.parts[0].text;

      // split answer into bullet points
      datastring = datastring.split("* ").map((item) => item.trim());

      setResult((prev) => [
        ...prev,
        { type: 'q', text: question?question:selectedHistory },
        { type: 'a', text: datastring }
      ]);

      setQuestion(""); // clear input after submit
    } catch (err) {
      console.error("Error fetching:", err);
    }
    setTimeout(() => {
      scrollToAnswer.current.scrollTop = scrollToAnswer.current.scrollHeight;
    }
    , 100);
    setLoading(false);
  };
  

  const SuccessToast = ({ onDone }) => {
  React.useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);
  return (
    <div className="bg-zinc-600 p-3 rounded text-white shadow-lg">
      ✅ History cleared!
    </div>
  );
};

const clearHistory = () => {
  const toastId = "clear-history";
  toast.custom(
    (t) => (
      <div className="bg-zinc-800 p-3 rounded text-white shadow-lg">
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to clear all recent search?</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                localStorage.removeItem("history");
                setRecentHistory(null);
                toast.custom(
                  () => (
                    <SuccessToast onDone={() => toast.remove(toastId)} />
                  ),
                  { id: toastId }
                );
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(toastId)}
              className="px-3 py-1 bg-zinc-400 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ),
    {
      id: toastId,
      duration: 5000,
    }
  );
};

useEffect(()=>{
  askQuestion();
  setSelectedHistory(null);
}
,[selectedHistory]);

const isEnter=(event)=>{
    // console.log(event.key);
    if(event.key=='Enter'){
    event.preventDefault(); 
    handleClick();
    askQuestion();
    }
}

  return (
    <>
    <Toaster position="top-left"/>
    <div className="grid grid-cols-5 h-screen text-center">
      {/* Sidebar */}
      <div className="col-span-1 h-screen  bg-zinc-800">
        <h1 className='pt-3 pb-3 text-xl text-white bg-black'><span>Recent Search</span>
          <button className='pl-4 cursor-pointer' onClick={clearHistory}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </h1>
        <button className='p-2 m-2 bg-zinc-950 text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-md' onClick={()=>window.location.reload()}>New Chat <b>+</b></button>
        <ul className='text-left overflow-auto '>
          {
            recentHistory && recentHistory.map((item,index)=>(
              <li 
               key={index}
               className="truncate p-1 pl-5 m-2 hover:bg-zinc-700 hover:text-zinc-300 text-white  cursor-pointer"
              onClick={()=>{
                setSelectedHistory(item);
              }
              }>{item}</li>
            ))
          }
        </ul>
      </div>
      

      {/* Main Section */}
      <div className="col-span-4 bg-zinc-900 p-10 h-screen flex flex-col">
        <h1 className='text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 pb-2'>Hello User, Ask me Anything!</h1>
        {/* Chat area */}
        {
          loading?
          <div role="status">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>:null
        }
        <div ref={scrollToAnswer} className="flex-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="text-zinc-300 mb-5">
            <ul className="flex flex-col">
              {result.map((item, index) => (
                <div
                  key={index}
                  className={
                    item.type === "q"
                      ? "flex justify-end"
                      : "flex flex-col justify-start"
                  }
                >
                  {item.type === "q" ? (
                    <li className="text-right m-1 border-10 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit">
                      <Answers
                        ans={item.text}
                        totalResult={1}
                        index={index}
                        type={item.type}
                      />
                    </li>
                  ) : (
                    item.text.map((ansItem, ansIndex) => (
                      <li
                        key={ansIndex}
                        className="text-left m-1"
                      >
                        <Answers
                          ans={ansItem}
                          totalResult={item.text.length}
                          index={ansIndex}
                          type={item.type}
                        />
                      </li>
                    ))
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-zinc-800 w-1/2 text-white m-auto mt-5 p-1 rounded-4xl border-zinc-400 border flex h-16">
          <input
            type="text"
            onKeyDown={isEnter}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask me Anything ..."
            className="w-full h-full p-3 outline-none"
          />

          <button
            onClick={() => {
              handleClick();
              askQuestion();
            }}
            
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-500 disabled:opacity-70"
            disabled={loading || !question.trim()}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
export default App;
