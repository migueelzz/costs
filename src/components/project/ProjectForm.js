import Input from '../Form/Input';
import Select from '../Form/Select';
import SubmitButton from '../Form/SubmitButton';
import styles from './ProjectForm.module.css'

function ProjectForm({ btnText }) {
  return (
    <form className={styles.form}>
        <Input type="text" text="Project name" name="name" placeholder="Enter project name" />
        <Input type="number" text="project budget" name="budget" placeholder="Enter project budget" />
        <Select name="category_id" text="Select category" />
        <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm;