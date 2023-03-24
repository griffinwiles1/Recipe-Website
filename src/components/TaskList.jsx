import React from "react";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";

import styles from "../style";

export default function TaskList() {
  // We're retrieving our state from the store
  const tasksActive = useSelector((state) => {
    const tasksActiveList = [
      ...state.taskbox.tasks.filter((t) => t.state === "TASK_PINNED"),
      ...state.taskbox.tasks.filter((t) => t.state === "TASK_INBOX"),
    ];
    return tasksActiveList;
  });

  const tasksCompleted = useSelector((state) => {
    const tasksCompletedList = [
      ...state.taskbox.tasks.filter((t) => t.state === "TASK_COMPLETED"),
    ];
    return tasksCompletedList;
  });

  const tasksArchived = useSelector((state) => {
    const tasksArchivedList = [
      ...state.taskbox.tasks.filter((t) => t.state === "TASK_ARCHIVED"),
    ];
    return tasksArchivedList;
  });

  const tasksDeleted = useSelector((state) => {
    const tasksDeletedList = [
      ...state.taskbox.tasks.filter((t) => t.state === "TASK_DELETED"),
    ];
    return tasksDeletedList;
  });



  const { status } = useSelector((state) => state.taskbox);

  const dispatch = useDispatch();

  const completeTask = (value) => {
    // We're dispatching the Completed event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_COMPLETED" }));
  };
  const pinTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
  };
  const archiveTask = (value) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
  };
  const editTaskTitle = (value) => {
    dispatch(updateTaskState({ id: value, title: "Edited", newTaskState: "TASK_COMPLETED" }));
  };
  const restoreTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_INBOX" }));
  };
  const deleteTask = (value) => {
    // We're dispatching the Delete event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_DELETED" }));
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
      <div className="list-items" data-testid="loading" key={ "loading" }>
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
    <div className="list-items" data-testid="success" key={ "success" }>
      <div className={` mx-4 p-4 flex flex-col ${ styles.borderRoundedL } bg-dark `}>
        <h1 className="pb-4 text-light flex justify-center">Active Tasks</h1>
        { (tasksActive.length === 0)
          ? 
            <div>
              <p className="flex justify-center text-light">No Active Tasks, congrats!</p>
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
                    onArchiveTask={ (task) => archiveTask(task) }
                    onEditTaskTitle={ (task) => editTaskTitle(task) }
                    onDeleteTask={ (task) => deleteTask(task) }
                  />
                )) }
              </div>
              
              <div className={ tasksCompleted.length === 0 ? "border-t-0" : "border-t-2 border-t-light"}>
                { tasksCompleted.map((task) => (
                  <Task
                    key={ task.id }
                    task={ task }
                    onRestoreTask={ (task) => restoreTask(task) }
                    onDeleteTask={ (task) => deleteTask(task) }
                  />
                )) }
              </div>
            </div>
        }
        </div>
      <div className={` mx-4 mt-8 p-4 flex flex-col ${ styles.borderRoundedL } bg-dark `}>
        <h1 className="pb-4 text-light flex justify-center">Archived Tasks</h1>
        { tasksArchived.length === 0 
          ? 
            <div>
              <p className="flex justify-center text-light">No Archived Tasks</p>
            </div>
          :
            <div className={ styles.borderRounded}>
              { tasksArchived.map((task) => (
                <Task
                  key={ task.id }
                  task={ task }
                  onCompleteTask={ (task) => completeTask(task) }
                  onEditTaskTitle={ (task) => editTaskTitle(task) }
                  onRestoreTask={ (task) => restoreTask(task) }
                  onDeleteTask={ (task) => deleteTask(task) }
                />
            )) }
          </div>
        }
      </div>
      
      <div className={` mx-4 mt-8 p-4 flex flex-col ${ styles.borderRoundedL } bg-dark `}>
        <h1 className="pb-4  text-light flex justify-center">Trash Can</h1>
        { tasksDeleted.length === 0 
          ? 
            <div>
              <p className={`flex justify-center text-light `}>Your Trash is Empty</p>
            </div>
          : 
            <div className={ styles.borderRounded }>
              { tasksDeleted.map((task) => (
                <Task
                  key={ task.id }
                  task={ task }
                  onRestoreTask={ (task) => restoreTask(task) }
                  onDeleteTask={ (task) => deleteTask(task) }
                />
              )) }
            </div> 
        }
      </div>
    </div>
  );
}