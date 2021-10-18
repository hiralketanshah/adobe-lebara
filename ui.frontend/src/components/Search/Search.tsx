import React from "react";
import { SearchProps } from "./types";

const Search: React.FC<SearchProps> = ({searchRoot}) => {
console.log("Search Component")
  return (
    {searchRoot}
  );
};

export default Search;