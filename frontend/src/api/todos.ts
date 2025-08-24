import type { Todo, CreateTodoReq } from "@/types/todo";

const BASE = "http://localhost:8080/api/todos"; //BASE→他の関数から同じurlを書かずに済む

export async function fetchTodos() : Promise<Todo[]> {
    const res = await fetch(BASE, { method: "GET" });
    if (!res.ok) {
        throw new Error("タスク一覧の取得に失敗したよ!");
    }
    return res.json();
}

export async function createTodo(body: CreateTodoReq): Promise<Todo> {
    const res = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        throw new Error("タスクの追加に失敗したよ！");
    }
    return res.json();
}