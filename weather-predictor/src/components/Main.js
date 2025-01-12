import React, { useState, useEffect } from "react";

// 1. Local array of valid locations (can be as large as you want).
const locationList = [
"Vajarahalli, Bengaluru, Karnataka, India",
"Thalaghattapura, Bengaluru, Karnataka, India",
"Lakshmipura, Bengaluru, Karnataka, India",
"Udipalya, Bengaluru, Karnataka, India"
];

function Main() {
  // 2. States for autocomplete
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(""); 
    // If we only want the button enabled after a valid pick

  // 3. Loading popup states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Predicting...");

  // 4. Final popup state
  const [showResult, setShowResult] = useState(false);

  // 5. Handle user typing in the input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedLocation(""); // Reset selected location if user starts typing again

    // Basic startsWith filtering
    if (value.trim().length > 0) {
      const filtered = locationList.filter((loc) =>
        loc.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // 6. When user clicks on a suggestion, finalize the location
  const handleSelectSuggestion = (loc) => {
    setInputValue(loc);
    setSelectedLocation(loc); 
    setSuggestions([]); 
  };

  // 7. Handle "Predict" button
  const handlePredict = () => {
    // Reset everything
    setIsLoading(true);
    setLoadingText("Predicting...");
    setShowResult(false);

    // After 5s, change the text in the same loading popup
    setTimeout(() => {
      setLoadingText("Predicting it real deep and hard...");
    }, 5000);

    // After 10s total, hide loading popup -> show final popup
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 10000);
  };

  // 8. Automatically close the final popup after 15 seconds
  useEffect(() => {
    let timer;
    if (showResult) {
      timer = setTimeout(() => {
        setShowResult(false);
      }, 15000);
    }
    return () => clearTimeout(timer);
  }, [showResult]);

  // 9. Close final popup immediately when user clicks "OK"
  const handleClosePopup = () => {
    setShowResult(false);
  };

  return (
    <main style={styles.main}>
      <h2>Weather Predictor</h2>

      {/* Autocomplete Input + Predict Button */}
      <div style={styles.formContainer}>
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            placeholder="Enter your location"
            style={styles.input}
            value={inputValue}
            onChange={handleInputChange}
          />

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div style={styles.suggestionsContainer}>
              {suggestions.map((loc, index) => (
                <div
                  key={index}
                  style={styles.suggestionItem}
                  onClick={() => handleSelectSuggestion(loc)}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Disable Predict until user has selected a valid location */}
        <button
          style={styles.button}
          onClick={handlePredict}
          disabled={!selectedLocation}
        >
          Predict
        </button>
      </div>

      {/* Loading Popup */}
      {isLoading && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <p>{loadingText}</p>
            <p>*Insert Scanning Bar*</p>
          </div>
        </div>
      )}

      {/* Final "idk" Popup */}
      {showResult && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <p>IDK! Go Just Look Outside.</p>
            <button style={styles.button} onClick={handleClosePopup}>
              Okie
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// 10. Basic inline styles
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
    width: "100%",
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
  suggestionsContainer: {
    position: "absolute",
    top: "36px", 
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    zIndex: 999,
    borderRadius: "4px",
    maxHeight: "150px",
    overflowY: "auto",
  },
  suggestionItem: {
    padding: "8px",
    borderBottom: "1px solid #eee",
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
