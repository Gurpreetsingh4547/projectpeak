import { FC, useState } from "react";

// Components
import { Button } from "../ui/button";
import Slider from "../common/Modal/Slider";
import UserForm from "./UserForm";
import LocalStorageUtil from "@/service/localStorage";

/**
 * Renders the UsersListing component.
 */
const UserProfile: FC = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const currentLoginUser = LocalStorageUtil.getObject("USER");

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

      <>
        <div className="grid max-w-3xl gap-1 lg:grid-cols-2 lg:gap-6 xl:gap-1">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">
                  {currentLoginUser?.full_name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">Admin</p>
              </div>
            </div>
            <h4 className="text-lg font-bold">User details</h4>
          </div>
          <div>
            <h4 className="text-sm font-bold">Email:</h4>
            <div className="text-blue-400 dark:text-blue-400">
              {currentLoginUser?.email}
            </div>
          </div>
        </div>
      </>

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
