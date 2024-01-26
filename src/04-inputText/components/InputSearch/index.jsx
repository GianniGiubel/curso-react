import './styles.css';

export const InputSearch = ({searchValue, handleChange}) => {
  return (
    <input
      className='inputSearch' 
      placeholder='Search'
      type="search"
      onChange={handleChange} 
      value={searchValue}
    />  
  );
}