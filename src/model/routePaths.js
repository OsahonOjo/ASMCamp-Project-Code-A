export const routes = {
    VIEW_ALL_TRACKS: "/tracks",
    VIEW_TRACK: "/track/:trackId",
    VIEW_COURSE: "/course/:courseId",
    VIEW_TOPIC_ITEM: "/topic/:topicId/item/:seqNumber",

    STUDENTS: "/students",
    STUDENT_VIEW_PROGRESS: "/students/progress",
    STUDENT_VIEW_LEADERBOARDS: "/students/leaderboards",

    INSTRUCTORS: "/instructors",
    INSTRUCTORS_VIEW_TRACKS: "/instructors/tracks",
    INSTRUCTORS_VIEW_GROUPS: "/instructors/groups",
    INSTRUCTORS_VIEW_LEADERBOARDS: "/instructors/leaderboards",

    INSTRUCTORS_EDIT_TRACK: "/instructors/edit/track/:trackId/:mode",
    INSTRUCTORS_EDIT_COURSE: "/instructors/edit/course/:courseId/:mode",
    INSTRUCTORS_EDIT_TOPIC: "/instructors/edit/topic/:topicId/:mode",
    INSTRUCTORS_EDIT_TOPIC_ITEM: "/instructors/edit/item/:topicItemId/:mode"

    /**
     * /topic/:topicId/item/:seqNumber" element={<TopicItemScreen />}/>
        <Route path="/course/:courseId" element={<CourseScreen />} />
        <Route path="/track/:trackId" element={<LearningTrackScreen />}  />
        <Route path="/tracks" element={<AllLearningTracksScreen />} />

        <Route path="/students/progress" element={<ProgressAndRewardsScreen />} />
        <Route path="/students/leaderboards" element={<StudentLeaderboardScreen />} />
        <Route path="/students" element={<StudentDashboardScreen />} />

        <Route path="/instructors/edit/track" element={<EditLearningTrackScreen />} />
        <Route path="/instructors/edit/course" element={<EditCourseScreen />} />
        <Route path="/instructors/edit/topic" element={<EditTopicScreen />} />
        <Route path="/instructors/edit/item" element={<EditTopicItemScreen />} />
        
        <Route path="/instructors/leaderboards" element={<InstructorLeaderboardScreen />} />
        <Route path="/instructors/groups" element={<ManageGroupsScreen />} />
        <Route path="/instructors/tracks" element={<ManageLearningTracksScreen />} />
        <Route path="/instructors" element={<InstructorsAreaScreen />} />

        "/"
     */
};