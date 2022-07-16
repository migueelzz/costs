import { useEffect, useState } from 'react';

import Input from '../Form/Input';
import Select from '../Form/Select';
import SubmitButton from '../Form/SubmitButton';
import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setCategories(data);
    })
    .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    // console.log(project)
    handleSubmit(project);
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({ ...project, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
      }
    })
  }


  return (
    <form onSubmit={submit} className={styles.form}>
        <Input 
          type="text" 
          text="Project name" 
          name="name" 
          placeholder="Enter project name"
          handleOnchange={handleChange}
          value={project.name ? project.name : ''}
          />
        <Input 
          type="number" 
          text="project budget" 
          name="budget" 
          placeholder="Enter project budget"
          handleOnchange={handleChange}
          value={project.budget ? project.budget : ''}
          />
        <Select 
          name="category_id"
          text="Select category" 
          options={categories} 
          handleOnchange={handleCategory}
          value={project.category ? project.category.id : ''}
          />
        <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm;