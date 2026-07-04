import { deleteData } from "../../services/Api";
import type { User } from "../../Interfaces/User";

type Props = {
  user: User | null;
  onCancel: () => void;
  onDeleted: () => void;
};

export default function DeleteUser({ user, onCancel, onDeleted }: Props) {
  if (!user) return null;

  async function handleDelete() {
    if (!user) return;
    try {
      await deleteData(`/users/${user.id}`);
      await onDeleted(); 
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  }

  return (
    <div className="p-4">
      <p className="mb-4">
        Are you sure you want to delete <b>{user.name}</b>?
      </p>

      <div className="flex gap-2">
        <button
          className="bg-red-700 text-white px-3 py-1 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>

        <button className="bg-gray-300 px-3 py-1 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
