import TodoItem from "./TodoItem";
import type { Todo } from "@/types/todo";

type Props = { todos: Todo[] }; //Todo=１件のタスク(id, title, completed, createdAt, updatedAt)、todos=Todoの配列

export default function TodoList({ todos }: Props) {
  if (todos.length === 0) return <p>タスクはありません</p>; //処理が1行の場合、{}は省略可能
  return (
    <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
      {todos.map((task) => (
        <TodoItem key={task.id} todo={task} /> //task=mapの1要素の仮の名前(変数名)
      ))}
    </ul>
  );
}
