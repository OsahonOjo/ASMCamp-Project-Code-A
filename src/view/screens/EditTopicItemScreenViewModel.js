import React from "react";

export default async function EditTopicItemScreenViewModel() {

    const [topicItem, setTopicItem] = React.useState({});

    async function getTopicItemData(itemId) {
        
    }

    return {
        topicItem, getTopicItemData
    };
}