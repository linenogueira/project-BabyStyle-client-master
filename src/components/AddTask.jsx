import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddTask(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // we need the project id when creating a new task
        const { projectId } = props;
        // create an object representing the body of the POST request
        const requestBody = { title, description, projectId };

        axios
            .post(`${API_URL}/api/tasks`, requestBody)
            .then((response) => {
                // reset the state to clear the inputs
                setTitle("");
                setDescription("");
                // invoke the callback function coming through the props from the projectDetailsPage, to refresh the project details
                props.refreshProject();
            })
            .catch((error) => console.log(error));
    };
    
    return(
        <div className="AddTask">
        <h3>Add New Task</h3>
        
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
   
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
   
          <button type="submit">Add Task</button>
        </form>
      </div> 
    )
}

export default AddTask;