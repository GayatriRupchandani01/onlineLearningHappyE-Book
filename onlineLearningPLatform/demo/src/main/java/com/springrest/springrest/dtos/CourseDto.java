package com.springrest.springrest.dtos;

import com.springrest.springrest.entities.CourseEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto {

    private long id;
    @NotBlank(message = "Title is mandatory")
    private String title;
    @NotBlank(message = "Code for the course is mandatory")
    private String courseCode;
    @NotBlank(message = "Description is mandatory")
    private String description;
    @NotBlank(message = "Author name is mandatory")
    private String author;
    @NotBlank(message = "URL for course is mandatory")
    private String url;
    private Long instructorId;


    private String preRequisites;
    private EnrollmentDto enrollment;

    public CourseEntity toCourseEntity(CourseDto course) {
        CourseEntity courseEntity = new CourseEntity();
        courseEntity.setId(course.getId());
        courseEntity.setTitle(course.getTitle());
        courseEntity.setCourseCode(course.getCourseCode());
        courseEntity.setDescription(course.getDescription());
        courseEntity.setAuthor(course.getAuthor());
        courseEntity.setUrl(course.getUrl());
        courseEntity.setPreRequisites(course.getPreRequisites());
        courseEntity.setInstructorId(courseEntity.getInstructorId());
        return courseEntity;
    }

    public CourseDto(CourseEntity courseEntity) {
        this.id = courseEntity.getId();
        this.title = courseEntity.getTitle();
        this.courseCode = courseEntity.getCourseCode();
        this.description = courseEntity.getDescription();
        this.author = courseEntity.getAuthor();
        this.url = courseEntity.getUrl();
        this.preRequisites = courseEntity.getPreRequisites();
        this.instructorId = courseEntity.getInstructorId();
    }

}
