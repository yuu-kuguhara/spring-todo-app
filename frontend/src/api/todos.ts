import type { Todo, CreateTodoReq } from "@/types/todo";

const BASE = "http://localhost:8080/api/todos"; //BASE→他の関数から同じurlを書かずに済む

// 一覧取得
export async function fetchTodos() : Promise<Todo[]> {
    const res = await fetch(BASE, { method: "GET" });
    if (!res.ok) {
        throw new Error("タスク一覧の取得に失敗したよ!");
    }
    return res.json();
}

// 作成
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

// 完了トグル(更新)
export async function updateTodoCompleted(id: number, completed: boolean): Promise<Todo> {
    const res = await fetch(`${BASE}/${id}`, { //テンプレートリテラル, (BASE + "/" + id)でも可

        method: "PUT", //PUT=更新、PATCH=部分更新
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error("タスクの更新に失敗したよ！");
    return res.json();
// const = res→同じスコープ内で同じ名前の定数を複数回定義することはできない(別の関数ごとに定義するのはok)
}