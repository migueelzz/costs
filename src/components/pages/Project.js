import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Project.module.css';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';

import ProjectForm from '../project/ProjectForm';

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      },
    })
    .then(res => res.json())
    .then(data => {
      setProject(data)
    })
    .catch(err => console.log(err));
  }, [id])

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function editPost(project) {
    // budget validation
    if (project.budget < project.cost) {
      // message
      setMessage('The project budget cannot be less than the project cost!')
      setType('error');
      return false
    }

    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then(res => res.json())
    .then((data) => {
      setProject(data)
      setShowProjectForm(false)
      // message
      setMessage('Updated project!')
      setType('success');
    })
    .catch(err => console.log(err))
  }
  
  return (
    <>
      {project.name ? (
        <div className={styles.projectDetails}>
          <Container customClass="column">
            {message && <Message type={type} msg={message}/>}
            <div className={styles.detailsContainer}>
              <h1>Project: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Edit Project' : 'Close'}
              </button>
              {!showProjectForm ? (
                <div className={styles.projectInfo}>
                  <p>
                    <span>Category: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Total budget: </span> ${project.budget}
                  </p>
                  <p>
                    <span>Total used: </span> ${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.projectInfo}>
                  <ProjectForm 
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project;

