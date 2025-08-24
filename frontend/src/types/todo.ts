export type Todo = { //type=型エイリアス(型だけを定義する構文)
    id: number;
    title: string;
    completed: boolean;
    createdAt: string; //ISO-8601形式の日時文字列
    updatedAt: string;
};

export type CreateTodoReq = {
    title: string;
    completed?: boolean; //未指定ならfalse(サーバ側で補完)
};