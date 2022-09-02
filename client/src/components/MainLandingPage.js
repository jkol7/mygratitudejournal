import React from 'react';
import {Link} from 'react-router-dom';

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
    </section>
  );
}

export default MainLandingPage;
