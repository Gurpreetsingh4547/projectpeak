import { FC } from "react";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrashCan,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// Packages
import { Button } from "../ui/button";

/**
 * A component that renders a UserCard.
 * @return {JSX.Element} The UserCard component
 */
const UserCard: FC = () => {
  return (
    <div className="bg-white shadow-md max-w-40 rounded-lg p-4">
      <div className="flex items-center flex-col">
        <div className="flex-shrink-0">
          <img
            className="h-20 w-20 border-red-500 border rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            alt={`Prince's profile picture`}
          />
        </div>
        <div className="flex flex-col text-center mt-5">
          <h2 className="text-lg leading-tight font-bold text-slate-900">
            Prince
          </h2>
          <p className="text-base text-gray-600">India</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <Button className="rounded-full w-10 h-8" title="Edit">
          <FontAwesomeIcon icon={faUserEdit as IconProp} />
        </Button>
        <Button className="rounded-full w-10 h-8" title="View">
          <FontAwesomeIcon icon={faEye as IconProp} />
        </Button>
        <Button className="rounded-full w-10 h-8" title="Delete">
          <FontAwesomeIcon icon={faTrashCan as IconProp} />
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
