package com.springrest.springrest.dao;

import com.springrest.springrest.entities.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<CourseEntity, Long> {

    CourseEntity findByCourseCode(String courseCode);
}
