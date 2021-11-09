import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const charList = alpha_digits();
const storage_key = "usergenApp.list";

// const themes = [

// ];

function alpha_digits() {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet_cap = alpha.map((x) => String.fromCharCode(x));

  const alph = Array.from(Array(26)).map((e, i) => i + 97);
  const alphabet_uncap = alph.map((x) => String.fromCharCode(x));

  const digit = Array.from(Array(10)).map((e, i) => i + 48);
  const digits = digit.map((x) => String.fromCharCode(x));

  let alpha_digits = [];

  return alpha_digits.concat(alphabet_cap, alphabet_uncap, digits);
}

function randLength() {
  const nameLength = Math.floor(Math.random() * 13) + 4;
  return nameLength;
}

function randName(length) {
  let username = "";
  for (let i = 0; i < length; i++) {
    username += charList[Math.floor(Math.random() * charList.length)];
  }
  return username;
}

function App() {
  const [usernameList, setUsernameList] = useState([]);
  // const usernameRef = useRef();

  // useEffect(() => {
  //   return ""
  // }, [name]);

  function handleSubmit(event) {
    event.preventDefault();
    setUsernameList((usernameList) => {
      if (usernameList === []) {
        return [randName(randLength())];
      } else if (usernameList.length >= 20) {
        usernameList.shift();
        return [...usernameList, randName(randLength())];
      } else return [...usernameList, randName(randLength())];
    });
  }

  // useEffect(() => {
  //   setUsernameList((usernameList) => {
  //     if (usernameList === []) {
  //       return [randName(randLength())];
  //     } else if (usernameList.length >= 20) {
  //       usernameList.shift();
  //       return [...usernameList, randName(randLength())];
  //     } else return [...usernameList, randName(randLength())];
  //   });
  // }, [username]);

  const clearAllNames = (event) => {
    setUsernameList([]);
  };

  // function handleAddName(e) {
  //   const addedName = usernameRef.current.value;
  //   if (addedName === "")
  //     return;
  //   setSave(save => {
  //     if (save.length >= 20) {
  //       save.shift();
  //     }
  //     return [...save, addedName];
  //   });
  //   usernameRef.current.value = null;
  // }

  // function handleRemoveName(e) {
  //   const removeName = e.target.getAttribute("name");
  //   setSave(save.filter(item => item.name !== removeName));
  // }

  useEffect(() => {
    const storedUsernameList = JSON.parse(localStorage.getItem(storage_key));
    if (storedUsernameList) setUsernameList(storedUsernameList);
  }, []);

  useEffect(() => {
    localStorage.setItem(storage_key, JSON.stringify(usernameList));
  }, [usernameList]);

  return (
    <div className="container text-center">
      <h1 className="display-5">Username Generator</h1>

      <form onSubmit={handleSubmit}>
        <input type="submit" value="Generate" />
      </form>

      {/* <form>
        <input type="text" placeholder="Or type username" />
        <button className="AddName" onClick={handleAddName}>Add Username</button>
      </form> */}

      <h3> {usernameList[usernameList.length - 1]} </h3>
      <h4> {usernameList.length} Saved Names: </h4>
      <div>
        <ul>
          {usernameList.map((item) => {
            return (
              <>
                {/* <button name={item.name} onClick={handleRemoveName}>
                X
                </button> */}
                <li key="{item}">{item}</li>
              </>
            );
          })}
        </ul>
      </div>
      <button onClick={clearAllNames}>Clear All</button>
    </div>
  );
}

export default App;
