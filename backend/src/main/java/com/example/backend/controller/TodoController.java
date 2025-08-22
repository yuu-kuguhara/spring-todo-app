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

import jakarta.validation.Valid;

import com.example.backend.dto.TodoRes;

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
    public List<TodoRes> list() {
        List<Todo> entities = repo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        List<TodoRes> response = entities.stream()
                .map(this::toRes) // EntityをDTOに変換
                .toList();
        return response;
    }

    // 作成(titleは必須)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // 201 Createdを返す
    public TodoRes create(@Valid @RequestBody CreateTodoReq req) {
        Todo toSave = new Todo();
        String title = req.getTitle().trim();
        toSave.setTitle(title);
        // completed未指定(null)ならデフォルトのfalseが入る
        boolean completed = Boolean.TRUE.equals(req.getCompleted());
        toSave.setCompleted(completed);
        Todo saved = repo.save(toSave);
        TodoRes res = toRes(saved);
        return res;
    }

    // 更新：指定IDのtitleとcompletedを更新
    @PutMapping("/{id}")
    public TodoRes update(@PathVariable Long id, @Valid @RequestBody UpdateTodoReq req) {
        Todo todo = repo.findById(id).orElseThrow(() -> new NotFoundException("todo not found"));

        // タイトルが来ていれば更新(nullなら据え置き)
        if (req.getTitle() != null) {
            String trimmed = req.getTitle().trim();
            if (trimmed.isEmpty())
                throw new IllegalArgumentException("title must not be blank");
            todo.setTitle(trimmed);
        }

        // completed 指定時のみ更新
        if (req.getCompleted() != null) {
            todo.setCompleted(req.getCompleted());
        }

        Todo saved = repo.save(todo);
        TodoRes res = toRes(saved);
        return res;
    }

    // 削除：指定IDのTodoを削除
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        boolean exists = repo.existsById(id); // existById→指定したIDがDBに存在するかどうかを真偽値で返す
        if (!exists) {
            throw new NotFoundException("todo not found");
        }
        repo.deleteById(id);
    }

    // EntityをDTOに変換
    private TodoRes toRes(Todo t) {
        return new TodoRes(
                t.getId(),
                t.getTitle(),
                t.isCompleted(),
                t.getCreatedAt(),
                t.getUpdateAt());
    }
}
