import styles from './Select.module.css';

function Select({ text, name, options, handleOnchange, value }) {
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name}>
        <option>Select options</option>
      </select>
    </div>
  )
}

export default Select;