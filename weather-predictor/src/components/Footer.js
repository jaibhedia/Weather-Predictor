import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>“We look outside your window, so you don't have to”</p>
      <p>&copy; 2025 Weather Predictor</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#ccc",
    color: "#333",
    padding: "20px",
    textAlign: "center",
    borderRadius: "5px",
  },
};

export default Footer;
