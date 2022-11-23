import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const countFromStorage = Number(localStorage.getItem("count"));
    if (countFromStorage) {
      setCount(countFromStorage);
    }
  }, []);

  useEffect(() => {
    if (isCounting) {
      setTimeout(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }
  }, [isCounting, count]);

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  const increment = (value) => () => {
    setCount(value);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleUpdateViaInput = () => {
    const value = Number(inputValue);
    if (isNaN(value)) {
      setInputValue("");
    } else {
      setCount(value);
      setInputValue("");
    }
  };
  const handleCounter = () => {
    setIsCounting(!isCounting);
  };

  return (
    <div className="App">
      <h1>{count}</h1>
      <div>
        <button onClick={increment(count - 1)}>-1</button>
        <button onClick={increment(0)}>reset</button>
        <button onClick={increment(count + 1)}>+1</button>
      </div>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleUpdateViaInput}>Update</button>
      </div>
      <div>
        <button onClick={handleCounter}>
          {isCounting ? "Stop" : "Start"} Counting
        </button>
      </div>
    </div>
  );
}

export default App;
