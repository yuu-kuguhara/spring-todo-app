import React, { useState } from "react"

type Props = {
    onAdd: (title: string) => Promise<void> | void;
};

export default function AddTodoForm( {onAdd}: Props) {

    const [title, setTitle] = useState("");
    const [posting, setPosting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) return;
        setPosting(true);
        await Promise.resolve(onAdd(trimmed));
        setTitle("");
        setPosting(false);
    }

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", gap: 8, marginBottom: 16}}>
        <input
         value={title}
         onChange={e => setTitle(e.target.value)}
         placeholder="やることを入力"
         style={{flex: 1, padding: 8, border: "1px solid #ccc", borderRadius: 8}}
         />
         <button type="submit" disabled={posting} style={{ padding: "8px 16px", borderRadius: 8}}>
            {posting ? "追加中..." : "追加"}
         </button>
    </form>
  );
}
