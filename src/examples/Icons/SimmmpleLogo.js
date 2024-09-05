/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master/LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

function SimmmpleLogo({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        href="https://github.com/EthanReynoldsCoding/ImperialAlphaAIO/blob/d89e0749367dc513511cd4c19754fb3a957454da/150%20x%20150%20png.png"
        width={size}
        height={size}
      />
    </svg>
  );
}

SimmmpleLogo.propTypes = {
  size: PropTypes.string.isRequired,
};

export default SimmmpleLogo;
