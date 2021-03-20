import "./styles.css";
import React, { useState } from "react";

//textarea nyt vähän laadukkaampi mutta pitäisi saada keskelle sivua eikä vasemmalle laidalle
//toinen ongelma on että kun add element nappia painaa niin tulee uusi lista mutta niitä pitäisi
//pystyä muokkaamaan erikseen

//eli kun lisää useamman elementin ja yrittää muokata yhtä niistä niin se muokkaa niitä kaikkia

//en ole ylpeä tästä

export default function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemName2, setItemName2] = useState("");

  const addItem = (event) => {
    event.preventDefault();
    setItems([
      ...items,
      {
        id: items.length,
        name: itemName
      }
    ]);
    setItemName("");
  };

  return (
    <div>
      <h1 className="Test2">Kutsupage</h1>
      <h2 className="Test2">Kutsu kamusi juhlimaan!</h2>
      <input
        className="Test"
        name="item"
        type="text"
        value={itemName2}
        onChange={(e) => setItemName2(e.target.value)}
      />
      <button onClick={addItem}>Add element</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              name="item"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </li>
        ))}
      </ul>
      <h2 className="Test2">Kirjoita oma kutsukirjeesi seuraavaan kenttään :)</h2>
      <textarea
      
       placeholder="Kirjoita oma kutsusi tähän kenttään..."
       rows={20}
       cols={50}
       minLength={10}
       maxLength={1000}
       
       >
        </textarea>
        <button> Kutsu tehty'd </button>
    </div>
  );
}
