import React, { useState } from "react";
import AddColorForm from "./components/AddColorForm";
import { FilterForm } from "./components/FilterForm";
import { ColorList } from "./components/ColorList";
import "./App.scss";

interface Filters {
  red: boolean;
  green: boolean;
  blue: boolean;
  saturation: boolean;
}

const App: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    red: false,
    green: false,
    blue: false,
    saturation: false,
  });

  const [colors, setColors] = useState<string[]>(
    JSON.parse(localStorage.getItem("colors") || "[]")
  );

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleColorAdd = (newColor: string) => {
    setColors((prevColors) => {
      const updatedColors = [...prevColors, newColor];
      localStorage.setItem("colors", JSON.stringify(updatedColors));
      return updatedColors;
    });
  };

  const handleColorRemove = (colorToRemove: string) => {
    setColors((prevColors) => {
      const updatedColors = prevColors.filter(
        (color) => color !== colorToRemove
      );
      localStorage.setItem("colors", JSON.stringify(updatedColors));
      return updatedColors;
    });
  };

  return (
    <div className="App">
      <h1>Color Manager</h1>
      <AddColorForm onColorAdd={handleColorAdd} />
      <FilterForm onFilterChange={handleFilterChange} />
      <ColorList
        filters={filters}
        colors={colors}
        onColorRemove={handleColorRemove}
      />
    </div>
  );
};

export default App;
