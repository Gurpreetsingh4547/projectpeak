// Packages
import { number, string } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IsEqual } from "@/service/helper";

// Interface
interface CardProps {
  title?: string;
  taskDone?: number;
  totalTask?: number;
}

/**
 * This function represents a CardComponent that displays information about Total Revenue.
 * @param {string} title - The title of the card.
 * @return {JSX.Element} The rendered CardComponent.
 */
const CardComponent: React.FC<CardProps> = ({
  title = "Total Task Done",
  taskDone = 0,
  totalTask = 0,
}) => {
  /**
   * Calculates the percentage of a partial value relative to a total value.
   * @param {number} partialValue - The partial value to calculate the percentage of.
   * @param {number} totalValue - The total value to calculate the percentage against.
   * @return {number} The calculated percentage as a decimal.
   */
  const getPercentage = (partialValue: number = 0, totalValue: number = 0) => {
    if (IsEqual(totalValue, 0) || IsEqual(partialValue, 0)) return 0;
    return (100 * partialValue) / totalValue;
  };

  return (
    <Card className="min-w-60 mb-5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <FontAwesomeIcon icon={faChartSimple as IconProp} className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {taskDone}/{totalTask}
        </div>
        <p className="text-xs text-muted-foreground">
          {getPercentage(taskDone, totalTask)}% done from last month
        </p>
      </CardContent>
    </Card>
  );
};

/**
 * Component Prop Types
 */
CardComponent.propTypes = {
  title: string,
  taskDone: number,
  totalTask: number,
};

export default CardComponent;
