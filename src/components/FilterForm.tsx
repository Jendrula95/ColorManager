import React, { ChangeEvent } from "react";
import "../styles/FilterForm.scss";

interface FilterFormProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  red: boolean;
  green: boolean;
  blue: boolean;
  saturation: boolean;
}

export const FilterForm: React.FC<FilterFormProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<Filters>({
    red: false,
    green: false,
    blue: false,
    saturation: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    const updatedFilters = { ...filters, [name]: checked };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <form className="filter-form">
      <label>
        <input
          type="checkbox"
          name="red"
          checked={filters.red}
          onChange={handleChange}
        />
        Red &gt; 50%
      </label>
      <label>
        <input
          type="checkbox"
          name="green"
          checked={filters.green}
          onChange={handleChange}
        />
        Green &gt; 50%
      </label>
      <label>
        <input
          type="checkbox"
          name="blue"
          checked={filters.blue}
          onChange={handleChange}
        />
        Blue &gt; 50%
      </label>
      <label>
        <input
          type="checkbox"
          name="saturation"
          checked={filters.saturation}
          onChange={handleChange}
        />
        Saturation &gt; 50%
      </label>
    </form>
  );
};
