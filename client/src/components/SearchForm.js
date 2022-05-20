import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchTerm.trim() !== '') {
      setErrorMsg('');
      props.handleSearch(searchTerm);
    } else {
      setErrorMsg('Please enter a search term.');
    }
  };

  return (
    <Form onSubmit={handleSearch} style={{ display: "flex", width: "80%", justifyContent: "center", alignItems: "center" }}>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form.Group controlId="formBasicEmail" style={{ width: "30%", padding: "10px" }}>
        <Form.Control
          type="search"
          name="searchTerm"
          value={searchTerm}
          placeholder="Search for song, album, artist or playlist"
          onChange={handleInputChange}
          autoComplete="off"
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;