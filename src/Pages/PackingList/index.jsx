{
  /*display added to packing list */
}
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";


 const API_URL = "http://localhost:5005";

function PackingList() {
  const [packing, setPacking] = useState([]);

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
    async function fetchPacking() {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/api/packing`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setPacking(response.data.packing);
      } catch (error) {
        console.error("Error getting packing:", error);
      }
    }

    fetchPacking();
  }, []);

  // Function to remove an item from the Packing list
  const removePackingItem = async (itemId) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/api/remove-from-packing/${itemId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const updatedPacking = packing.filter((item) => item._id !== itemId);
      await tokenUpdate();
      setPacking(updatedPacking);
    } catch (error) {
      console.error("Error removing from packing:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      
      localStorage.removeItem("packingList");

     
      setPacking([]);

      const response = await axios.delete(
        `${API_URL}/api/remove-from-packing/all`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      await tokenUpdate();

      if (response.status === 200) {
        console.log(
          "All packing items deleted successfully from local storage and backend."
        );
      } else {
        console.error("Error deleting packing items from backend.");
      }
    } catch (error) {
      console.error("Error deleting packing:", error);
    }
  };

  return (
    <div className="laundry-body">
    <div className="clothing-list added-list">
     <div className="centered">
       <h2>Packing List</h2>
       <button onClick={handleDeleteAll}>Clear</button>
      </div>
      <ol className="clothing-grid">
        {packing &&
          packing.map((clothing) => (
            <li key={clothing._id} className="clothing-item">
              <Link to={`/clothing/${clothing._id}`}>
                <img src={clothing.image} />
                <p>{clothing.title}</p>
              </Link>

              <button onClick={() => removePackingItem(clothing._id)} className="delete-list-item">
                <DeleteOutlineIcon />
              </button>
            </li>
          ))}
      </ol>
      
    </div>
    </div>
  );
}

export default PackingList;
