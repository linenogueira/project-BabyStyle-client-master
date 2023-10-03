import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../index.css";

const API_URL = "https://style-script.onrender.com";
// const API_URL = "http://localhost:5005";

function ClothingListPage() {
  const [sortedClothing, setSortedClothing] = useState({});
  const [selectedWeatherFilter, setSelectedWeatherFilter] = useState("all"); // Default to "all" weather
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { clothingId } = useParams();


  useEffect(() => {
    async function fetchClothing() {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/api/clothing`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const clothingData = response.data;
        console.log(clothingData.userClothing);

        // Filter clothing items based on the selected weather filter
        const filteredClothing = clothingData.userClothing.filter(
          (clothing) => {
            return (
              selectedWeatherFilter === "all" ||
              clothing.season === "both" ||
              clothing.season === selectedWeatherFilter
            );
          }
        );

        // Filter clothing items by name based on search query (case-insensitive)
        const filteredByName = filteredClothing.filter(
          (clothing) =>
            clothing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            clothing.type.toLowerCase().includes(searchQuery.toLowerCase())
        );



        // Create an object to store clothing items sorted by type

        
        // Define the desired order of clothing types
      const desiredOrder = ["tops", "bottoms", "dress", "outerwear", "accessories", "shoes", "other"];

      // Create an object to store clothing items sorted by type in the desired order
      const sortedByType = {};

      // Initialize the object with empty arrays in the desired order
      desiredOrder.forEach(type => {
        sortedByType[type] = [];
      });

      // Iterate through the clothing items and push them into the corresponding type arrays
      filteredByName.forEach(item => {
        sortedByType[item.type].push(item);
      });

      setSortedClothing(sortedByType);
    } catch (error) {
      console.error("Error fetching clothing:", error);
    }
  }

    fetchClothing();
  }, [selectedWeatherFilter, searchQuery]);

  const handleWeatherFilterChange = (filter) => {
    setSelectedWeatherFilter(filter);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  

  return (
    <div className="clothing-body">
      <div className="search-bars">
        <div className="clothing-filters add-button">
          <Link to="/clothing/create">
            <button>Add Clothing</button>
          </Link>
        </div>
        <div className="clothing-filters search-bar weather-search">
          <label>Weather:</label>
          <select
            onChange={(e) => handleWeatherFilterChange(e.target.value)}
            value={selectedWeatherFilter}
          >
            <option value="all">All</option>
            <option value="warm">Warm</option>
            <option value="cold">Cold</option>
          </select>
        </div>
        <div class="clothing-filters search-bar clothing-search">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      {/* Display clothing items */}
      {Object.entries(sortedClothing).map(([type, items]) => (
        <div key={type} className="clothing-list">
          <h2>{type.toUpperCase()}</h2>
          <div className="clothing-grid">
            {items.map((clothing) => (
              <div key={clothing._id} className="clothing-item">
                <Link to={`/clothing/${clothing._id}`}>
                  <img src={clothing.image} alt={clothing.title} />
                  <div className="card-content">
                    <h3 className="clothing-title">{clothing.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClothingListPage;

/*import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://style-script.onrender.com";

function ClothingListPage() {
  const [clothing, setClothing] = useState([]);
  const [tops, setTops] = useState([]);

  const filterClothingByType = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await axios.get(`${API_URL}/api/clothing`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      console.log("response data:", response.data);
      const filter = response.data.forEach((element) => {
        if (element.type === "tops") {
            filter.push(element);
          setTops(...filter, filter);
        }
      }); 

      /* const filter = response.data.filter((clothing) => {clothing.type === "tops"})
      console.log("filter", filter);
      setTops(filter); 
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/clothing`)
      .then((response) => setClothing(response.data))
      .catch((error) => console.log(error));

    filterClothingByType();
    
    /* if(response.data.type === "jeans" ,  
  }, []);
 console.log("tops", tops);
  return (
    <div>
      {clothing &&
        clothing.map((clothing) => {
          return (
            <div key={clothing._id}>
              <Link to={`/clothing/${clothing._id}`}>
                <img src={clothing.image} width={200} height={250} />
                <h3>{clothing.title}</h3>
              </Link>
            </div>
          );
        })}
      {/* {tops && tops.map((tops)=>{
            return(
                <div key={tops._id}>
                    <h1>TOPS</h1>
                   <Link to={`/clothing/${tops._id}`}>
                     <img src={tops.image} width={200} height={250}/>
                    <h3>{tops.title}</h3>

                    
                   </Link> 
                </div>
            )
          })}  
    </div>
  );
}

export default ClothingListPage; */
