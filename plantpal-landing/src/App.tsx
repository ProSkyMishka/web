import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Define the main App component
const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>PlantPal+</h1>
        <p>Your Intelligent Plant Care Companion</p>
      </header>

      <section className="features">
        <h2 className="featuresHead">Features</h2>
        <div className="feature-card">
          <h3>Plant Identification</h3>
          <p>95% accuracy in identifying plants</p>
        </div>
        <div className="feature-card">
          <h3>Automatic Disease Detection</h3>
          <p>Detect plant diseases automatically using AI</p>
        </div>
        <div className="feature-card">
          <h3>Automated Watering</h3>
          <p>Automatic watering system based on plant needs</p>
        </div>
        <div className="feature-card">
          <h3>Smart Home Integration</h3>
          <p>Works with Yandex Smart Home</p>
        </div>
        <div className="feature-card">
          <h3>Personalized Reminders</h3>
          <p>Customized care reminders for your plants</p>
        </div>
      </section>

      <section className="about">
        <h2>About PlantPal+</h2>
        <p>
          PlantPal+ is a comprehensive software-hardware solution designed to
          make plant care effortless. Using advanced machine learning and
          intuitive interfaces, we ensure your plants thrive with minimal
          effort.
        </p>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          Email: <a href="mailto:mprozorskiy@mail.ru">dvalexandrov@hse.ru</a>
        </p>
        <p>Phone: +7 (950) 921-36-62</p>
      </section>

      <footer className="app-footer">
        <p>&copy; 2024 PlantPal+. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
