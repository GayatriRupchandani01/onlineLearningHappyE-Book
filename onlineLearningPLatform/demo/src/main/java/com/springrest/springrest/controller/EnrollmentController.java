package com.springrest.springrest.controller;

import com.springrest.springrest.dtos.EnrollmentDto;
import com.springrest.springrest.entities.EnrollmentEntity;
import com.springrest.springrest.exceptions.MyException;
import com.springrest.springrest.services.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;
    @GetMapping("/enrollments")
    public ResponseEntity<List<EnrollmentEntity>> getEnrollments() {
        try{
            List<EnrollmentEntity> list = enrollmentService.getEnrollments();
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/enrollments/user/{userId}")
    public ResponseEntity<List<EnrollmentEntity>> getEnrollmentsByUserId(@PathVariable Long userId) {
        try {List<EnrollmentEntity> list = enrollmentService.getEnrollmentsByUserId(userId);
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/enrollments/{enrollmentId}")
    public ResponseEntity<EnrollmentEntity> getEnrollment(@PathVariable Long enrollmentId) {
        try {
            EnrollmentEntity enrollment = enrollmentService.getEnrollment(enrollmentId);
            return new ResponseEntity<>(enrollment,HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/enrollments")
    public ResponseEntity<EnrollmentEntity> addEnrollment(@Valid @RequestBody EnrollmentDto enrollment) {
        try{
            EnrollmentEntity enrollmentCreated = enrollmentService.addEnrollment(enrollment);
            return new ResponseEntity<>(enrollmentCreated,HttpStatus.CREATED);
        }
        catch(MyException e) {
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/enrollments/{enrollmentId}")
    public ResponseEntity<?> deleteEnrollment(@PathVariable Long enrollmentId) {
        try{
            enrollmentService.deleteEnrollment(enrollmentId);
            return new ResponseEntity<>("Enrollment deleted Successfully",HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Enrollment not found",HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/enrollments/course/{courseId}")
    public boolean checkIfEnrollmentExistForCourse(@PathVariable Long courseId) {
        return enrollmentService.checkIfEnrollmentExistForCourse(courseId);
    }
}
