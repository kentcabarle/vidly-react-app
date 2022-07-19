import React from "react";

const ListGroup = ({ items, textProperty, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group mt-5">
      {items.map((item) => {
        return (
          <li
            onClick={() => onItemSelect(item)}
            key={item[textProperty]}
            className={`${
              item[textProperty] === selectedItem?.name
                ? "list-group-item active"
                : "list-group-item"
            } clickable`}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
