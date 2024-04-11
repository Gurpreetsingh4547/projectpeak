import { FC, useState } from "react";

// Components
import UserCard from "./UserCard";
import { Button } from "../ui/button";
import Slider from "../common/Modal/Slider";

/**
 * Renders the UsersListing component.
 */
const UsersListing: FC = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        </div>
        <Button
          className="rounded-full h-8"
          variant="outline"
          onClick={() => setIsAddUserOpen(true)}
        >
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>

      {/* Add User Slider */}
      <Slider isVisible={isAddUserOpen} setIsVisible={setIsAddUserOpen} />
    </div>
  );
};

export default UsersListing;
