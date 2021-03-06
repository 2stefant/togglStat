import { useState, useEffect } from "react";

/**
 * @param {object} idNameItems Expects list of { id: "", name: ""} objects.
 * @param {event} callBack Event to call when an item is selected.
 * @param {string} title Optional title (default "Item").
 * @param {string} selectedId Optional id (default "0").
 */
export const BasicDropdown = ({ idNameItems, title, selectedId, callBack }) => {
  const initialId="0";
  const initialItem = { id: initialId, name: ` --- Select ${(title)? title: "Item"}--- ` };
  
  const [items, setItems] = useState(
    (idNameItems && idNameItems.length > 0)
      ? [initialItem, ...idNameItems]
      : [initialItem]);
  
  const [item, setItem] = useState(
    selectedId && items.includes(selectedId)
      ? items.find(_ => equals(_.id, selectedId))
      : initialItem);

  const equals = (id1, id2) =>{
      return `${id1}` == `${id2}`
  }
 
  return (
    <div>
      <p>Selected {title}: {item.name} ({item.id})</p>
      <select 
        class="form-control"
        onChange={(event) => {
          let id=event.target.value;
          event.preventDefault();
          let obj=items.find(_ => equals(_.id, id))
          if(obj){
            setItem(obj);
            if(callBack && !equals(id,initialId)){
              callBack(obj);
            }
          }
        }}
      >
        {items.map(_ => (
          <option key={_.id} value={_.id}>{_.name}</option>
        ))}
      </select>
    </div>
  );
};
export default BasicDropdown;
