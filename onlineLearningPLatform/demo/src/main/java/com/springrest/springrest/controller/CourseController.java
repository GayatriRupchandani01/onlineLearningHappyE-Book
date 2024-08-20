package com.springrest.springrest.controller;

import com.springrest.springrest.dtos.CourseDto;
import com.springrest.springrest.entities.CourseEntity;
import com.springrest.springrest.exceptions.MyException;
import com.springrest.springrest.services.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CourseController {

    @Autowired
    private CourseService courseService;
    @GetMapping("/courses")
    public ResponseEntity<List<CourseEntity>> getCourses() {
        try{
            List<CourseEntity> list = courseService.getCourses();
            if(list.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(list,HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<CourseEntity> getCourse(@PathVariable Long courseId) {
        try {
            CourseEntity course = courseService.getCourse(courseId);
            return new ResponseEntity<>(course,HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/courses/{instructorId}")
    public ResponseEntity<?> addCourse(@Valid @RequestBody CourseDto course, @PathVariable Long instructorId) {
        try{
            CourseEntity courseCreated = courseService.addCourse(course,instructorId);
            return new ResponseEntity<>(courseCreated,HttpStatus.CREATED);
        }
        catch(MyException e) {
            return new ResponseEntity<>("Course addition failed", HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/courses/{courseId}")
    public ResponseEntity<?> updateCourse(@Valid @RequestBody CourseDto course, @PathVariable Long courseId) {
        try {
            if(courseId == null) {
                throw new IllegalArgumentException("Course ID cannot be null.");
            }
            CourseEntity courseUpdated = courseService.updateCourse(course, courseId);
            return new ResponseEntity<>(courseUpdated,HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Course not modified",HttpStatus.NOT_MODIFIED);
        }
    }

    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long courseId) {
        try{
            courseService.deleteCourse(courseId);
            return new ResponseEntity<>("Course deleted Successfully",HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Course not found",HttpStatus.NOT_FOUND);
        }
    }

}
