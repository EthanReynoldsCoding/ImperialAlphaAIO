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
        href="https://cdn.discordapp.com/attachments/970882949241262160/1282122601069543425/15020x2015020png.png?ex=66de3538&is=66dce3b8&hm=1ef1338c81ec97d652ac82bf8d317c7f114982ee2fca419972057060ac58ebc8&"
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
