import type { Todo } from "@/types/todo";

// 引数id=どのタスクを操作したかを特定するため、next=チェックの次の状態を伝える→該当タスクのcompletedを更新するため
type Props = { todo: Todo; onToggle?: (id: number, next: boolean) => void }; //onToggle=「切替イベントが発生したら呼ばれる関数」というニュアンス

export default function TodoItem({ todo, onToggle }: Props) {
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
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggle?.(todo.id, e.currentTarget.checked)} //currentTarget=イベントが発生した要素(<input>要素)を指す(今回はcheckbox)
        />
        <span style={{ fontWeight: 600 }}>{todo.title}</span>
      </label>
      <div style={{ fontSize: 12, color: "#6b7280" }}>
        作成: {new Date(todo.createdAt).toLocaleString()}
      </div>
    </li>
  );
}
//new Date(todo.createdAt)=文字列をDateオブジェクトに変換
