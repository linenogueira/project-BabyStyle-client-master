import React, { useState } from "react";


function HomePage() {
  
  return (
    <div>

    <div className="home-hero">
      <div className="hero-text">
        
      <h1>Personal Closet Planner</h1>
      </div>
    </div>
     
    <div className="homePage">
     
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
          <img src="/images/laundry-image.jpg" alt="" width={300}/>
        </article>
        <article>
          <h3>Create your packing list</h3>
          <img src="/images/luggage.jpg" alt="" width={300}/>
        </article>
        
      </div>
    </section>

    </div>
    <footer className="footer">
      <div >
        <div className="footer-text">
          
        
        
        </div>
      </div>

    </footer>
  
    </div>
  );
}

export default HomePage;