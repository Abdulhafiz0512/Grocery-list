import { FaTrashAlt } from "react-icons/fa";

const ListItem = ({ item, handleDelete, handleCheck }) => {
  return (
    <li className='item'>
      <input type='checkbox' checked={item.checked} onChange={() => handleCheck(item.id)} />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role='button'
        tabIndex='0'
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default ListItem;
