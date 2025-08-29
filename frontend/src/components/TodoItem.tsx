import type { Todo } from "@/types/todo";

type Props = { todo: Todo };

export default function TodoItem({ todo }: Props) {
  return (
    <li
      style={{
        padding: 12,
        border: "1px solid #e5e7eb", // ← 薄い枠線（#dddでもOK）
        borderRadius: 8,
        background: "#f9fafb", // ← 背景を少し明るいグレーに
        color: "#111827", // ← テキストはしっかり濃く
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>
          {todo.title} {todo.completed ? "✅" : ""}
        </div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>
          作成: {new Date(todo.createdAt).toLocaleString()}
        </div>
      </div>
    </li>
  );
}
//new Date(todo.createdAt)=文字列をDateオブジェクトに変換
