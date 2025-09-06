import { useState } from 'react';
import {URL} from "./constant.js";
import Answers from './components/Answers.jsx';
import './index.css';


function App() {
    const[question, setQuestion]=useState("");
    const[result, setResult]=useState([]);
    
    const payload={
      "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
    }
    const askQuestion=async()=>{
      let response=await fetch(URL,{
        method:"POST",
        body:JSON.stringify(payload)
      });
      response=await response.json();
      let datastring=(response.candidates[0].content.parts[0].text);
      datastring = datastring.split("* ");
      datastring = datastring.map((item)=>item.trim());
      setResult([question,datastring]);
    }
    console.log(result);
  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800 ">
        Hello
      </div>
      <div className="col-span-4 bg-zinc-900 p-10 h-screen">
        <div className="container h-140 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className='text-zinc-300 mb-5 '>
            <ul>
            {
              result && result.map((item, index)=>(
                <li key={index+Math.random()} className='text-left m-1'><Answers ans={item} totalResult={result.length} index={index} /></li>))
            }
            </ul>
            
          </div>
          
        </div>
          <div className="bg-zinc-800 w-1/2 text-white m-auto mt-5 p-1 rounded-4xl border-zinc-400 border flex h-16"> 
            <input type="text" value={question} onChange={(event)=>setQuestion(event.target.value)} placeholder="Ask me Anything ..." className="w-full h-full p-3 outline-none"/>
            <button className="pr-5" onClick={askQuestion}>Ask</button>
          </div>
      </div>
    </div>
  )
}

export default App
