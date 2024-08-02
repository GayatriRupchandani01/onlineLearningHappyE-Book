package com.springrest.springrest.services;

import com.springrest.springrest.dtos.CourseDto;
import com.springrest.springrest.entities.CourseEntity;

import java.util.List;

public interface CourseService {
    public List<CourseEntity> getCourses();

    public CourseEntity getCourse(Long courseId);

    public CourseEntity addCourse(CourseDto course, Long instructorId);

    public CourseEntity updateCourse(CourseDto course, Long courseId);

    public void deleteCourse(Long courseId);

}
