package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.example.backend.entity.Todo;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repository.TodoRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

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

    // 更新：指定IDのtitleとcompletedを更新
    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo req) {
        var todo = repo.findById(id).orElseThrow(() -> new NotFoundException("todo not found"));

        // タイトルが来ていれば更新(nullなら据え置き)
        if (req.getTitle() != null) {
            // var=ローカル変数の型推論→型が右辺で明確にわかる時に用いる(例：)
            var trimmed = req.getTitle().trim();
            if (trimmed.isEmpty())
                throw new IllegalArgumentException("title must not be blank");
            todo.setTitle(trimmed);
        }
        // completedはbooleanなので送られてきた値で上書きしたい場合はそのまま反映
        todo.setCompleted(req.isCompleted());

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
