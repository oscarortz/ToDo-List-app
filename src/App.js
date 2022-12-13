import { useState } from "react";
import "./App.css";
import { v1 as uuidv1 } from "uuid";

import React from "react";

function TareaNueva({ addTodo }) {
  const [newTarea, setNewTarea] = useState("");

  const handleOnchange = (e) => {
    setNewTarea(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTarea.trim() !== "") {
      addTodo(newTarea);
      setNewTarea("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTarea}
          onChange={handleOnchange}
          placeholder="Escribe aqui tu tarea"
        />
        <button>Agregar</button>
      </form>
    </div>
  );
}

const ToDoItem = ({ item, checkboxClicked, eraseTask }) => {
  //console.log(item);

  return (
    <div className="contenedor-input">
      <label htmlFor={item.descripcion}>
        <input
          type="checkbox"
          checked={item.estado === true}
          onChange={() => checkboxClicked(item.id)}
          name={item.descripcion}
        />
      </label>

      <p>{item.descripcion}</p>
      <div>
        <button onClick={() => eraseTask(item.id)}>Borrar</button>
      </div>
    </div>
  );
};

const listData = [
  { id: 1, descripcion: "comida de perro", estado: true },
  { id: 2, descripcion: "Regar plantas", estado: false },
  { id: 3, descripcion: "Cortar plantas", estado: true },
];

const ToDoList = () => {
  const [list, setList] = useState(listData);
  const [mensaje, setMensaje] = useState(false);

  const addTodo = (newTodo) => {
    let newItem = {
      id: +new Date(),
      descripcion: newTodo,
      estado: false,
    };
    setList([...list, newItem]);
  };

  //agregar tarea a lista y actualizar estado

  const eraseTask = (id) => {
    console.log(id);
    setList([...list].filter((item) => item.id !== id));
  };

  const handleCheckboxClick = (id) => {
    console.log(id);
    setList(
      list.map((item) => {
        return item.id === Number(id)
          ? { ...item, estado: !item.estado }
          : { ...item };
      })
    );
  };

  return (
    <div className="todo-app">
      <h1>Mi lista </h1>
      {list.length === 0 ? "Aun no tienes tareas, Agrega una tarea" : ""}
      <div className="list">
        {list.map((item, index) => (
          <ToDoItem
            item={item}
            key={index}
            checkboxClicked={handleCheckboxClick}
            eraseTask={eraseTask}
          />
        ))}
      </div>
      <TareaNueva addTodo={addTodo} />
    </div>
  );
};
function App() {
  return (
    <div className="App">
      <></>
      <ToDoList />

      {/* input para agregar la descripcion */}
      {/* //button para agregar tarea a la lista onClick */}
    </div>
  );
}

export default App;
