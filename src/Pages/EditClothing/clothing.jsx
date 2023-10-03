{/* Edit clothing */}
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

const API_URL = 'https://style-script.onrender.com';
// const API_URL = "http://localhost:5005";

function EditClothing() {

    // State Declarations
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [imageOption, setImageOption] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');
    const [careInstructions, setCareInstructions] = useState('');
    const [season, setSeason] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');

    const {clothingId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/api/clothing/${clothingId}`)
        .then((response) => {
            const oneClothing = response.data;
            setTitle(oneClothing.title);
            setDescription(oneClothing.description);
            setImageUrl(oneClothing.image);
            setImageFile(oneClothing.image);
            setBrand(oneClothing.brand);
            setSize(oneClothing.size);
            setCareInstructions(oneClothing.careInstructions);
            setSeason(oneClothing.season);
            setType(oneClothing.type);
            setColor(oneClothing.color);
        })
        .catch((error) => console.log(error))
    } , [clothingId])
     
    //handle image option change

     const handleImageOptionChange = (e) => {
        setImageOption(e.target.value);
      };
    
    
      //handle fileUpload
      const handleFileUpload = (e) => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const imageToUse = imageOption === "upload" ? imageFile : imageUrl;

        const requestBody = {title, description, image: imageToUse, type, color, brand, size, careInstructions, season}

        axios.put(`${API_URL}/api/clothing/edit/${clothingId}`, requestBody)
        .then(()=>{
            setTitle('');
            setDescription('');
            setImage('');
            setBrand('');
            setSize('');
            setCareInstructions('');
            setSeason('');
            setType('');
            setColor('');
            navigate('/clothing')
        })
        .catch((error) => console.log(error))
    }

    return (
           <div className='clothing-create'>
            <form onSubmit={handleSubmit}>
            <div className='radio-buttons'>
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
                    Upload Image:
                    <input
                    type="file"
                    name="image"
                    onChange={handleFileUpload}
                    />
                </label>
                </div>
            ) : (
                <div>
                <label>
                    Image URL:
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
                    <input type="text" name='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </label>
                <label>
                    Description:
                    <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    Brand:
                    <input type="text" name='brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
                </label>
                {/*Create select 7 options for type */}
                <label>
                    Type:
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="tops">Top</option>
                        <option value="bottoms">Bottom</option>
                        <option value="dress">Dress</option>
                        <option value="outerwear">Outerwear</option>
                        <option value="shoes">Shoes</option>
                        <option value="accessories">Accessories</option>
                        <option value="other">Other</option>  
                        
                    </select>
                </label>
                <label>
                Weather:
                <select name="season" value={season} onChange={(e) => setSeason(e.target.value)}>
                    <option value="warm">Warm</option>
                    <option value="cold">Cold</option>
                    <option value="both">Both</option>
                </select>
                </label>
                {/*Create  a label for care instructions*/}
                <label>
                    Care Instructions:
                    <input type="text" name='careInstructions' value={careInstructions} onChange={(e) => setCareInstructions(e.target.value)} />
                </label>
                {/*Create label for size*/}
                <label>
                    Size:
                    <input type="text" name='size' value={size} onChange={(e) => setSize(e.target.value)} />
                </label>

            <br/>
            <button type='submit'>Edit Clothing</button>
            </form>
        </div>
    )
}

export default EditClothing

