package com.example.backend.dto;

import java.time.LocalDateTime;

public class TodoRes {
    private Long id;
    private String title;
    private boolean completed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public TodoRes(Long id, String title, boolean completed, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // getter(JacksonがJSONへシリアライズするために必要)→「Javaオブジェクト → JSON」への変換処理を担っているのが Jackson
    // というライブラリ
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdateAt() {
        return updatedAt;
    }
}
