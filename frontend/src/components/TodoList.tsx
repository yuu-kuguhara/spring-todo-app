import TodoItem from "./TodoItem";
import type { Todo } from "@/types/todo";

type Props = {
  todos: Todo[];
  onToggle?: (id: number, next: boolean) => void;
  onDelete?: (id: number) => void;
}; //Todo=１件のタスク(id, title, completed, createdAt, updatedAt)、todos=Todoの配列

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) return <p>タスクはありません</p>; //処理が1行の場合、{}は省略可能
  return (
    <ul
      style={{
        display: "grid",
        gap: 12, // ← 少し広めの間隔
        listStyle: "none",
        padding: 0,
        margin: 0, // ← 親と重ならないように
      }}
    >
      {todos.map((task) => (
        <TodoItem
          key={task.id}
          todo={task}
          onToggle={onToggle}
          onDelete={onDelete}
        /> //task=mapの1要素の仮の名前(変数名)
      ))}
    </ul>
  );
}
