import React, { useState,useEffect } from 'react'
import { checkHeading, replaceHeadingStars } from '../helper.js';

function Answers({ans,index,totalResult,type}) {

  const [heading,setHeading]=useState(false);
  const[answer, setAnswer]=useState(ans);

  useEffect(()=>{
    
    if(checkHeading(ans)){
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    };
    },[]);
    
  return (
    <>
    {
      index==0 && totalResult>1 ? <div className="pt-1 text-lg text-zinc-700 dark:text-white">{answer}</div>:
      heading?<div className='pt-1 text-md block  text-zinc-700 dark:text-white'>{answer}</div>:<div className={
        type=='q'?'pl-1 text-md block text-zinc-700 dark:text-white':'pl-5  text-zinc-600 dark:text-zinc-300'
      }>{answer}</div>
    }
          
    </>
  )
}

export default Answers