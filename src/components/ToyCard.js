import React, { useState } from "react";

function ToyCard( {id, name, image, likes, handleDelete, handleLike} ) {
  // const [updateLikes, setUpdateLikes] = useState(likes)

  function deleteClick() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(r => r.json())
      .then(() => handleDelete(id))
  }

  function likeClick() {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: ++likes
    })
  })
    .then(r => r.json())
    .then(data => handleLike(data))
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button onClick={likeClick} className="like-btn">Like {"<3"}</button>
      <button onClick={deleteClick} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
