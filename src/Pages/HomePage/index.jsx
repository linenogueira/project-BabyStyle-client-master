import React, { useState } from "react";
const API_URL = "http://localhost:5005";

function HomePage() {
  
  return (
    <div>

    <div className="home-hero">
      <div className="hero-text">
        
      <h1>Your Closet Planner</h1>
      </div>
    </div>
  
     
   
    <div className="sections">
    <section className="features">
      <div>
        <article>
          <h3>Organize your clothes</h3>
          <img src="/images/Folded-clothing.jpg" alt="" width={300}/>
        </article>
        <article>
          <h3>Keep track of laundry</h3>
          <img src="/images/laundry.jpg" alt="" width={300}/>
        </article>
      
        
      </div>
    </section>
    </div>
    <footer className="footer">
    
        <div className="footer-text">
          
        
      </div>

    </footer>
  
    </div>
  );
}

export default HomePage;