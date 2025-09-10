import React, { useState,useEffect } from 'react'
import { checkHeading, replaceHeadingStars } from '../helper.js';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


function Answers({ans,index,totalResult,type}) {

  const [heading,setHeading]=useState(false);
  const[answer, setAnswer]=useState(ans);

  useEffect(()=>{
    
    if(checkHeading(ans)){
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    };
    },[]);

    const renderer = {
      code({node, inline, className, children,...props}){
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
          <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, '')}
          language={match[1]}
          style={oneDark}
          PreTag="div"
          />
        ):(
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }

    
  return (
    <>
    {
      index==0 && totalResult>1 ? <div className="pt-1 text-lg text-zinc-700 dark:text-white">{answer}</div>:
      heading?<div className='pt-1 text-md block  text-zinc-700 dark:text-white'>{answer}</div>:<div className={
        type=='q'?'pl-1 text-md block text-zinc-700 dark:text-white':'pl-5  text-zinc-600 dark:text-zinc-300'
      }>
        <ReactMarkdown components={{renderer}}>{answer}</ReactMarkdown>
        </div>
    }
          
    </>
  )
}

export default Answers