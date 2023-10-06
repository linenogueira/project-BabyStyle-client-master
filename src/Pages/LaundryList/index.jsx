{
  /*display added to laundry list */
}
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

 const API_URL = "http://localhost:5005";

function LaundryList() {
  const [laundry, setLaundry] = useState([]);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const tokenUpdate = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(`${API_URL}/auth/updateToken`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      storeToken(response.data.authToken);
      await authenticateUser();
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    async function fetchLaundry() {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/api/laundry`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setLaundry(response.data.laundry);
      
      } catch (error) {
        console.error("Error getting laundry:", error);
      }
    }

    fetchLaundry();
  }, []);

  // Function to remove an item from the laundry list
  const removeLaundryItem = async (itemId) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/api/remove-from-laundry/${itemId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      // After successfully removing the item, update the laundry list
      const updatedLaundry = laundry.filter((item) => item._id !== itemId);
      await tokenUpdate();
      setLaundry(updatedLaundry);
    } catch (error) {
      console.error("Error removing from laundry:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      localStorage.removeItem("laundryList");
      setLaundry([]);
      const response = await axios.delete(
        `${API_URL}/api/remove-from-laundry/all`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      await tokenUpdate();

      if (response.status === 200) {
        console.log(
          "All laundry items deleted successfully from local storage and backend."
        );
      } else {
        console.error("Error deleting laundry items from backend.");
      }
    } catch (error) {
      console.error("Error deleting laundry:", error);
    }
  };

  return (
    <div className="laundry-body">
    <div className="clothing-list added-list">
      <div className="centered">
        <h2>Laundry List</h2>
        <button onClick={handleDeleteAll}>Clear</button>
      </div>
      <ol className="clothing-grid">
        {laundry &&
          laundry.map((clothing) => (
            <li key={clothing._id} className="clothing-item-added">
              <Link to={`/clothing/${clothing._id}`}>
                <img src={clothing.image} />
                <p>{clothing.title}</p>
                <p>{clothing.careInstructions}</p>
              </Link>

              <button onClick={() => removeLaundryItem(clothing._id)} className="delete-list-item">
                <DeleteOutlineIcon />
              </button>
            </li>
          ))}
      </ol>
     
    </div>
    </div>
  );
}

export default LaundryList;
