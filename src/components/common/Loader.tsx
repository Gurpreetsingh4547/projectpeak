import Loader from "../../assets/dot-loader.svg";

/**
 * DotLoader component displays a dot loader animation.
 * @returns {JSX.Element} Dot loader component
 */
const DotLoader = () => (
  // Dot loader component
  <img
    src={Loader} // Loader animation
    alt="Project Peak" // Accessibility description
    className="w-8 object-cover" // Responsive sizing
  />
);

export default DotLoader;
