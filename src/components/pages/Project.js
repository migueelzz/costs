import { parse, v4 as uuidv4 } from 'uuid';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Project.module.css';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';

import ProjectForm from '../project/ProjectForm';

import ServiceForm from '../service/ServiceForm';

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
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

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function editPost(project) {
    setMessage('')
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

  function createService(project) {
    // last service
    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    // maximum value validation
    if(newCost > parseFloat(project.budget)) {
      setMessage('Budget exceeded, check the value of the service.')
      setType('error')
      project.services.pop()
      return false
    }
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
            <div className={styles.serviceFormContainer}>
                <h2>Add service</h2>
                <button className={styles.btn} onClick={toggleServiceForm}>
                  {!showServiceForm ? 'Add service' : 'Close'}
                </button>
                <div className={styles.projectInfo}>
                  {showServiceForm && (
                    <ServiceForm
                      handleSubmit={createService}
                      btnText="Add service"
                      projectData={project}
                    />
                  )}            
                </div>
            </div>
            <h2>Services</h2>
            <Container customClass="start">
                <p>Service items</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Project;

