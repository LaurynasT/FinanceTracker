import { useEffect, useState } from "react";
import Transaction from "../Components/Transactions/Transaction";
import { fetchBalance } from "../services/transactionService";
import { useUserStore } from "../store/UserStore";
import { Card } from "../Components/Card/Card";

export default function Homepage() {
  const [balance, setBalance] = useState<number>();
  const { selectedUserId } = useUserStore();
  async function getBalance() {
    if (selectedUserId === null) return;
    const data = await fetchBalance(selectedUserId);
    setBalance(data);
  }
  useEffect(() => {
    getBalance();
  });
  return (
    <div>
      <div className="flex justify-center bg-slate-900">
        <Card>
          <h1 className="text-center pt-2">Balance</h1>

          <p className="flex-1 flex items-center justify-center text-2xl">
            {balance}€
          </p>
        </Card>
      </div>
      <Transaction onChanged={getBalance} />
    </div>
  );
}
