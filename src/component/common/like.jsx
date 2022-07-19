import React from "react";

const Like = ({ isLiked, onClick }) => {
  return (
    <i onClick={onClick} className={`${isLiked ? "fa fa-heart" : "fa fa-heart-o"} clickable`}></i>
  );
};

export default Like;
