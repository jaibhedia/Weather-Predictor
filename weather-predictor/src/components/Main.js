import React, { useState, useEffect } from "react";

function Main() {
  // Track the user’s location input
  const [location, setLocation] = useState("");

  // Track loading state (for showing the loading popup)
  const [isLoading, setIsLoading] = useState(false);

  // Track when to show the final "idk" popup
  const [showResult, setShowResult] = useState(false);

  // Handle the "Predict" button click
  const handlePredict = () => {
    // Reset states each time Predict is clicked
    setIsLoading(true);
    setShowResult(false);

    // Simulate a 5-second loading process
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 5000);
  };

  // OPTIONAL: Automatically close the final popup after 5 seconds
  useEffect(() => {
    let resultTimer;
    if (showResult) {
      resultTimer = setTimeout(() => {
        setShowResult(false);
      }, 5000);
    }
    // Cleanup timer if the component unmounts or showResult changes
    return () => clearTimeout(resultTimer);
  }, [showResult]);

  // Close the final popup immediately (when user presses the "OK" button)
  const handleClosePopup = () => {
    setShowResult(false);
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
            <p>*Insert Scanning Bar...*</p>
          </div>
        </div>
      )}

      {/* Final "idk" Popup */}
      {showResult && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <p>IDK! go just look outside</p>
            <button style={styles.button} onClick={handleClosePopup}>
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

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
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
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
