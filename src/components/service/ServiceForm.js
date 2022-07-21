import React from 'react'
import { useState } from 'react';

import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';

import styles from '../project/ProjectForm.module.css';

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({});

  const submit = (e) => {
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input 
        type="text"
        text="Service name"
        name="name"
        placeholder="Enter the service name"
        handleOnChange={handleChange}
      />
      <Input 
        type="number"
        text="Service cost"
        name="cost"
        placeholder="Enter the total cost"
        handleOnChange={handleChange}
      /> 
      <Input 
        type="text"
        text="Service description"
        name="description"
        placeholder="Describe the service"
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ServiceForm;
