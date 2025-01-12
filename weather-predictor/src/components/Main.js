import React, { useState } from "react";

function Main() {
  // 1. State for the user’s location input
  const [location, setLocation] = useState("");

  // 2. State to track loading (show/hide the loading popup)
  const [isLoading, setIsLoading] = useState(false);

  // 3. State to track when to show the final message
  const [showResult, setShowResult] = useState(false);

  // When the user clicks "Predict"
  const handlePredict = () => {
    // Reset states each time user clicks
    setIsLoading(true);
    setShowResult(false);

    // Simulate a 5-second loading process
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 5000);
  };

  return (
    <main style={styles.main}>
      <h2>Weather Predictor</h2>

      {/* Location input and Predict button */}
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Enter your location"
          style={styles.input}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button style={styles.button} onClick={handlePredict}>
          Predict
        </button>
      </div>

      {/* Loading Popup */}
      {isLoading && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <p>Predicting...</p>
            <p>*Insert Scanning bar...*</p>
          </div>
        </div>
      )}

      {/* Result Popup */}
      {showResult && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <p>IDK! go just look outside</p>
          </div>
        </div>
      )}
    </main>
  );
}

// Inline styling for simplicity
const styles = {
  main: {
    backgroundColor: "#ffe0b2",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "5px",
  },
  formContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#f44336",
    color: "#fff",
    cursor: "pointer",
  },
  popupOverlay: {
    // Full-screen overlay
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999, // Make sure it stays on top
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px 30px",
    borderRadius: "8px",
    textAlign: "center",
    maxWidth: "400px",
  },
};

export default Main;
