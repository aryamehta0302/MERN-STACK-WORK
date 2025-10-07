import React, { useState } from "react";

function App() {
  // State to store the count value
  const [count, setCount] = useState(0);

  // Functions
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>🔢 React Counter App</h1>
      <h2 style={{ fontSize: "3rem", margin: "20px 0" }}>{count}</h2>

      <div>
        <button
          onClick={increment}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ➕ Increment
        </button>

        <button
          onClick={decrement}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ➖ Decrement
        </button>

        <button
          onClick={reset}
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔁 Reset
        </button>
      </div>
    </div>
  );
}

export default App;
