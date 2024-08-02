package com.springrest.springrest.services;

import com.springrest.springrest.dtos.EnrollmentDto;
import com.springrest.springrest.entities.EnrollmentEntity;

import java.util.List;

public interface EnrollmentService {

    public List<EnrollmentEntity> getEnrollments();

    public List<EnrollmentEntity> getEnrollmentsByUserId(Long userId);

    public EnrollmentEntity getEnrollment(Long id);

    public EnrollmentEntity addEnrollment(EnrollmentDto enrollment);

    public void deleteEnrollment(Long id);

    public boolean checkIfEnrollmentExistForCourse(Long courseId);

    boolean isUserEnrolledInCourse(Long userId, Long courseId);
}
