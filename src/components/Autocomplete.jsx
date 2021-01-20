import React, { Component } from "react";
import "./Autocomplete.css";
import names from "./names";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      showSuggestions: false,
      userInput: "",
    };
  }

  getSuggestions = (value) => {
    const filteredNames = names.filter((name) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    return new Promise(function (myResolve, myReject) {
      setTimeout(() => {
        myResolve(filteredNames);
      }, 500);
    });
  };

  handleInputChange = async (e) => {
    this.setState({
      userInput: e.target.value,
    });
    const suggestions = await this.getSuggestions(e.target.value);
    this.setState({
      suggestions,
      showSuggestions: true,
    });
  };

  handleNameClick = (e) => {
    this.setState({
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.target.innerText,
    });
  };

  render() {
    const { suggestions, showSuggestions, userInput } = this.state;

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
                <li key={suggestion} onClick={this.handleNameClick}>
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
        <h3>Class Component with Mock response (Names)</h3>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={userInput}
          className="autocomplete-input"
        />
        {suggestionsListComponent}
      </div>
    );
  }
}

export default Autocomplete;
