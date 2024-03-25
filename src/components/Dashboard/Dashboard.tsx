// Components
import CardComponent from "../common/Card";

/**
 * Renders the Dashboard component.
 * @return {JSX.Element} The CardComponent to be rendered.
 */
const Dashboard = () => {
  return (
    <div className="flex flex-wrap justify-between">
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
    </div>
  );
};

export default Dashboard;
