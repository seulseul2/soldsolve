package com.ssafy.soldsolve.db.repository;

import com.ssafy.soldsolve.db.entity.Message;
import com.ssafy.soldsolve.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query(value = "SELECT m FROM Message m WHERE m.user = :user")
    Page<Message> findAllByUser(User user, Pageable pageable);
}
