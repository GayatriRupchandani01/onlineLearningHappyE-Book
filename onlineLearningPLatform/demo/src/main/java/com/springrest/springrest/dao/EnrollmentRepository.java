package com.springrest.springrest.dao;

import com.springrest.springrest.entities.EnrollmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<EnrollmentEntity, Long> {

    @Query("SELECT uc FROM EnrollmentEntity uc WHERE uc.user.id = :userId")
    public List<EnrollmentEntity> findEnrollmentByUserId(@Param("userId") Long userId);

    @Query List<EnrollmentEntity> findEnrollmentByCourseId(@Param("courseId") Long courseId);

    @Query Optional<EnrollmentEntity> findByUserIdAndCourseId(@Param("userId") Long userId,@Param("courseId") Long courseId);
}
