import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
  return (
    <div className={styles.newProjectContainer}>
      <h1>Create Project</h1>
      <p>create your project and then add the services</p>
      <ProjectForm btnText="Create Project" />
    </div>
  )
}

export default NewProject;