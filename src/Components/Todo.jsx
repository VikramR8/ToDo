import React, { useState } from 'react'

const Todo = () => {
  const [todo,setTodo]=useState([]);
  const [inputvalue,setInputvalue]=useState('');
  const [editMode,setEditMode]=useState(false);
  const [editId,setEditId]=useState(null);
  const [editValue,setEditValue]=useState('');

  const addTodo=()=>
    {
      if(inputvalue.trim()!=='')
        {
          const newtodo=
          {
            id:new Date().getTime(),
            text:inputvalue
          }
          setTodo([...todo,newtodo]);
          setInputvalue('')
        }
    }

    const deleteTodo=(id)=>
      {
        const updateTodo=todo.filter((todo)=>todo.id!==id);
        setTodo(updateTodo);
      }

    const enterEditMode=(id,text) =>
      {
        setEditMode(true);
        setEditId(id);
        setEditValue(text);
      }

      const updateTodo=()=>
      {
        const updatedTodo =todo.map((todo)=>
        {
          if(todo.id===editId)
            {
              return{...todo,text:editValue}
            }
            return todo;
        })
        setTodo(updatedTodo);
        setEditMode(false);
        setEditId(null)
        setEditValue('');
      }

  return (
<div className='bg-white'>
<div className='mt-20'>
    <div className='flex flex-col items-center justify-center w-96 mx-auto p-4 bg-neutral-700 rounded-xl shadow-xl'>
        <h2 className='text-orange-300'>ToDo List</h2>
        <input type='text' value={inputvalue} onChange={(e)=>
        setInputvalue(e.target.value)} className='w-full box-border my-2 p-1 rounded-lg'/>

        {
          editMode ? (
            <div className='flex gap-2'>
              <input type='text' className='w-full box-border p-1 rounded-lg'
              value={editValue}
              onChange={(e)=>
              setEditValue(e.target.value)}/>
              <button onClick={updateTodo}>Update</button>
              </div>
          ):(
            <button onClick={addTodo}>Add</button>
            )
        }
        <ul>
        {todo.map((todo)=>
        (
          <li key={todo.id}>
          <div className='mt-4 flex justify-between gap-3'>
            <div className='text-white'>{todo.text}</div>
            <div className='flex gap-2'>
            <button onClick={()=>
              deleteTodo(todo.id)
            }>Delete</button>
            <button onClick={()=>
              enterEditMode(todo.id,todo.text)
            }>Edit</button>
            </div>
            </div>
          </li>
        )
        )}
          <li></li>
        </ul>
    </div>
    </div>
</div>
  )
}

export default Todo
