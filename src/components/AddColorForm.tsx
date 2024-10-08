import React, { ChangeEvent, FormEvent } from "react";
import "../styles/AddColorForm.scss";

interface AddColorFormProps {
  onColorAdd: (newColor: string) => void;
}

interface AddColorFormState {
  color: string;
  error: string;
}

class AddColorForm extends React.Component<
  AddColorFormProps,
  AddColorFormState
> {
  constructor(props: AddColorFormProps) {
    super(props);
    this.state = {
      color: "",
      error: "",
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value.toUpperCase();
    const isValidHexChar = /^#[0-9A-F]*$/.test(inputValue);

    if (inputValue.length <= 7 && isValidHexChar) {
      this.setState({ color: inputValue, error: "" });
    } else if (!isValidHexChar) {
      this.setState({ error: "Invalid characters!" });
    } else {
      this.setState({ error: "Color too long!" });
    }
  };

  handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const { color } = this.state;

    if (/^#[0-9A-F]{6}$/.test(color)) {
      this.props.onColorAdd(color);
      this.setState({ color: "", error: "" });
      alert("Color added successfully!");
    } else {
      this.setState({ error: "Invalid HEX format!" });
    }
  };

  render() {
    const { color, error } = this.state;

    return (
      <form className="add-color-form" onSubmit={this.handleSubmit}>
        <label htmlFor="color">Add HEX Color:</label>
        <input
          id="color"
          type="text"
          value={color}
          onChange={this.handleChange}
          placeholder="#000000"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Add Color</button>
      </form>
    );
  }
}

export default AddColorForm;
