import React from "react";
import { SearchProps } from "./types";

const Search: React.FC<SearchProps> = (title) => {
  return (
    <h3>{title}</h3>
  );
};

export default Search;
