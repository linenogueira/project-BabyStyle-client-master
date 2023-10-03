import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

const API_URL = "http://localhost:5005";  

function ProjectDetailsPage(props){
    const [project, setProject] = useState(null);
    // to get the URL parameter `:projectId`
    const { projectId } = useParams();
    console.log(project)
    //helper function that makes a GET reequest to the API and retrieves the project by id
    const getProject = () => {
        axios
            .get(`${API_URL}/api/projects/${projectId}`)
            .then((response) =>{
                const oneProject = response.data;
                setProject(oneProject);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getProject();
    }, []);

    return (
        <div className="ProjectDetails">
            {project && (
                <>
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                </>
            )}

            <AddTask refreshProject={getProject} projectId={projectId} />  

            {project &&
                project.tasks.map((task) => (
                    // <li className="TaskCard card" key={task._id}>
    
                    //     <h3>{task.title}</h3>
                    //     <h4>Description:</h4>
                    //     <p>{task.description}</p>
                    // </li>
                    // another way to do it:
                    <TaskCard key={task._id} {...task} />

                ))}
                 <Link to="/projects">
                    <button>Back to projects</button>
                </Link>
                <Link to={`/projects/edit/${projectId}`}>
                    <button>Edit Project</button>
                </Link>
        </div>
    );
}

export default ProjectDetailsPage;