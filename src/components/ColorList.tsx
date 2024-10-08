import React from "react";
import "../styles/ColorList.scss";

interface ColorListProps {
  filters: {
    red: boolean;
    green: boolean;
    blue: boolean;
    saturation: boolean;
  };
  colors: string[];
  onColorRemove: (color: string) => void;
}

const fixedColors = ["#FF0000", "#00FF00", "#0000FF"];

const getRGBFromHex = (hex: string): { r: number; g: number; b: number } => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
};

export const ColorList: React.FC<ColorListProps> = ({
  filters,
  colors,
  onColorRemove,
}) => {
  const applyFilters = (color: string): boolean => {
    const { r, g, b } = getRGBFromHex(color);
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);
    return (
      (!filters.red || r > 127) &&
      (!filters.green || g > 127) &&
      (!filters.blue || b > 127) &&
      (!filters.saturation || saturation > 127)
    );
  };

  const allColors = [...fixedColors, ...colors];

  const sortedColors = allColors.filter(applyFilters).sort((a, b) => {
    const rgbA = getRGBFromHex(a);
    const rgbB = getRGBFromHex(b);
    return rgbB.r - rgbA.r || rgbB.g - rgbA.g || rgbB.b - rgbA.b;
  });

  return (
    <div className="color-list">
      {sortedColors.map((color) => (
        <div key={color} className="color-item">
          <div className="color-box" style={{ backgroundColor: color }}></div>
          <p>{color}</p>
          {fixedColors.includes(color) ? null : (
            <button onClick={() => onColorRemove(color)}>Remove</button>
          )}
        </div>
      ))}
    </div>
  );
};
