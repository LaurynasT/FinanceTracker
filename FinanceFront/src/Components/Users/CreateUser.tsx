import type { User } from "../../Interfaces/User";
import React from "react";
import { useNotificationStore } from "../../store/ErrorStore";
import { postUser } from "../../services/userService";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {
  user: User | null;
  onCancel: () => void;
  onCreated: () => void;
};

export default function CreateUser({ user, onCancel, onCreated }: Props) {
  const { showSuccess } = useNotificationStore();

  const CreateSchema = z.object({
    name: z
      .string()
      .min(1, "Name cannot be empty must be atleast 1 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim(),
    balance: z.number().positive("Ammount cannot be negative"),
  });
  type UserForm = z.infer<typeof CreateSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(CreateSchema),
  });
  if (!user) return null;
  async function createUser(data: UserForm) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("balance", String(data.balance));
    await postUser(formData);
    await onCreated();
    showSuccess(`User ${data.name} was created`);
  }
  return (
    <form className="p-4 w-100 min-h-30" onSubmit={handleSubmit(createUser)}>
      <div className="flex flex-col ">
        <div className="flex flex-row">
          <p className="mr-2 text-black">Name:</p>
          <div className="flex flex-col">
          <input
            {...register("name")}
            className="text-black w-70 border rounded-sm"
            placeholder="Enter Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          </div>
        </div>
        <div className="flex flex-row mt-2">
          <p className="mr-2 text-black">Balance:</p>
          <div className="flex flex-col">
          <input
            {...register("balance", { valueAsNumber: true })}
            type="number"
            className="text-black w-70 border rounded-sm"
            placeholder="Enter your balance"
          />
          {errors.balance && (
            <p className="text-red-500 text-sm">{errors.balance.message}</p>
          )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-red-700 text-white px-3 py-1 rounded"
          type="submit"
        >
          Create
        </button>

        <button
          className="bg-gray-300 px-3 py-1 rounded"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
