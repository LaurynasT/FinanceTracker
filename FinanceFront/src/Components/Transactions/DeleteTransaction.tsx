import type { Transaction } from "../../Interfaces/Transaction";
import { useNotificationStore } from "../../store/ErrorStore";
import { deleteTransaction } from "../../services/transactionService";

type Props = {
  transaction: Transaction;
  onCancel: () => void;
  onRefreshed: () => void;
  onChanged: () => void;
};

export default function DeleteTransaction({ transaction, onCancel, onRefreshed, onChanged }: Props) {
    const {showSuccess} = useNotificationStore();
  async function handleDelete() {
    if (!transaction) return;
      await deleteTransaction(transaction.id);
      await onRefreshed();
      await onChanged(); 
      showSuccess(`Transaction ${transaction.name} was deleted`)
  }
  return (
    <div className="p-4">
      <p className="mb-4">
        Are you sure you want to delete <b>{transaction.name}</b>?
      </p>

      <div className="flex gap-2">
        <button
          className="bg-red-700 text-white px-3 py-1 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>

        <button className="bg-gray-300 px-3 py-1 rounded" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
