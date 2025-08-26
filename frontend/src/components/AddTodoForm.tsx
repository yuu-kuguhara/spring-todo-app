import React, { useState } from "react";

type Props = { //Props型定義
  onAdd: (title: string) => Promise<void> | void;
};

export default function AddTodoForm({ onAdd }: Props) { //{onAdd}をPropsから受け取る
  const [title, setTitle] = useState("");
  const [posting, setPosting] = useState(false); //送信中フラグ→連打防止・ボタンの無効化・「追加中...」表示に用いる

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim(); //前後の空白を削除
    if (!trimmed) return; //空白のみの場合は何もしない
    setPosting(true); //送信中フラグをtrueに
    await Promise.resolve(onAdd(trimmed)); //Promise.resolve(...)=>同期関数・非同期関数どちらも扱える
    setTitle("");
    setPosting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: 8, marginBottom: 16 }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)} //e.target.value=現在の入力値(文字列)
        placeholder="やることを入力"
        style={{
          flex: 1,
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 8,
        }}
      />
      <button
        type="submit" //<form>のonSubmitが発火
        disabled={posting} //二重送信を防止
        style={{ padding: "8px 16px", borderRadius: 8 }}
      >
        {posting ? "追加中..." : "追加"}
      </button>
    </form>
  );
}
