import { useState } from 'react';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = e => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (keyword.trim() === '') {
      return;
    }
    onSubmit(keyword);
    setKeyword('');
  };

  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="keyWord"
          value={keyword}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}