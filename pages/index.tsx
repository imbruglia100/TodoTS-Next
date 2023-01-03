import React, { useEffect, useState } from 'react'
import Styles from '../styles/index.module.css'
import createPersistedState from "use-persisted-state";

const useTodoState = createPersistedState<Array<string>>("todo")
const useDoneState = createPersistedState<Array<string>>("done");

const Index = () => {

    const [initialRender, setInitialRender] = useState(false)

    const [toDoList, setToDoList] = useTodoState();
    const [doneList, setDoneList] = useDoneState();
    const [input, setInput] = useState<string>('')

    const addTodo = () => {
        setToDoList((prev: Array<string>) => [...prev, input])
        setInput('')
    }
    
    const moveToDone = (e: any) => {
        setDoneList((prev: Array<string>) => [...prev, e.target.innerHTML]);
        setToDoList((prev: Array<string>) =>
          prev.filter((ele) => ele !== e.target.innerHTML)
        );
    }

    const handleChange = (e: {target: {value: string}}) => {
        setInput(e.target.value)
    }
    
    const deleteFromList = (e) => {
        setDoneList((prev: Array<string>) =>
          prev.filter((ele) => ele !== e.target.innerHTML)
        );
    }

    const clear = () => {
        setDoneList([])
        setToDoList([])
    }

    useEffect( () => {
        setInitialRender(true)
    }, [])

    if(!initialRender){
        return null
    }else{

    return (
    <div className={Styles.wFull}>
        <h1 className={Styles.textCenter}>Todo List</h1>
        <div className={Styles.row}>
        <ul>
            <h2>ToDo</h2>
            {toDoList &&
                toDoList.map((toDo, i) => {
                    return (
                    <li onClick={moveToDone} className={Styles.toDoListItem} key={toDo + i}>
                        {toDo}
                    </li>
                    
                    );
                })}
        </ul>
        <ul>
            <h2>Done</h2>
            {doneList &&
            doneList.map((toDo, i) => {
                return (
                <li onClick={deleteFromList} className={Styles.doneListItem} key={toDo + i}>
                    {toDo}
                </li>
                );
            })}
        </ul>
        </div>
        <div>
        <input value={input} onChange={handleChange} />
        <button onClick={addTodo}>Add</button>
        </div>
        <button style={{backgroundColor: "red", marginTop: 20}} onClick={clear}>Clear</button>
    </div>
    );
  }
}

export default Index