package com.example.backend.dto;

import jakarta.validation.constraints.Size;

public class UpdateTodoReq {
    @Size(max = 100)
    private String title; // nullなら更新しない
    private Boolean completed; // nullなら更新しない

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
