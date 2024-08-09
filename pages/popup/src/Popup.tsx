import { withErrorBoundary, withSuspense } from "@extension/shared";
import { userStorage } from "@extension/storage";
import { Button, Select } from "@extension/ui";
import { FC, useEffect, useState } from "react";
import { Activity } from "./types";
import { startActivity } from "./lib/activities";

const Popup: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<Activity>("woodcutting");

  const handleStartActivity = () => {
    switch (selectedActivity) {
      case "woodcutting":
        return startActivity("woodcutting");
      default:
        return;
    }
  };

  useEffect(() => {
    const getUserName = async () => {
      const user = await userStorage.get();
      setUsername(user.name);
    };

    getUserName();
  }, []);

  return (
    <div className="flex w-full flex-col h-screen bg-gray-800 p-4">
      <header className="w-full text-2xl text-white text-center">Hello, {username}!</header>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="selectSkill" className="text-gray-300 text-sm">
          Select skill you want to run in background:
        </label>

        <Select
          id="skillSelect"
          name="skillSelect"
          defaultValue="woodcutting"
          onChange={e => setSelectedActivity(e.target.value as Activity)}>
          <option value="woodcutting">Woodcutting</option>

          <option value="mining">Mining</option>
        </Select>

        <Button type="button" className="w-fit" onClick={handleStartActivity}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
