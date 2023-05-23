import { createGlobalStyle } from "styled-components";

import Gilroy_Bold from "./Gilroy-Bold.woff";
import Gilroy_Light from "./Gilroy-Light.woff";
import Gilroy_Medium from "./Gilroy-Medium.woff";
import Gilroy_Regular from "./Gilroy-Regular.woff";

export default createGlobalStyle`
    @font-face {
        font-family: 'Gilroy-Bold';
        src: local('Gilroy-Bold.woff'), local('Gilroy-Bold.woff'),
        url(${Gilroy_Bold}) format('truetype');
        font-weight: 200;
        font-style: normal;
    };
    @font-face {
        font-family: 'Gilroy-Light';
        src: local('Gilroy-Light.woff'), local('Gilroy-Light.woff'),
        url(${Gilroy_Light}) format('truetype');
        font-weight: 200;
        font-style: normal;
    };
    @font-face {
        font-family: 'Gilroy-Medium';
        src: local('Gilroy-Medium.woff'), local('Gilroy-Medium.woff'),
        url(${Gilroy_Medium}) format('truetype');
        font-weight: 200;
        font-style: normal;
    };
    @font-face {
        font-family: 'Gilroy';
        src: local('Gilroy-Regular.woff'), local('Gilroy-Regular.woff'),
        url(${Gilroy_Regular}) format('truetype');
        font-weight: 200;
        font-style: normal;
    };
`;