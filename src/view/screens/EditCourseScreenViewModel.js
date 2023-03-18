import React from "react";
import { createCourseEntity, updateCourseEntity } from "../../modelsAndData/EduDataModel";

export default function EditCourseScreenViewModel() {

    function formattedCourseFactory(courseEntity) {
        return {
            id: courseEntity._id,
            learningTrackId: courseEntity.learningTrackId,
            title: courseEntity.title,
            seqNumber: courseEntity.seqNumber,
            shortDescription: courseEntity.shortDescription,
            longDescription: courseEntity.longDescription
        };
    }

    async function createCourse(learningTrackId, title, seqNumber, shortDescription, longDescription) {
        console.log("inside viewmodel: createCourse()");
        const { response, error } = await createCourseEntity(learningTrackId, title, seqNumber, shortDescription, longDescription);
        if (error) {
            console.log(error.message);
            return;
        }
        let newCourseEntity = response.response;
        let formattedCourseEntity = formattedCourseFactory(newCourseEntity);
        console.log('course created and formatted successfully: ', formattedCourseEntity);
        return formattedCourseEntity;
    }

    async function updateCourse(id, learningTrackId, title, seqNumber, shortDescription, longDescription) {
        console.log("inside viewmodel: updateCourse()");
        const { response, error } = await updateCourseEntity(id, learningTrackId, title, seqNumber, shortDescription, longDescription);
        if (error) {
            console.log(error.message);
            return;
        }
        let courseEntity = response.response;
        let formattedCourseEntity = formattedCourseFactory(courseEntity);
        console.log('course updated and formatted successfully: ', formattedCourseEntity);
        return formattedCourseEntity;
    }

    async function deleteCourse() {
        console.log("TODO: delete course");
    }

    return {
        createCourse,
        updateCourse
    };
}