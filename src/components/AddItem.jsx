import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = () => {
  const inputRef = useRef();

  return (
    <form className='addForm'>
      <label htmlFor='addItem'>Add Item</label>
      <input
        autoFocus
        ref={inputRef}
        id='addItem'
        type='text'
        placeholder='Add Item'
        required
      />
      <button type='submit' aria-label='Add Item'>
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
