import React, { useState } from "react";

function ToyForm( {handleNewToy} ) {
  const [toyName, setToyName] = useState("")
  const [toyURL, setToyURL] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if ([toyName, toyURL].some(input => input.trim() === "")) {
      alert("Please fill out the entire form.")
      return false
    }
    const newToy = {
      name: toyName,
      image: toyURL,
      likes: 0,
    }
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy)
    })
      .then(r => r.json())
      .then(data => handleNewToy(data))
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          onChange={(e) => setToyName(e.target.value)}
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={toyName}
          // required
        />
        <br />
        <input
          onChange={(e) => setToyURL(e.target.value)}
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={toyURL}
          // required
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
