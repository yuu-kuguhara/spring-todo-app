package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.example.backend.entity.Todo;
import com.example.backend.repository.TodoRepository;
import java.util.List;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173") // フロントエンドのURLを指定
public class TodoController {
    private final TodoRepository repo;

    public TodoController(TodoRepository repo) {
        this.repo = repo;
    }

    // 一覧
    @GetMapping
    public List<Todo> list() {
        return repo.findAll();
    }

    // 作成(titleは必須)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // 201 Createdを返す
    public Todo create(@RequestBody Todo req) {
        if (req.getTitle() == null || req.getTitle().isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }
        // completedが未指定でもEntity側のデフォルトfalseが適用される
        Todo toSave = new Todo();
        toSave.setTitle(req.getTitle().trim());
        toSave.setCompleted(req.isCompleted());
        return repo.save(toSave);
    }
}
