import type { Transaction } from "../../Interfaces/Transaction";
import TransactionItem from "./TransactionItem";
type Props = {
  transaction: Transaction[];
  onRefreshed: () => void;
  onChanged: () => void;
};

export default function TransactionList({ transaction, onRefreshed, onChanged }: Props) {
  return (
    <div className="mt-2 mt-5 rounded-sm w-full shadow-xl/40 pb-1 ">
  
      <div className="grid grid-cols-7 gap-30 ml-5 w-full">
        <p className="ml-2">Name</p>
        <p className="ml-2">Amount</p>
        <p className="ml-2 ">Description</p>
        <p className="ml-2">Type</p>
        <p className="ml-2">Category</p>
        <p className="ml-2">Created</p>
        <p className="mr-2">Actions</p>
      </div>

      <div>
        <hr className="w-[98%] h-1 mx-auto my-4 bg-gray-300 border-0 rounded-sm md:" />
      </div>
      {transaction.map((t) => (
        <div key={t.id}>
          <TransactionItem 
          transaction={t}
           onRefreshed={onRefreshed}
           onChanged={onChanged} />
        </div>
      ))}
      
    </div>
  );
}
