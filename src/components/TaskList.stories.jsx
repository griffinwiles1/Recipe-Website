
import React from 'react';

import TaskList from './TaskList';
import * as TaskStories from './Task.stories';

import { Provider } from 'react-redux';

import { configureStore, createSlice } from '@reduxjs/toolkit';

// A super-simple mock of the state of the store
export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
};

// A super-simple mock of a redux store
const Mockstore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex((task) => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  component: TaskList,
  title: 'Tasks/TaskList',
  decorators: [(story) => <div style={ { padding: "3rem" } }>{ story() }</div>],
  excludeStories: /.*MockedState$/,
};

const Template = () => <TaskList />;

export const Default = Template.bind({ });
Default.decorators = [
  (story) => <Mockstore taskboxState={ MockedState }>{ story() }</Mockstore>,
];

export const TheEverythingSpecial = Template.bind({ });
TheEverythingSpecial.decorators = [
  (story) => {
    const pinnedtasks = [
      ...MockedState.tasks.slice(0, 5),
      { id: "6", title: "Task 6 (Pinned)", state: "TASK_PINNED" },
      { id: "7", title: "Task 7 (Archived)", state: "TASK_ARCHIVED"},
      { id: "8", title: "Task 8 (Deleted)", state: "TASK_DELETED"},
      { id: "9", title: "Task 9 (Completed)", state: "TASK_COMPLETED"},
      { id: "10", title: "Task 10 (Pinned)", state: "TASK_PINNED" },
    ];
    
    return (
      <Mockstore
        taskboxState={ {
          ...MockedState,
          tasks: pinnedtasks,
        } }
      >
        { story() }
      </Mockstore>
    );
  },
];

export const Loading = Template.bind({ });
Loading.decorators = [
  (story) => (
    <Mockstore
      taskboxState={ {
        ...MockedState,
        status: 'loading',
      } }
    >
      { story() }
    </Mockstore>
  ),
];

export const Empty = Template.bind({ });
Empty.decorators = [
  (story) => (
    <Mockstore
      taskboxState={ {
        ...MockedState,
        tasks: [],
      } }
    >
      { story() }
    </Mockstore>
  ),
];