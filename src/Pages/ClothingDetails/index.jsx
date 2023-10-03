import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";


import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const API_URL = "https://style-script.onrender.com";
// const API_URL = "http://localhost:5005";

function ClothingDetailsPage() {
  const [clothing, setClothing] = useState(null);
  const navigate = useNavigate();
  const { clothingId } = useParams();
  const [isInLaundry, setIsInLaundry] = useState(false);
  const [noteContent, setNoteContent] = useState("");

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
    async function fetchClothing() {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(
          `${API_URL}/api/clothing/${clothingId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const oneClothing = response.data;
        setClothing(oneClothing);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClothing();
  }, [clothingId]);

  const refreshClothing = () => {
    async function fetchUpdatedClothing() {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(
          `${API_URL}/api/clothing/${clothingId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const updatedClothing = response.data;
        setClothing(updatedClothing);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUpdatedClothing();
  };

  const addToLaundry = () => {
    async function addToLaundryRequest() {
      try {
        const storedToken = localStorage.getItem("authToken");
        await axios.post(
          `${API_URL}/api/clothing/add-to-laundry/${clothingId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        refreshClothing();
        await tokenUpdate();
        navigate("/clothing");
      } catch (error) {
        console.log(error);
      }
    }
    addToLaundryRequest();
  };

  const deleteClothing = () => {
    async function deleteClothingRequest() {
      try {
        const storedToken = localStorage.getItem("authToken");
        await axios.delete(`${API_URL}/api/clothing/delete/${clothingId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        navigate("/clothing");
      } catch (error) {
        console.log(error);
      }
    }
    deleteClothingRequest();
  };

  const createNote = () => {
    async function createNoteRequest() {
      try {
        const storedToken = localStorage.getItem("authToken");
        await axios.post(
          `${API_URL}/api/note/create/${clothingId}`,
          { content: noteContent },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        refreshClothing();
        setNoteContent("");
      } catch (error) {
        console.log(error);
      }
    }
    createNoteRequest();
  };
  const [editedNoteId, setEditedNoteId] = useState(null);
  const [editedNoteContent, setEditedNoteContent] = useState("");

  // Function to edit a note
  const editNote = (noteId, currentContent) => {
    setEditedNoteId(noteId);
    setEditedNoteContent(currentContent);
  };

  // Function to save edited note
  const saveEditedNote = async (noteId) => {
    async function editNoteRequest() {
      try {
        const storedToken = localStorage.getItem("authToken");
        await axios.put(
          `${API_URL}/api/note/update/${clothingId}/${noteId}`,
          { content: editedNoteContent },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        refreshClothing();
        setEditedNoteId(null);
      } catch (error) {
        console.log(error);
      }
    }
    editNoteRequest();
  };

  const deleteNote = (noteId) => {
    async function deleteNoteRequest() {
      try {
        const storedToken = localStorage.getItem("authToken");
        await axios.delete(
          `${API_URL}/api/note/delete/${clothingId}/${noteId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        refreshClothing();
      } catch (error) {
        console.log(error);
      }
    }

    // Prompt the user for confirmation before deleting the note
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      deleteNoteRequest();
    }
  };

  return (
    <div className="clothing-details-container">
    <div className="clothing-details">
      {clothing && (
        <div>
          <img src={clothing.image} width={200} height={250} />
          <h3>{clothing.title}</h3>
          <Link to={`/clothing/edit/${clothingId}`}>
            <button>Edit</button>
          </Link>
          <button onClick={deleteClothing}>Delete</button>

        
      

        
         { clothing.type && (<p><strong>Type:</strong> {clothing.type}</p>)}
         { clothing.description &&   (<p><strong>Description:</strong>{clothing.description}</p>)}

         { clothing.brand &&  (<p><strong>Brand:</strong>{clothing.brand}</p>)}
         {clothing.size && (<p><strong>Size:</strong> {clothing.size}</p> )}
         { clothing.careInstructions && (<p><strong>Care Label:</strong> {clothing.careInstructions}</p> )}
         { clothing.season && (<p><strong>Weather:</strong>  {clothing.season}</p> )}

        

          <button onClick={addToLaundry} disabled={isInPacking}>
            <DryCleaningIcon />
            {/*  {isInPacking ? "Added to Packing" : "Add to Packing"} */}
          </button>

          
          

           {/* Add Note */}
           <div className="clothing-details-body">
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Enter your note"
            />
            <button onClick={createNote} className="button-note"><ModeEditOutlineOutlinedIcon/></button>
          </div>

          {/* Display notes */}
          <ul>
            {clothing.note.map((note) => (
              <li key={note._id}>
                {editedNoteId === note._id ? (
                  <>
                    <textarea
                      value={editedNoteContent}
                      onChange={(e) => setEditedNoteContent(e.target.value)}
                      placeholder={note.content}
                    />
                    <button onClick={() => saveEditedNote(note._id)}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {note.content}
                    <button onClick={() => editNote(note._id, note.content)} className="button-note"><ModeEditOutlineOutlinedIcon/>
                      
                    </button>
                    <button onClick={() => deleteNote(note._id)} className="button-note"> <DeleteOutlineIcon/>
                     
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>

         
        </div>
        
      )}

      
    </div>
    </div>
  );
}

export default ClothingDetailsPage;
