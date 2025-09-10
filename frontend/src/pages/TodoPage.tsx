import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";
import {
  createTodo,
  fetchTodos,
  updateTodoCompleted,
  deleteTodo,
  updateTodoTitle,
} from "@/api/todos";
import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setTodos(await fetchTodos());
      } catch (e: unknown) {
        //unknown=何が入ってくるか分からないことを表す型、チェックなしには使用不可
        setError(e instanceof Error ? e.message : "一覧の取得に失敗しました！");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAdd(title: string) {
    try {
      const saved = await createTodo({ title });
      setTodos((prev) => [saved, ...prev]); //新しいタスクを先頭に追加
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "タスクの追加に失敗しました！");
    }
  }

  // 完了トグルロジック
  async function handleToggle(id: number, next: boolean) {
    const prev = todos;
    setTodos(
      prev.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: next } : todo
      ) //map=配列の各要素に対して関数を実行し、その結果からなる新しい配列を返す
    );
    //楽観的UI更新(サーバの応答を待たずに先に画面を更新する手法)
    try {
      const updated = await updateTodoCompleted(id, next);
      setTodos((curr) => curr.map((todo) => (todo.id === id ? updated : todo)));
    } catch (e: unknown) {
      setTodos(prev); //失敗したら元に戻す
      setError(e instanceof Error ? e.message : "タスクの更新に失敗しました！");
    }
  }

  // 削除ロジック
  async function handleDelete(id: number) {
    if (!confirm("本当に削除しますか??")) return;
    const prev = todos;
    setTodos(prev.filter((todo) => todo.id !== id)); //filter=条件に合う要素だけを抽出して短いかもしれない新配列を返す(残すならtrue, 捨てるならfalse)
    try {
      await deleteTodo(id);
    } catch (e: unknown) {
      setTodos(prev); //失敗したら元に戻す
      setError(e instanceof Error ? e.message : "タスクの削除に失敗しました！");
    }
  }

  // 編集ロジック
  async function handleEdit(id: number, newTitle: string) {
    const title = newTitle.trim();
    if (!title) return; //フロント側簡易ガード

    const prev = todos;
    setTodos(
      prev.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
    );
    try {
      const updated = await updateTodoTitle(id, title);
      setTodos((curr) =>
        curr.map((todo) => (todo.id === id ? updated : todo))
      );
    } catch (e: unknown) {
      setTodos(prev);
      setError(e instanceof Error ? e.message : "タスクの編集に失敗しました！");
    }
  }

  return (
    <div
      style={{
        position: "fixed", // 画面全体を覆う
        inset: 0, // top:0, right:0, bottom:0, left:0 の短縮
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // 真ん中にしたければ "center"
        padding: 24,
        background: "#f7f7f8", // 明るい背景
        overflowY: "auto", // 縦スクロール
        boxSizing: "border-box",
        textAlign: "left", // #root の text-align: center を打ち消す
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: 640,
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 2px 10px rgba(0,0,0,.06)",
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 16,
            color: "#374151",
          }}
        >
          ToDoApp
        </h1>
        <AddTodoForm onAdd={handleAdd} />
        {/* 条件付きレンダリング */}
        {loading && <p>読み込み中...</p>}{" "}
        {/* ロード中(loading=true)のときのみ表示 */}
        {error && <p style={{ color: "crimson", marginBottom: 8 }}>{error}</p>}
        {/* エラー時のみ赤字で表示 */}
        {!loading && (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        {/* ロード完了後に一覧を描画 */}
      </main>
    </div>
  );
}
