package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entity.Todo;

// 引数はエンティティの型と主キーの型
public interface TodoRepository extends JpaRepository<Todo, Long> {

}
