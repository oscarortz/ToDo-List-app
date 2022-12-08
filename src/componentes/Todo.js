import { useState } from "react";

export default function Todo({ item, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);

  function FormEdit() {
    const [newValue, setNewValue] = useState(item.title);

    function handleSubmit(e) {
      e.preventDefault();
    }

    function handleChange(e) {
      const value = e.target.value;
      setNewValue(value);
    }
    function handleClickUpdateTodo(e) {
      onUpdate(item.id, newValue);
      setIsEdit(false);
    }
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newValue} />
        <button onClick={handleClickUpdateTodo}>Update</button>
      </form>
    );
  }

  function TodoElement() {
    return (
      <div>
        {item.title} <button onClick={() => setIsEdit(true)}>Edit</button>
        <button onClick={(e) => onDelete(item.id)}>Delete</button>
      </div>
    );
  }
  return <div> {isEdit ? <FormEdit /> : <TodoElement />}</div>;
}
