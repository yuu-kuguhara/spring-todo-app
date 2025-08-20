package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.CreateTodoReq;
import com.example.backend.dto.UpdateTodoReq;
import com.example.backend.entity.Todo;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repository.TodoRepository;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import jakarta.validation.Valid;

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
        return repo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    // 作成(titleは必須)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // 201 Createdを返す
    public Todo create(@Valid @RequestBody CreateTodoReq req) {
        Todo toSave = new Todo();
        toSave.setTitle(req.getTitle().trim());
        // completed未指定(null)ならfalseにする
        toSave.setCompleted(Boolean.TRUE.equals(req.getCompleted()));
        return repo.save(toSave); // repo.save→insert
    }

    // 更新：指定IDのtitleとcompletedを更新
    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @Valid @RequestBody UpdateTodoReq req) {
        Todo todo = repo.findById(id).orElseThrow(() -> new NotFoundException("todo not found"));

        // タイトルが来ていれば更新(nullなら据え置き)
        if (req.getTitle() != null) {
            String t = req.getTitle().trim();
            if (t.isEmpty())
                throw new IllegalArgumentException("title must not be blank");
            todo.setTitle(t);
        }

        if (req.getCompleted() != null) {
            todo.setCompleted(req.getCompleted());
        }
        return repo.save(todo);
    }

    // 削除：指定IDのTodoを削除
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            throw new NotFoundException("todo not found");
        }
        repo.deleteById(id);
    }
}
