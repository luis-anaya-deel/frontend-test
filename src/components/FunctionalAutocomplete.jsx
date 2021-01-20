import React, { useState } from "react";
import "./Autocomplete.css";

const FunctionalAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (e.target.value) {
      fetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.length > 0) {
            const countries = json.map((el) => el.name);
            const filteredNames = countries.filter((name) =>
              name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSuggestions(filteredNames);
          } else {
            setSuggestions([]);
          }
        });
      setShowSuggestions(true);
    }
  };

  const handleNameClick = (e) => {
    setUserInput(e.target.innerText);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (suggestions.length > 0) {
      suggestionsListComponent = (
        <ul className="autocomplete-suggestions">
          {suggestions.map((suggestion) => {
            var regex = new RegExp(userInput, "gi");
            const suggestionString = suggestion.replace(
              regex,
              (str) => `<>${str}<>`
            );
            return (
              <li key={suggestion} onClick={handleNameClick}>
                {suggestionString.split("<>").map((el, index) => {
                  if (el.toLowerCase() === userInput.toLowerCase()) {
                    return <b key={`${el}-${index}`}>{el}</b>;
                  }
                  return el;
                })}
              </li>
            );
          })}
        </ul>
      );
    }
  }
  return (
    <div className="autocomplete-container">
      <h3>Functional Component with API (Countries)</h3>
      <input
        type="text"
        onChange={handleInputChange}
        value={userInput}
        className="autocomplete-input"
      />
      {suggestionsListComponent}
    </div>
  );
};

export default FunctionalAutocomplete;
