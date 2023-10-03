import React, { useState } from "react";


function HomePage() {
  
  return (
    <div>

    <div className="home-hero">
      <div className="hero-text">
        
      <h1>Baby Closet Planner</h1>
      </div>
    </div>
  
     
   
    <div className="sections">
    <section className="features">
      <div>
        <article>
          <h3>Organize your clothes</h3>
          <img src="/images/babyorganize.jpg" alt="" width={300}/>
        </article>
        <article>
          <h3>Keep track of laundry</h3>
          <img src="/images/BabyLaundry.jpg" alt="" width={300}/>
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