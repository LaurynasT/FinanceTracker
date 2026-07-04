import { postData } from "../../services/Api";
import type { User } from "../../Interfaces/User";
import React from "react";
import { useNotificationStore } from "../../store/ErrorStore";

type Props = {
  user: User | null;
  onCancel: () => void;
  onCreated: () => void;
};

export default function CreateUser({ user, onCancel, onCreated }: Props) {
  const [value, setValue] = React.useState<string>('')
  const [balanceValue, setBalanceValue] = React.useState<number>(0)
  const { showSuccess, showError } = useNotificationStore();
  if (!user) return null;
  async function createUser() {
    if (!user) return;
    try {
      const formData = new FormData();
      formData.append("name", value);
      formData.append("balance", String(balanceValue));
      await postData<User>(`/users/create`, formData);
      await onCreated();
      showSuccess("Created")
    } catch (err) {
      showError("Failed to create user");
    }
  }
  return (
    <div className="p-4 w-100 h-30">
      <div className="flex flex-col ">
        <div className="flex flex-row">
        <p className="mr-2" >Name:</p>
        <input
          className="text-black w-50"
          placeholder="Enter Name"
          onChange={(e) => setValue(e.target.value)}
        />
        </div>
        <div className="flex flex-row mt-2">
        <p className="mr-2" >Balance:</p>
        <input
          className="text-black w-50"
          placeholder="Enter your starting balance"
          onChange={(e) => setBalanceValue(Number(e.target.value))}
        />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-red-700 text-white px-3 py-1 rounded"
          onClick={createUser}
        >
          Create
        </button>

        <button className="bg-gray-300 px-3 py-1 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
