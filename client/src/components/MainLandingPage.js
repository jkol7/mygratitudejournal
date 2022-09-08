import React from "react";
import { Link } from "react-router-dom";

function MainLandingPage() {
  return (
    <section className="main-lander-inner-bg">
      <div className="main-lander-wrapper">
        <div className="main-lander-top-left flex-col">
          <h2>Free Personal Journal</h2>
          <h4>experience the power of gratitude</h4>
          <Link to="/register">
            <button className="landing-top-button">Start Now</button>
          </Link>
        </div>
        <div className="main-lander-top-right">
          <img src="landingpage-right.png" />
        </div>
      </div>
      <div className="main-lander-benefits flex-col">
        <div className="benefit-container">
          <div className="flex-col">
            <img src="mentalhealth.svg" />
            <h4>Improve mental health</h4>
            <p>
              Over time gratitude practice has shown to foster positive
              well-being and less anxiety.
            </p>
          </div>
          <div className="flex-col">
            <img src="relationships.svg" />
            <h4>Build strong relationships</h4>
            <p>
              Studies have demonstraed gratitude can increase relationship
              satisfaction.
            </p>
          </div>
          <div className="flex-col">
            <img src="sleep.svg" />
            <h4>Sleep better and longer</h4>
            <p>
              Soothe your nervous system before bed for better and longer sleep.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-col prompt-landing-section">
        <h4>INSPIRATIONAL PROMPTS</h4>
        <h1 className="typewriter">What made you laugh or smile recently?</h1>
        <p>Whenever you lack inspiration, your journal is here to help!</p>
        <Link to="/register">
          <button className="landing-bottom-button">Start Now</button>
        </Link>
      </div>
      <footer>
        <p>© 2022 GJjournal.com</p>
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
      </footer>
    </section>
  );
}

export default MainLandingPage;
