package com.springrest.springrest.services;

import com.springrest.springrest.dao.EnrollmentRepository;
import com.springrest.springrest.dtos.EnrollmentDto;
import com.springrest.springrest.entities.EnrollmentEntity;
import com.springrest.springrest.exceptions.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentServiceImplementation implements EnrollmentService{

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Override
    public List<EnrollmentEntity> getEnrollments() {
        return enrollmentRepository.findAll();
    }

    @Override
    public List<EnrollmentEntity> getEnrollmentsByUserId(Long userId) {
        List<EnrollmentEntity> list = enrollmentRepository.findEnrollmentByUserId(userId);
        return list;
    }

    @Override
    public EnrollmentEntity getEnrollment(Long id) {
        return enrollmentRepository.findById(id).orElse(null);
    }

    @Override
    public EnrollmentEntity addEnrollment(EnrollmentDto enrollment) {
        Long userId = enrollment.getUserId();
        Long courseId = enrollment.getCourseId();
        if (isUserEnrolledInCourse(userId,courseId)) {
            throw new MyException("User is already enrolled in this course.");
        }
        EnrollmentEntity enrollmentEntity = enrollment.toEnrollmentEntity(enrollment);
        enrollmentRepository.save(enrollmentEntity);
        return enrollmentEntity;
    }

    @Override
    public void deleteEnrollment(Long enrollmentId) {
        if(!enrollmentRepository.existsById(enrollmentId)) {
            throw new MyException("Enrollment not found");
        }
        EnrollmentEntity enrollmentEntity = enrollmentRepository.findById(enrollmentId).get();
        enrollmentRepository.delete(enrollmentEntity);
    }

    @Override
    public boolean checkIfEnrollmentExistForCourse(Long courseId) {
        return (!enrollmentRepository.findEnrollmentByCourseId(courseId).isEmpty());
    }

    @Override
    public boolean isUserEnrolledInCourse(Long userId, Long courseId) {
        return enrollmentRepository.findByUserIdAndCourseId(userId, courseId).isPresent();
    }
}
