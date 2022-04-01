import { createGlobalStyle } from 'styled-components';
import RobotoRegular from './fonts/Roboto/Roboto-Regular.ttf'
import RobotoBold from './fonts/Roboto/Roboto-Bold.ttf';
import Rhaikane from './fonts/Rhaikane/Rhaikane.ttf';

/////////////////////////// FONT ///////////////////////////
export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Roboto Regular';
  src: url(${RobotoRegular}) format('truetype');
}
@font-face {
  font-family: 'Roboto Bold';
  src: url(${RobotoBold}) format('truetype');
}
@font-face {
  font-family: 'Rhaikane';
  src: url(${Rhaikane}) format('truetype');
}
`;