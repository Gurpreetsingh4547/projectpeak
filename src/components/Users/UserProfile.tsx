import { FC, useState } from "react";

// Components
import { Button } from "../ui/button";
import Slider from "../common/Modal/Slider";
import UserForm from "./UserForm";

/**
 * Renders the UsersListing component.
 */
const UserProfile: FC = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Profile</h2>
        </div>
        <Button
          className="rounded-full h-8"
          variant="outline"
          onClick={() => setIsAddUserOpen(true)}
        >
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        hello
      </div>

      {/* Add User Slider */}
      <Slider
        title="Add User"
        isVisible={isAddUserOpen}
        setIsVisible={setIsAddUserOpen}
        content={
          <>
            <UserForm setIsVisible={setIsAddUserOpen} />
          </>
        }
        showFooter={false}
      />
    </div>
  );
};

export default UserProfile;
