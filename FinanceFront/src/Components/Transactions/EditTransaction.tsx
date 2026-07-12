import { useUserStore } from "../../store/UserStore";
import { fetchData } from "../../api/Api";
import React, { useEffect, useState } from "react";
import type { Transaction } from "../../Interfaces/Transaction";
import { useNotificationStore } from "../../store/ErrorStore";
import type { Category } from "../../Interfaces/Category";
import { updateTransaction } from "../../services/transactionService";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { tr } from "zod/locales";

type Props = {
  id: number;
  transaction: Transaction;
  onCancel: () => void;
  onRefreshed: () => void;
  onChanged: () => void;
};
export default function EditTransaction({
  onCancel,
  onRefreshed,
  id,
  transaction,
  onChanged,
}: Props) {
  const { selectedUserId } = useUserStore();
  const [category, setCategoryValue] = useState<Category[] | null>(null);
  const { showSuccess, showError } = useNotificationStore();
  
  const CreateSchema = z.object({
    name: z
      .string()
      .min(1, "Name cannot be empty must be atleast 1 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim(),
    description: z
      .string()
      .min(1, "Description cannot be empty must be atleast 1 characters")
      .max(50, "Description cannot exceed 50 characters")
      .trim(),
    amount: z.number().positive("Amount cannot be negative"),
    type: z.enum(["Income", "Expense"], {
      message: "Please select a type",
    }),
    category: z.string().nonempty({ message: "Please select a category" }),
  });
  type TransactionForm = z.infer<typeof CreateSchema>;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionForm>({
    resolver: zodResolver(CreateSchema),
    defaultValues: {
      name: transaction.name,
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.category.type as "Income" | "Expense",
      category: String(transaction.category.id),
    },
  });
  const selectedType = watch("type");
  async function fetchCategories() {
    try {
      const response = await fetchData<Category[]>("/category", undefined, {
        type: selectedType,
      });

      setCategoryValue(response);
    } catch (err) {
      showError("Failed to fetch Categories");
    }
  }
  useEffect(() => {
    fetchCategories();
  }, [selectedType]);
  async function editTransaction(data: TransactionForm) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("amount", String(data.amount));
    formData.append("userId", String(selectedUserId));
    formData.append("categoryId", data.category);

    await updateTransaction(formData, id);
    await onRefreshed();
    await onChanged();

    showSuccess(`Transaction ${data.name} was updated`);
  }

  return (
    <form
      className="w-180 h-100 flex flex-col"
      onSubmit={handleSubmit(editTransaction)}
    >
      <h1 className="text-lg">
        <strong>Edit Transaction</strong>
      </h1>
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col">
          <p className="mt-4">
            <strong>Name</strong>
          </p>
          <input
            {...register("name")}
            className="mt-2 border rounded-sm w-70 h-9"
          />

          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <p className="mt-4">
            <strong>Amount</strong>
          </p>
          <input
            type="number"
            {...register("amount", { valueAsNumber: true })}
            className="mt-2 border rounded-sm w-70 h-9"
          />

          {errors.amount && (
            <p className="text-red-500">{errors.amount.message}</p>
          )}
          <p className="mt-4">
            <strong>Description</strong>
          </p>
          <input
            {...register("description")}
            className="mt-2 border rounded-sm w-70 h-9"
          />

          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <p className="mt-4">
            <strong>Select Type</strong>
          </p>
          <select
            {...register("type")}
            className="w-70 border rounded-sm mt-2 h-9"
          >
            <option value="">Select type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
          <p className="mt-4">
            <strong>Select Category</strong>
          </p>
          <select
            {...register("category")}
            disabled={!watch("type")}
            className="w-70 border rounded-sm mt-2 h-9"
          >
            <option value="">Select category</option>

            {category?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-auto">
        <button
          className="ml-2 border border-gray-300 rounded-sm w-20 h-10 bg-sky-500"
          type="submit"
        >
          Update
        </button>
        <button
          className="ml-2 border border-gray-300 rounded-sm w-20 h-10 "
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
