import React from 'react'
import Answers from './Answers.jsx';

function QuestionAnswer({item,index}) {
  return (
    <div
                  key={index}
                  className={
                    item.type === "q"
                      ? "flex justify-end"
                      : "flex flex-col justify-start"
                  }
                >
                  {item.type === "q" ? (
                    <li className="text-right m-1 border-10 bg-amber-100 dark:bg-zinc-700 dark:border-zinc-700 border-amber-100 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit">
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
  )
}

export default QuestionAnswer