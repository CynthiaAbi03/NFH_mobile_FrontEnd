import { Dimensions, PixelRatio } from "react-native";

const getResponsive = (valueinPixels, deviceDimension) => {

    const dimension = Dimensions.get('window')[deviceDimension];
    // console.log('hmmmm', dimension)
    const valuePercentage = valueinPixels / dimension;
    return dimension * valuePercentage;

  }

  export {getResponsive}