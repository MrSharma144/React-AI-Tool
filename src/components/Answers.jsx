import React, { useState,useEffect } from 'react'
import { checkHeading, replaceHeadingStars } from '../helper.js';

function Answers({ans,index,totalResult}) {

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
      index==0 && totalResult>1 ? <span className='pt-2 text-md block text-white'>{answer}</span>:
      heading?<span className='pt-2 text-md block text-white'>{answer}</span>:<span className='pl-7 text-zinc-300'>{answer}</span>
    }
          
    </>
  )
}

export default Answers