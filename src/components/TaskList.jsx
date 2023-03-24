
import React from 'react';
import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskState } from '../lib/store';

import styles from '../style';

export default function TaskList() {
  // We're retrieving our state from the store
  const tasksActive = useSelector((state) => {
    const tasksActiveList = [
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_INBOX'),
    ];
    return tasksActiveList;
  });

  const tasksCompleted = useSelector((state) => {
    const tasksCompletedList = [
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_COMPLETED'),
    ];
    return tasksCompletedList;
  });

  const tasksArchived = useSelector((state) => {
    const tasksArchivedList = [
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_ARCHIVED'),
    ];
    return tasksArchivedList;
  });

  const tasksDeleted = useSelector((state) => {
    const tasksDeletedList = [
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_DELETED'),
    ];
    return tasksDeletedList;
  });



  const { status } = useSelector((state) => state.taskbox);

  const dispatch = useDispatch();

  const completeTask = (value) => {
    // We're dispatching the Completed event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_COMPLETED' }));
  };
  const pinTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
  };
  const archiveTask = (value) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
  };
  const restoreTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_INBOX' }));
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

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      <div className={` mx-4 p-4 flex flex-col ${ styles.borderRoundedL } bg-footerPrimary `}>
        <h1 className="pb-4 text-primaryWhite flex justify-center">Active Tasks</h1>
        { (tasksActive.length === 0)
          ? 
            <div>
              <p className="flex justify-center text-primaryWhite">No Active Tasks, congrats!</p>
            </div>
          : 
            <div className={` ${ styles.borderRounded }  `}>
              <div>
                { tasksActive.map((task) => (
                  <Task
                    key={ task.id }
                    task={ task }
                    onCompleteTask={ (task) => completeTask(task) }
                    onPinTask={ (task) => pinTask(task) }
                    onRestoreTask={ (task) => restoreTask(task) }
                    onArchiveTask={ (task) => archiveTask(task) }
                    onDeleteTask={ (task) => deleteTask(task) }
                  />
                )) }
              </div>
              
              <div className="border-t border-t-primaryWhite">
                { tasksCompleted.map((task) => (
                  <Task
                    key={ task.id }
                    task={ task }
                    onCompleteTask={ (task) => completeTask(task) }
                    onPinTask={ (task) => pinTask(task) }
                    onRestoreTask={ (task) => restoreTask(task) }
                    onArchiveTask={ (task) => archiveTask(task) }
                    onDeleteTask={ (task) => deleteTask(task) }
                  />
                )) }
              </div>
            </div>
        }
        </div>
      <div className={` mx-4 mt-8 p-4 flex flex-col ${ styles.borderRoundedL } bg-footerPrimary `}>
        <h1 className="pb-4 text-primaryWhite flex justify-center">Archived Tasks</h1>
        { tasksArchived.length === 0 
          ? 
            <div>
              <p className="flex justify-center text-primaryWhite">No Archived Tasks</p>
            </div>
          :
            <div className={ styles.borderRounded}>
              { tasksArchived.map((task) => (
                <Task
                  key={ task.id }
                  task={ task }
                  onCompleteTask={ (task) => completeTask(task) }
                  onPinTask={ (task) => pinTask(task) }
                  onRestoreTask={ (task) => restoreTask(task) }
                  onArchiveTask={ (task) => archiveTask(task) }
                  onDeleteTask={ (task) => deleteTask(task) }
                />
            )) }
          </div>
        }
      </div>
      
      <div className={` mx-4 mt-8 p-4 flex flex-col ${ styles.borderRoundedL } bg-footerPrimary `}>
        <h1 className="pb-4  text-primaryWhite flex justify-center">Trash Can</h1>
        { tasksDeleted.length === 0 
          ? 
            <div>
              <p className={`flex justify-center text-primaryWhite `}>Your Trash is Empty</p>
            </div>
          : 
            <div className={ styles.borderRounded }>
              { tasksDeleted.map((task) => (
                <Task
                  key={ task.id }
                  task={ task }
                  onCompleteTask={ (task) => completeTask(task) }
                  onPinTask={ (task) => pinTask(task) }
                  onRestoreTask={ (task) => restoreTask(task) }
                  onArchiveTask={ (task) => archiveTask(task) }
                  onDeleteTask={ (task) => deleteTask(task) }
                />
              )) }
            </div> 
        }
      </div>
    </div>
  );
}