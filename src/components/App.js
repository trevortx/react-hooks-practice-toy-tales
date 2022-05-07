import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

// App
// |__Header
// |__ToyForm
// |__ToyContainer
//     |__ToyCard

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(r => r.json())
      .then(data => setToys(data))
      .catch(error => console.log(error.message))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleNewToy(newToy) {
    setToys([...toys, newToy])
  }

  function handleDelete(id) {
    const updatedToys = toys.filter((toy) => toy.id !== id)
    setToys(updatedToys)
  }

  function handleLike(likedToy) {
  const updatedToys = toys.map((toy) => (toy.id === likedToy.id) ? likedToy : toy)
    setToys(updatedToys)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleNewToy={handleNewToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} handleDelete={handleDelete} handleLike={handleLike} />
    </>
  );
}

export default App;