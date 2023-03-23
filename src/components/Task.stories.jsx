import React from 'react';

import Task from './Task';

export default {
  component: Task,
  title: 'Tasks/Task',
};

const Template = args => <Task {...args} />;

export const Default = Template.bind({ });
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
  },
};

export const Completed = Template.bind({ });
Completed.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_COMPLETED',
  },
};

export const Pinned = Template.bind({ });
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({ });
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
};

export const Restored = Template.bind({ });
Restored.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_RESTORED',
  },
};


export const Deleted = Template.bind({ });
Deleted.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_DELETED',
  },
};


const longTitleString = "This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!";

export const LongTitle = Template.bind({ });
LongTitle.args = {
  task: {
    ...Default.args.task,
    title: longTitleString,
  },
};