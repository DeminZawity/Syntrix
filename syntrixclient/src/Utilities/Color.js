export function getContrastColor(hexColor) {
    // Convert hex color to RGB
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Calculate the relative luminance against white
    const luminanceWhite = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
    // Set a luminance threshold for determining white visibility
    const luminanceThreshold = 0.5;
  
    // Return white if the luminance is below the threshold, otherwise return black
    if (luminanceWhite <= luminanceThreshold) {
      return "white";
    } else {
      return "black";
    }
  }

  const ColorUtility = {
    getContrastColor
}

export default ColorUtility;