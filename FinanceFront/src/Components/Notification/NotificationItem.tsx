import type { Notification } from "../../Interfaces/Notification";
type Props = {
  notification: Notification;
  remove: (id: string) => void;
};

export default function NotificationItem({ notification, remove }: Props) {
  const isError = notification.type === "error";

  return (
    <div
      onClick={() => remove(notification.id)}
      className={`
        flex flex-wrap items-center
        min-h-[40px]
        max-w-full
        px-4 py-2
        mb-2
        rounded-sm
        shadow-md
        cursor-pointer
        font-medium
        break-words
        border-l-[6px]
        bg-white

        ${isError
          ? "border-red-700 text-red-700"
          : "border-green-600 text-green-700"}
      `}
    >
      {notification.message}
    </div>
  );
}