import type { User } from "../../Interfaces/User";
import React from "react";
import { putUser } from "../../services/userService";
import { useNotificationStore } from "../../store/ErrorStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
  user: User;
  onCancel: () => void;
  onEdited: () => void;
};

export default function EditUser({ user, onCancel, onEdited }: Props) {
  const { showSuccess } = useNotificationStore();

  const CreateSchema = z.object({
    name: z
      .string()
      .min(1, "Name cannot be empty must be atleast 1 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim(),
  });
  type UserForm = z.infer<typeof CreateSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(CreateSchema),
    defaultValues: {
    name: user.name,
  },

  });
  if (!user) return null;
  async function handleEdit(data: UserForm) {
    const id = user?.id;
    const formData = new FormData();
    formData.append("name", data.name);
    await putUser(formData, id);
    await onEdited();
    showSuccess(`User name was changed to ${data.name}`);
  }
  return (
    <form className="p-4 w-100 min-h-30" onSubmit={handleSubmit(handleEdit)}>
      <div className="flex flex-row">
        <p className="mr-2 text-black">Name:</p>
        <div className="flex flex-col">
        <input
        {...register("name")}
          className="text-black border rounded-sm text-black"
        />
        {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-red-700 text-white px-3 py-1 rounded"
          type="submit"
        >
          Edit
        </button>

        <button className="bg-gray-300 px-3 py-1 rounded" onClick={onCancel} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
}
