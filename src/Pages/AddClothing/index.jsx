import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://style-script.onrender.com";
// const API_URL = "http://localhost:5005";

function AddClothing() {
  // State Declaration
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageOption, setImageOption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [careInstructions, setCareInstructions] = useState("");
  const [season, setSeason] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  // Handle Image Option Change
  const handleImageOptionChange = (e) => {
    setImageOption(e.target.value);
  };

  //handle fileUpload
  const handleFileUpload = (e) => {
    //format options

    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', "image/webp"];

    const file = e.target.files[0];
  
    if (!file) {
      // Handle the case where no file is selected.
      return;
    }
  
    if (!allowedFormats.includes(file.type)) {
      // Display an error message to the user for invalid format.
      console.log("Invalid image format. Please select a valid image file.");
      return;
    }
  
    console.log("The file to be uploaded is: ", file);

    //handle upload
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/api/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response is: ", response);
        setImageFile(response.data.image);
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // Handle Submit Function
  function handleSubmit(e) {
    e.preventDefault();

    // If the user selected "upload," use the uploaded file
    // If the user selected "URL," use the entered URL
    const imageToUse = imageOption === "upload" ? imageFile : imageUrl;

    const requestBody = {
      title,
      description,
      image: imageToUse,
      type,
      color,
      brand,
      size,
      careInstructions,
      season,
    };
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/api/clothing/create`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setTitle("");
        setDescription("");
        //setImage("");
        if (imageOption === "upload") {
          setImageFile(null);
        } else {
          setImageUrl("");
        }
        setType("");
        setColor("");
        setBrand("");
        setSize("");
        setCareInstructions("");
        setSeason("");
      })
      .then(() => navigate("/clothing"))
      .catch((error) => console.log(error));
  }
  return (
    <div className="clothing-create">
      <form onSubmit={handleSubmit}>
        <div className="radio-buttons">
          <label>
            Image:
            <input
              type="radio"
              name="imageOption"
              value="upload"
              checked={imageOption === "upload"}
              onChange={handleImageOptionChange}
            />
            Upload
          </label>
          <label>
            <input
              type="radio"
              name="imageOption"
              value="url"
              checked={imageOption === "url"}
              onChange={handleImageOptionChange}
            />
            URL
          </label>
        </div>

        {imageOption === "upload" ? (
          <div>
            <label>
              <input type="file" name="image" onChange={handleFileUpload} />
            </label>
          </div>
        ) : (
          <div>
            <label>
              URL:
              <input
                type="text"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
          </div>
        )}
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>

        {/*Create select 7 options for type */}
        <label>
          Type:
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value=""></option>
            <option value="tops">Top</option>
            <option value="bottoms">Bottom</option>
            <option value="dress">Dress</option>
            <option value="outerwear">Outerwear</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
            <option value="other">Other</option>
          </select>
        </label>
        {/*Create select 3 options for season*/}
        <label>
          Weather:
          <select
            name="season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value=""></option>
            <option value="both">Both</option>
            <option value="warm">Warm</option>
            <option value="cold">Cold</option>
          </select>
        </label>
        {/*Create  a label for care instructions*/}
        <label>
          Care Instructions:
          <input
            type="text"
            name="careInstructions"
            value={careInstructions}
            onChange={(e) => setCareInstructions(e.target.value)}
          />
        </label>
        {/*Create label for size*/}
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </label>

        <br />
        <button type="submit">Add Clothing</button>
      </form>
    </div>
  );
}

export default AddClothing;
