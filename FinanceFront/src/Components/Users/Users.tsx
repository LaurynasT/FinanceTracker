import { fetchData } from "../../services/Api";
import React, { useEffect, useState } from "react";
import type { User } from "../../Interfaces/User";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import Modal from "../Modal/Modal";
import CreateUser from "./CreateUser";
import { useNotificationStore } from "../../store/ErrorStore";

export default function User() {
  type ModalType = "edit" | "delete" | "create" | null;

  const [users, setUsers] = useState<User[] | null>(null);
  
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

const { showSuccess, showError } = useNotificationStore();


  async function loadUsers() {
    try {
      const data = await fetchData<User[]>("/users", undefined, {});
      setUsers(data);
      if (data.length > 0) {
        setSelectedUserId(data[0].id);
      }

        showSuccess("Fetched!");
    } catch {
      showError("Failed to fetch");
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const selectedUser = users?.find((u) => u.id === selectedUserId) ?? null;

  return (
    <div className="mt-5 ml-5">
      <select
        className="w-50 border rounded-sm"
        value={selectedUserId ?? ""}
        onChange={(e) => setSelectedUserId(Number(e.target.value))}
      >
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button className="ml-2 bg-green-400 w-25 border rounded-sm border-solid"  onClick={() => setOpenModal("create")}>
        Add User
      </button>
      <button
        className="ml-2 bg-blue-400 w-25 border rounded-sm border-solid cursor-pointer"
        onClick={() => setOpenModal("edit")}
      >
        Edit User
      </button>

      <button
        className="ml-2 bg-red-400 w-25 border rounded-sm cursor-pointer"
        onClick={() => setOpenModal("delete")}
      >
        Delete User
      </button>

        <Modal open={openModal === "create"} onClose={() => setOpenModal(null)}>
        <CreateUser
          user={selectedUser}
          onCancel={() => setOpenModal(null)}
          onCreated={async () => {
            await loadUsers();
            setOpenModal(null);
          }}
        />
      </Modal>
      <Modal open={openModal === "edit"} onClose={() => setOpenModal(null)}>
        <EditUser
          user={selectedUser}
          onCancel={() => setOpenModal(null)}
          onEdited={async () => {
            await loadUsers();
            setOpenModal(null);
          }}
        />
      </Modal>

      <Modal open={openModal === "delete"} onClose={() => setOpenModal(null)}>
        <DeleteUser
          user={selectedUser}
          onCancel={() => setOpenModal(null)}
          onDeleted={async () => {
            await loadUsers();
            setOpenModal(null);
          }}
        />
      </Modal>
    </div>
  );
}
