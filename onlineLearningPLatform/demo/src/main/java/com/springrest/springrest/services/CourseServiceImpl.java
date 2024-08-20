package com.springrest.springrest.services;

import com.springrest.springrest.dao.CourseRepository;
import com.springrest.springrest.dao.EnrollmentRepository;
import com.springrest.springrest.dtos.CourseDto;
import com.springrest.springrest.entities.CourseEntity;
import com.springrest.springrest.entities.EnrollmentEntity;
import com.springrest.springrest.exceptions.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService{

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Autowired
    EnrollmentService enrollmentService;

    @Override
    public List<CourseEntity> getCourses() {
        return courseRepository.findAll();
    }

    @Override
    public CourseEntity getCourse(Long courseId) {
         return courseRepository.findById(courseId).orElse(null);
    }

    @Override
    public CourseEntity addCourse(CourseDto course, Long instructorId) {
        CourseEntity existingCourseEntity = courseRepository.findByCourseCode(course.getCourseCode());
        if (existingCourseEntity != null) {
            throw new MyException("Course already exists");
        }

        CourseEntity newCourseEntity = course.toCourseEntity(course);
        newCourseEntity.setInstructorId(instructorId);
        courseRepository.save(newCourseEntity);

        return newCourseEntity;
    }

    @Override
    public CourseEntity updateCourse(CourseDto course, Long courseId) {
        CourseEntity existingCourseEntity = courseRepository.findById(courseId)
                .orElseThrow(() -> new MyException("Course not found"));

        existingCourseEntity.setTitle(course.getTitle());
        existingCourseEntity.setAuthor(course.getAuthor());
        existingCourseEntity.setDescription(course.getDescription());
        existingCourseEntity.setCourseCode(course.getCourseCode());
        existingCourseEntity.setUrl(course.getUrl());
        existingCourseEntity.setPreRequisites(course.getPreRequisites());
        return courseRepository.save(existingCourseEntity);
    }
    
    @Override
    public void deleteCourse(Long courseId) {
        if(!courseRepository.existsById(courseId)) {
            throw new MyException("Course not found");
        }
        CourseEntity courseEntity = courseRepository.findById(courseId).get();
        List<EnrollmentEntity> list = enrollmentRepository.findEnrollmentByCourseId(courseId);
        if(!list.isEmpty()) {
            for (EnrollmentEntity e : list) {
                enrollmentRepository.delete(e);
            }
        }
        courseRepository.delete(courseEntity);
    }
}
