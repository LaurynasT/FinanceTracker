import NotificationItem from "./NotificationItem";
import { useNotificationStore } from "../../store/ErrorStore";

export default function NotificationList() {
  const { list, remove } = useNotificationStore();

  return (
    <div className="fixed top-4 right-4 w-80 z-50">
      {list.map((n) => (
        <NotificationItem
          key={n.id}
          notification={n}
          remove={remove}
        />
      ))}
    </div>
  );
}