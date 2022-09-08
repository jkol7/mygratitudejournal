import React from "react";
import { Link } from "react-router-dom";

function MainLandingPage() {
  return (
    <section className="main-lander-inner-bg">
      <div className="main-lander-wrapper">
        <div className="main-lander-top-left">
          <h2>Free Personal Journal</h2>
          <h4>experience the power of gratitudes</h4>
          <Link to="/register">
            <button className="landing-top-button">Start Now</button>
          </Link>
        </div>
        <div className="main-lander-top-right">
          <img src="landingpage-right.png" />
        </div>
      </div>
      <div className="main-lander-benefits">
        <div className="benefit-container">
          <div className="benefit-text-container">
            <img src="mentalhealth.svg" />
            <h4>Improve mental health</h4>
            <p>
              Over time gratitude practice has shown to foster positive
              well-being and less anxiety.
            </p>
          </div>
          <div className="benefit-text-container">
            <img src="relationships.svg" />
            <h4>Build strong relationships</h4>
            <p>
              Studies have demonstraed gratitude can increase relationship
              satisfaction.
            </p>
          </div>
          <div className="benefit-text-container">
            <img src="sleep.svg" />
            <h4>Sleep better and longer</h4>
            <p>
              Soothe your nervous system before bed for better and longer sleep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainLandingPage;
