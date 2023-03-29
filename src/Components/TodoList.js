import { useState, useEffect, useRef } from "react";
import { MdDoneAll } from "react-icons/md";
import { FiEdit, FiTrash } from "react-icons/fi";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [edit, setEdit] = useState(0);
  const inputActive = useRef(null);

  // INPUT ACTIVE

  useEffect(() => {
    inputActive.current.focus();
  
  },[input]);
  

  // ADD && EDIT BUTTON

  const addTodo = () => {
    if (input !== "") {
      setTodoList([
        ...todoList,
        { todoData: input, id: Date.now(), status: false },
      ]);
      setInput("");
    }
    if (edit) {
      const editTo = todoList.find((tolist) => tolist.id === edit);
      const updateTo = todoList.map((item) =>
        item.id === editTo.id
          ? (item = { id: item.id, todoData: input, status: false })
          : (item = {
              id: item.id,
              todoData: item.todoData,
              status: item.status,
            })
      );
      setTodoList(updateTo);
      setEdit("");
      setInput("");
    }
  };
 // BUTTON COMPLETE

  const completeTodo = (id) => {
    let complete = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    });
    setTodoList(complete);
  };

  //BUTTON EDIT

  const editTodo = (id) => {
    const editingTodo = todoList.find((to) => to.id === id);
    setInput(editingTodo.todoData);
    setEdit(editingTodo.id);
  };
  
 //BUTTON DELETE

  const deleteTodo = (id) => {
    setTodoList(
      todoList.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  return (
    <div className="section ">
      <div className="container">
        <div className="input-container">
          <div className="input-area">
            <h1 className="heading">My Todo App</h1>
            <input
              type="text"
              value={input}
              ref={inputActive}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addTodo} >{edit ? "Edit" : "Add"}</button>
          </div>
        </div>
      </div>
      <div className="container todo-area">
        {todoList.map((todos) => {
          return (
            <div
              key={crypto.randomUUID()}
              className={`todos ${todos.status ? " complete" :null }`}
            >
              <span>
                <MdDoneAll
                  className="todo-done "
                  onClick={() => completeTodo(todos.id)}
                />
                <FiEdit
                  className={` todo-edit ${todos.status ? "visible" : null}`}
                  onClick={() => editTodo(todos.id)}
                />
                <FiTrash
                  className="todo-delete"
                  onClick={() => deleteTodo(todos.id)}
                />
              </span>
              <h4>{todos.todoData}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TodoList;
