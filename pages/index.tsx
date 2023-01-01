import React, { useState } from 'react'
import Styles from '../styles/index.module.css'

const Index = () => {
    type Todo = {
        name: string
    }

    const [toDoList, setToDoList] = useState<Array<Todo>>([]);
    const [doneList, setDoneList] = useState<Array<Todo>>([]);
    const [input, setInput] = useState<string>('')

    const handleClick = () => {
        setToDoList((prev) => [...prev, {name: input}])
        setInput('')
    }

    const handleDone = (e: any) => {
        console.log(e)
        setDoneList((prev) => [...prev, { name: e.target.innerHTML }]);
        setToDoList((prev) => prev.filter( ele => ele.name !== e.target.innerHTML))
    }

    const handleChange = (e: {target: {value: string}}) => {
        setInput(e.target.value)
    }
  return (
    <div className={Styles.wFull}>
      <h1 className={Styles.textCenter}>Todo List</h1>
      <div className={Styles.row}>
        <ul>
          <h2>ToDo</h2>
          {toDoList &&
            toDoList.map((toDo, i) => {
              return (
                <li onClick={handleDone} className={Styles.listItem} key={toDo.name + i}>
                  {toDo.name}
                </li>
                
              );
            })}
        </ul>
        <ul>
          <h2>Done</h2>
          {doneList &&
            doneList.map((toDo, i) => {
              return (
                <li className={Styles.listItem} key={toDo.name + i}>
                  {toDo.name}
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <input value={input} onChange={handleChange} />
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
}

export default Index