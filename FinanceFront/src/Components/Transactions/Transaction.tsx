import { fetchData } from "../../api/Api";
import type { Transaction } from "../../Interfaces/Transaction";
import { useEffect, useState } from "react";
import { useNotificationStore } from "../../store/ErrorStore";
import { useUserStore } from "../../store/UserStore";
import TransactionList from "./TransactionList";
import Modal from "../Modal/Modal";
import CreateTransaction from "./CreateTransaction";

type Props = {
  onChanged: () => Promise<void>;
}

export default function Transaction({onChanged} : Props) {
  type ModalType = "create" | null;
  const [transactions, setTransaction] = useState<Transaction[] | null>(null);
  const { showSuccess, showError } = useNotificationStore();
  const { selectedUserId } = useUserStore();
  const [openModal, setOpenModal] = useState<ModalType>(null);

  async function loadTransactions() {
    try {
      const data = await fetchData<Transaction[]>(
        `/transactions/${selectedUserId}`,
      );
      setTransaction(data);
      showSuccess("Fetched");
    } catch (err) {
      showError("Failed to fetch");
      setTransaction([]);
    }
  }
  useEffect(() => {
    if (!selectedUserId) return;
    loadTransactions();
  }, [selectedUserId]);

  return (
    <div className="flex flex-col items-center mt-5 gap-4">
      <div className="w-[89%]  flex justify-between items-center">
        <h1 className="text-lg font-semibold">Transactions</h1>

        <button
          onClick={() => setOpenModal("create")}
          className="bg-slate-900 text-white px-3 py-1 rounded"
        >
          Add Transaction
        </button>
      </div>

      <div className="flex justify-center w-full">
        <div className="w-[85%] ">
          {transactions?.length ? (
            <TransactionList
              transaction={transactions}
              onRefreshed={loadTransactions}
              onChanged={onChanged}
            />
          ) : (
            <p className="text-center text-gray-500 mt-10">No Transactions</p>
          )}
        </div>
      </div>

      <Modal open={openModal === "create"} onClose={() => setOpenModal(null)}>
        <CreateTransaction
          onCancel={() => setOpenModal(null)}
          onChanged={onChanged}
          onRefreshed={async () => {
            await loadTransactions();
            setOpenModal(null);
          }}
        />
      </Modal>
    </div>
  );
}
