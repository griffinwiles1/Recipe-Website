
import React from 'react';
import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskState } from '../lib/store';

export default function TaskList() {
  // We're retrieving our state from the store
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_INBOX'),
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_COMPLETED'),
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_ARCHIVED'),
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_DELETED'),
    ];
    return tasksInOrder;
  });

  

  const { status } = useSelector((state) => state.taskbox);

  const dispatch = useDispatch();

  const completeTask = (value) => {
    // We're dispatching the Completed event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_COMPLETED' }));
  };
  const uncompleteTask = (value) => {
    // We're dispatching the Uncompleted event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_INBOX' }));
  }
  const pinTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
  };
  const unpinTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_INBOX' }));
  };
  const archiveTask = (value) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
  };
  const deleteTask = (value) => {
    // We're dispatching the Delete event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_DELETED' }));
  }
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        { LoadingRow }
        { LoadingRow }
        { LoadingRow }
        { LoadingRow }
        { LoadingRow }
        { LoadingRow }
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      { tasks.map((task) => (
        <Task
          key={ task.id }
          task={ task }
          onCompleteTask={ (task) => completeTask(task) }
          onUncompleteTask={ (task) => uncompleteTask(task) }
          onPinTask={ (task) => pinTask(task) }
          onUnpinTask={ (task) => unpinTask(task) }
          onArchiveTask={ (task) => archiveTask(task) }
          onDeleteTask={ (task) => deleteTask(task) }
        />
      )) }
    </div>
  );
}