import { useState, Fragment } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function Formulario({ tareaAñadida }) {
  const [tarea, setTarea] = useState({
    id: crypto.randomUUID(),
    descripcion: "",
    estado: "INCOMPLETO",
  });

  const handleEvent = (evento) => {
    setTarea({
      ...tarea,
      descripcion: evento.target.value,
    });
  };

  return (
    <Fragment>
      <form>
        <input
          className="texto"
          type="text"
          placeholder="escribe tu tarea"
          name="tarea"
          onChange={handleEvent}
        />
        <button
          onClick={() => tareaAñadida(tarea)}
          type="button"
          value="enviando"
        >
          Enviar
        </button>
        {/* <button type="button" onClick={eraseTask}>
          Borrar
        </button> */}
      </form>
    </Fragment>
  );
}

const ToDoItem = ({ item, checkboxClicked, eraseTask }) => {
  //console.log(item);

  return (
    <div className="contenedor-input">
      <input
        type="checkbox"
        checked={item.estado === "COMPLETO"}
        onChange={checkboxClicked}
      />

      <p>{item.descripcion}</p>
      <div>
        <button onClick={eraseTask}>Borrar</button>
      </div>
    </div>
  );
};

const listData = [
  { id: uuidv4(), descripcion: "comida de perro", estado: "COMPLETO" },
  { id: uuidv4(), descripcion: "Regar plantas", estado: "INCOMPLETO" },
  { id: uuidv4(), descripcion: "Cortar plantas", estado: "COMPLETO" },
];

const ToDoList = () => {
  const [list, setList] = useState(listData);

  const handleAddItem = (tarea) => {
    const newList = [...list];
    newList.unshift(tarea);
    setList(newList);
    //agregar tarea a lista y actualizar estado
  };

  function handleEraseTask(id) {
    const temporal = list.filter((item) => item.id !== id);
    setList(temporal);
  }

  const handleCheckboxClick = (descripcion) => {
    //Encontramos nuestro item en la lista
    const itemClicked = [...list].filter(
      (item) => item.descripcion === descripcion
    );

    const newItem = itemClicked[0];
    //{ descripcion: "comida de perro", estado: "COMPLETO" },
    //Modificamos el item
    const newEstado =
      itemClicked[0].estado === "COMPLETO" ? "INCOMPLETO" : "COMPLETO";
    //{ descripcion: "comida de perro", estado: "INCOMPLETO" },
    //Encontramos el index del item en la lista
    const indexOfItem = [...list].findIndex(
      (i) => i.descripcion === descripcion
    );

    const newList = [...list];
    console.log(newList);

    //Modificamos nuestra lista
    newList.splice(indexOfItem, 1, {
      ...newItem,
      estado: newEstado,
    });

    //React
    //Actualizamos el estado con la nueva lista
    setList(newList);
  };

  return (
    <>
      <div className="todo-app">
        <h1>Mi lista </h1>

        <div className="list">
          {list.map((item) => (
            <ToDoItem
              item={item}
              key={item.id}
              checkboxClicked={() => handleCheckboxClick(item.descripcion)}
              eraseTask={() => handleEraseTask(item.id)}
            />
          ))}
        </div>
        <div class="contenedor-formulario">
          <Formulario tareaAñadida={(tarea) => handleAddItem(tarea)} />
        </div>
      </div>
    </>
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
