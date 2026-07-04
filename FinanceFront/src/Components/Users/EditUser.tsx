import { putData } from "../../services/Api";
import type { User } from "../../Interfaces/User";
import React from "react";

type Props = {
  user: User | null;
  onCancel: () => void;
  onEdited: () => void;
};

export default function EditUser({ user, onCancel, onEdited }: Props) {
  const [value, setValue] = React.useState<string>('')
  if (!user) return null;
  async function handleEdit() {
    if (!user) return;
    try {
      const formData = new FormData();
      formData.append("name", value);
      await putData<User>(`/users/${user.id}`, formData);
      await onEdited();
    } catch (err) {
      console.error("Failed to edit user", err);
    }
  }
  return (
    <div className="p-4 w-100 h-30">
      <div className="flex flex-row">
        <p className="mr-2" >Name:</p>
        <input
          className="text-black"
          defaultValue={user.name}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-red-700 text-white px-3 py-1 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>

        <button className="bg-gray-300 px-3 py-1 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
