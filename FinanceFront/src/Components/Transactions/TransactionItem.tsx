import type { Transaction } from "../../Interfaces/Transaction";
import Edit from "../../assets/edit.png";
import Delete from "../../assets/delete.png";
import Modal from "../Modal/Modal";
import DeleteTransaction from "./DeleteTransaction";
import EditTransaction from "./EditTransaction";
import { useState } from "react";
type Props = {
  transaction: Transaction;
  onRefreshed: () => void;
  onChanged: () => void;
};

export default function TransactionItem({ transaction, onRefreshed, onChanged }: Props) {
  type ModalType = "edit" | "delete" | null;
  const [openModal, setOpenModal] = useState<ModalType>(null);

  return (
    <div className=" items-center ml-10 mt-2 mb-5 w-full grid grid-cols-7 gap-25 ">
      
        <p>{transaction.name}</p>
        <p>{transaction.amount}</p>
        <p className="truncate">{transaction.description}</p>
        <p>{transaction.category.type}</p>
        <p>{transaction.category.name}</p>
        <p>{new Date(transaction.date).toLocaleDateString()}</p>
      
      <div className="flex gap-2 mr-9">
        <button onClick={() => setOpenModal("edit")}>
          <img src={Edit} alt="edit" />
        </button>

        <button onClick={() => setOpenModal("delete")}>
          <img src={Delete} alt="delete" />
        </button>
      </div>
      <Modal open={openModal === "delete"} onClose={() => setOpenModal(null)}>
        <DeleteTransaction
          transaction={transaction}
          onCancel={() => setOpenModal(null)}
          onChanged={onChanged}
          onRefreshed={() => {
            onRefreshed();
            setOpenModal(null);
          }}
        />
      </Modal>
      <Modal open={openModal === "edit"} onClose={() => setOpenModal(null)}>
        <EditTransaction 
        id={transaction.id}
        transaction={transaction}
        onCancel={() => setOpenModal(null)}
        onChanged={onChanged}
        onRefreshed={() => {
          onRefreshed();
          setOpenModal(null);
        }}
        />
      </Modal>
    </div>
  );
}
