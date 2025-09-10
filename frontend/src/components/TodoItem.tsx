import type { Todo } from "@/types/todo";
import { useState } from "react";

// 引数id=どのタスクを操作したかを特定するため、next=チェックの次の状態を伝える→該当タスクのcompletedを更新するため
type Props = {
  todo: Todo;
  onToggle?: (id: number, next: boolean) => void;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, newTitle: string) => void;
}; //onToggle=「切替イベントが発生したら呼ばれる関数」というニュアンス

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  const startEdit = () => {
    setDraft(todo.title);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(todo.title);
    setEditing(false);
  };

  const commitEdit = () => {
    const v = draft.trim();
    if (!v || v === todo.title) {
      setEditing(false);
      setDraft(todo.title);
      return;
    }
    onEdit?.(todo.id, v);
    setEditing(false);
  };

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
        gap: 12,
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          flex: 1, // ← 右の削除ボタンと間隔をあけるために、ラベル部分をできるだけ広げる
          userSelect: "none", // ← テキストの選択を防止
        }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggle?.(todo.id, e.currentTarget.checked)} //currentTarget=イベントが発生した要素(<input>要素)を指す(今回はcheckbox)
        />
        {!editing ? (
          <span
            onDoubleClick={startEdit}
            style={{
              fontWeight: 600,
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#6b7280" : "#111827",
              cursor: "pointer",
            }}
            title="ダブルクリックで編集"
          >
            {todo.title}
          </span>
        ) : (
          <input
            value={draft}
            onChange={(e) => setDraft(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") cancelEdit();
            }}
          />
        )}
      </label>

      {/* 作成日時 */}
      <div style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" }}>
        作成: {new Date(todo.createdAt).toLocaleString()}
      </div>

      {/* 編集ボタン */}
      {!editing && (
        <button
          onClick={startEdit}
          aria-label="このタスクを編集"
          title="編集"
          style={{
            border: "1px solid #bfdbfe",
            background: "#dbeafe",
            color: "#1e3a8a",
            borderRadius: 6,
            padding: "6px 8px",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          ✏️
        </button>
      )}

      {/* 削除ボタン */}
      <button
        onClick={() => onDelete?.(todo.id)}
        aria-label="このタスクを削除"
        title="削除"
        style={{
          border: "1px solid #fca5a5",
          background: "#fee2e2",
          color: "#991b1b",
          borderRadius: 6,
          padding: "6px 8px",
          fontSize: 12,
          cursor: "pointer",
        }}
      >
        🗑️
      </button>
    </li>
  );
}
//new Date(todo.createdAt)=文字列をDateオブジェクトに変換
