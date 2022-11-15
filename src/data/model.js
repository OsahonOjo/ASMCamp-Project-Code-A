 /* Things to have in Model:
      1. initialize/get data structure and data
      2. CRUD methods, ended w/ call to this.onDatasetChanged
      3. bind dataset changed event handler with an event handler from Controller that then
         triggers/calls a View method to update the UI when the dataset changes
      
       */

export default class Model {
  
  //initialize/get data structure and data
  constructor(reset) {
    if (reset)
      this.resetDataset();
  }

  //CRUD methods, ended w/ call to this.onDatasetChanged
  getAllTopicData() {
    return JSON.parse(localStorage.getItem("courseMaterial"));
  }
//minor
  getTopic(topicId) {
    //this.getAllTopicData()[topicIndex];
    return this.getAllTopicData().find(topic => topic.id === topicId);
  }

  getTopicItem(topicId, topicItemId) {
    return this.getTopic(topicId).material.find(topicItem => topicItem.id === topicItemId);
  }

  //bind dataset changed event handler that will update View when dataset changes
  bindDatasetChanged(callback) {
    this.onDatasetChanged = callback;
  }

  /* see dataSchema.js for data Schema */
  resetDataset() {
    const courseMaterial = [
      {
        id: '1',
        seqNumber: 1,
        title: "Topic 1",
        shortDescription: "Short description. Lorem ipsum.",
        longDescription: "Long description. Lorem ipsum dolor sit amet adipsicing consectetur.",
        hours: 300,
        xp: 1200,
        material: [
          {
            id: '1',
            seqNumber: 1,
            topicId: '1',
            topicTitle: "Topic 1",
            type: "LSN",
            title: "Lesson 1",
            xp: 200,
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: { answer: "", hint: "" },
            cqAnswer: { answer: "", hint: "" },
          },
          {
            id: '2',
            seqNumber: 2,
            topicId: '1',
            topicTitle: "Topic 1",
            type: "MCQ",
            title: "MCQ Question",
            xp: 200,
            content: "Topic 1 MCQ Question",
            mcqAnswer: {
              options: ["Alpha", "Beta", "Kappa", "Gamma"],
              answer: "Gamma",
              hint: "The answer to this question is 'Gamma'",
            },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: { answer: "", hint: "" },
            cqAnswer: { answer: "", hint: "" },
          },
          {
            id: '3',
            seqNumber: 3,
            topicId: '1',
            topicTitle: "Topic 1",
            type: "TFQ",
            title: "TFQ Question",
            xp: 200,
            content: "Topic 1 TFQ Question",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: {
              answer: true,
              hint: "The answer to this question is 'true'",
            },
            saqAnswer: { answer: "", hint: "" },
            cqAnswer: { answer: "", hint: "" },
          },
          {
            id: '4',
            seqNumber: 4,
            topicId: '1',
            topicTitle: "Topic 1",
            type: "LSN",
            title: "Lesson 2",
            xp: 200,
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: { answer: "", hint: "" },
            cqAnswer: { answer: "", hint: "" },
          },
          {
            id: '5',
            seqNumber: 5,
            topicId: '1',
            topicTitle: "Topic 1",
            type: "SAQ",
            title: "SAQ Question",
            xp: 200,
            content: "Topic 1 SAQ Question",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: {
              answer: "binary",
              hint: "The answer to this question is 'binary'",
            },
            cqAnswer: { answer: "", hint: "" },
          },
          {
            id: '6',
            seqNumber: 6,
            topicId: '1',
            topicTitle: "Topic 1",
            type: "CQ",
            title: "CQ Question",
            xp: 200,
            content: "Topic 1 CQ Question",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: { answer: "", hint: "" },
            cqAnswer: {
              answer: "goto main",
              hint: "The answer to this question is 'goto main'",
            },
          },
        ],
      },
      {
        id: '2',
        seqNumber: 2,
        title: "Topic 2",
        shortDescription: "Short description. Lorem ipsum.",
        longDescription: "Long description. Lorem ipsum dolor sit amet adipsicing consectetur.",
        hours: 200,
        xp: 900,
        material: [
          {
            id: '7',
            seqNumber: 1,
            topicId: '2',
            topicTitle: "Topic 2",
            type: "LSN",
            title: "Lesson A",
            xp: 200,
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: { answer: "", hint: "" },
            cqAnswer: { answer: "", hint: "" },
          },
          {
            id: '8',
            seqNumber: 2,
            topicId: '2',
            topicTitle: "Topic 2",
            type: "LSN",
            title: "Lesson B",
            xp: 300,
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: { answer: "", hint: "" },
            cqAnswer: { answer: "", hint: "" },
          },
          {
            id: '9',
            seqNumber: 3,
            topicId: '2',
            topicTitle: "Topic 2",
            type: "SAQ",
            title: "SAQ Question",
            xp: 100,
            content: "Topic 2 SAQ Question",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: {
              answer: "addition",
              hint: "The answer to this question is 'addition'",
            },
            cqAnswer: { answer: "", hint: "" },
          },
          {
            id: '10',
            seqNumber: 4,
            topicId: '2',
            topicTitle: "Topic 2",
            type: "CQ",
            title: "CQ Question",
            xp: 300,
            content: "Topic 2 CQ Question",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: { answer: "", hint: "" },
            cqAnswer: {
              answer: "clrf TRISB",
              hint: "The answer to this question is 'clrf TRISB'",
            },
          },
        ],
      },
      {
        id: '3',
        seqNumber: 3,
        title: "Topic 3",
        shortDescription: "Short description. Lorem ipsum.",
        longDescription: "Long description. Lorem ipsum dolor sit amet adipsicing consectetur.",
        hours: 100,
        xp: 600,
        material: [
          {
            id: '11',
            seqNumber: 1,
            topicId: '3',
            topicTitle: "Topic 3",
            type: "LSN",
            title: "Lesson I",
            xp: 200,
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: { answer: "", hint: "" },
            cqAnswer: { answer: "", hint: "" },
          },
          {
            id: '12',
            seqNumber: 2,
            topicId: '3',
            topicTitle: "Topic 3",
            type: "CQ",
            title: "CQ Question",
            xp: 400,
            content: "Insert question here",
            mcqAnswer: { options: [], answer: "", hint: "" },
            tfqAnswer: { answer: "", hint: "" },
            saqAnswer: { answer: "", hint: "" },
            cqAnswer: {
              answer: "goto delay",
              hint: "The answer to this question is 'goto delay'",
            },
          },
        ],
      },
    ];
    localStorage.setItem("courseMaterial", JSON.stringify(courseMaterial));
  }
}