import type { Todo } from "@/types/todo";

type Props = { todo: Todo };

export default function TodoItem({ todo }: Props) {
  return (
    <li
      style={{
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ fontWeight: 600 }}>
          {todo.title} {todo.completed ? "✅" : ""}
        </div>
        <div style={{ fontSize: 12, color: "#666" }}>
          作成: {new Date(todo.createdAt).toLocaleString()}
        </div>
      </div>
    </li>
  );
}
