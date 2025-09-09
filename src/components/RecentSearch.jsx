import React from 'react'
function RecentSearch({recentHistory,setSelectedHistory,clearHistory,newChat}) {

   
  return (
      <div className="col-span-1 h-screen bg-amber-100 dark:bg-zinc-800">
        <h1 className='pt-3 pb-3 text-xl text-white bg-black'><span>Recent Search</span>
          <button className='pl-4 cursor-pointer' onClick={clearHistory}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </h1>
        <button className='p-2 m-2 bg-zinc-950 text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-md' onClick={newChat}>New Chat <b>+</b></button>
        <ul className='text-left overflow-auto h-[70vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
          {
            recentHistory && recentHistory.map((item,index)=>(
              <li 
               key={index}
               className="truncate p-0 pl-5 m-1  hover:bg-zinc-700 hover:text-zinc-300 dark:text-white  text-zinc-700 cursor-pointer"
              onClick={()=>{
                setSelectedHistory(item);
              }
              }>{item}</li>
            ))
          }
        </ul>
    </div>
  )
}

export default RecentSearch