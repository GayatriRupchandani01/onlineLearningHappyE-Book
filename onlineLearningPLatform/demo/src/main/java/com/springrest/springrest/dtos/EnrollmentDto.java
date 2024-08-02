package com.springrest.springrest.dtos;

import com.springrest.springrest.entities.CourseEntity;
import com.springrest.springrest.entities.EnrollmentEntity;
import com.springrest.springrest.entities.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentDto {

    private Long id;
    private Long userId;
    private Long courseId;

    public EnrollmentEntity toEnrollmentEntity(EnrollmentDto enrollment) {
        EnrollmentEntity enrollmentEntity = new EnrollmentEntity();
        enrollmentEntity.setId(enrollment.getId());
        if(enrollment.getUserId() != null) {
            UserEntity user = new UserEntity();
            user.setId(enrollment.getUserId());
            enrollmentEntity.setUser(user);
        }
        if(enrollment.getCourseId() != null) {
            CourseEntity course = new CourseEntity();
            course.setId(enrollment.getCourseId());
            enrollmentEntity.setCourse(course);
        }
        return enrollmentEntity;
    }

    public EnrollmentDto(EnrollmentEntity enrollmentEntity) {
        this.id = enrollmentEntity.getId();
        if(enrollmentEntity.getUser() != null) {
            this.userId = enrollmentEntity.getUser().getId();
        }
        if(enrollmentEntity.getCourse() != null) {
            this.courseId = enrollmentEntity.getCourse().getId();
        }
    }
}
