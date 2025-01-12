import React from "react";

// Just a simple functional component
function Header() {
  return (
    <header style={styles.header}>
      <h1>Weather Predictor</h1>
    </header>
  );
}

// Some basic inline styles for fun
const styles = {
  header: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "1px",
    textAlign: "center",
    borderRadius: "3px",
  },
};

export default Header;
