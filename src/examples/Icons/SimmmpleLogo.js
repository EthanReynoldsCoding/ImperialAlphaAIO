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
        href="https://media.discordapp.net/attachments/1238306251084009533/1238306353265770496/Inspired_Alpha_Logo_Transparent.png?ex=66401fa9&is=663ece29&hm=7ebb3e8df7fcec0276275f7a435df3731a01df52dd1b82dccabae9e0bd44d266&=&format=webp&quality=lossless&width=810&height=468"
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
