import type { User } from "../../Interfaces/User";
import { deleteUser } from "../../services/userService";
import { useNotificationStore } from "../../store/ErrorStore";

type Props = {
  user: User | null;
  onCancel: () => void;
  onDeleted: () => void;
};

export default function DeleteUser({ user, onCancel, onDeleted }: Props) {
  const {showSuccess} = useNotificationStore();
  if (!user) return null;

  async function handleDelete() {
    if (!user) return;
      await deleteUser(user.id);
      await onDeleted(); 
      showSuccess(`User ${user.name} was deleted`)
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
