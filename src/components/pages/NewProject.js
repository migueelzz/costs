import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

import { useNavigate } from "react-router-dom";

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    // initialize cost and service
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then(((res) => res.json()))
    .then((data) => {
      console.log(data);
      // redirect
      navigate('/projects', {state:{message: 'Project created successfully!'}})
    })
    .catch((err) => err.json());
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>Create Project</h1>
      <p>create your project and then add the services</p>
      <ProjectForm handleSubmit={createPost} btnText="Create Project" />
    </div>
  )
}

export default NewProject;