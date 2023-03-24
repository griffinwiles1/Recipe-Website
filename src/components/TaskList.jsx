import React from "react";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";

import styles from "../style";

/*----- TASK STATE ORGANIZATION ----- 
  
    --- Current Tasks ---
      
      - Active Tasks -
      TASK_INBOX
        -Options: Complete, Pin, Archive, Edit, Delete

      TASK_PINNED (Move to the top of the list)
        -Options: Complete, Restore (Replaces Pin), Archive, Edit, Delete
  
        
      - Completed Tasks -
      TASK_COMPLETED (Move to its own list within 'Current Tasks')
        -Options: Restore (Replaces Complete) and Delete
    
    --- End Current Tasks ---

    --- Archived Tasks ---
    TASK_ARCHIVED (Move to its own list)
      -Options: Complete, Restore, Edit, Delete


    --- Deleted Tasks ---
    TASK_DELETED (Move to its own list)
      -Options: Restore, Delete (permanently)

*/

export default function TaskList() {
  
  // Retrieve our states from the store
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

  // Dispatch the relevant events back to our store
  const completeTask = (value) => {
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_COMPLETED" }));
  };
  const pinTask = (value) => {
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
  };
  const archiveTask = (value) => {
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
  };
  const editTaskTitle = (value, updatedTitle) => {
    dispatch(updateTaskState({ id: value, title: updatedTitle, newTaskState: "TASK_COMPLETED" }));
  };
  const restoreTask = (value) => {
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_INBOX" }));
  };
  const deleteTask = (value) => {
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
    <div className={` list-items `} data-testid="success" key={ "success" }>
      
      { /* - CURRENT TASKS DIV - */ }
      <div className={` 
        ${ styles.borderRoundedL }
        mx-4 p-4 flex flex-col bg-dark 
      `}>
        <h1 className={` pb-4 text-light flex justify-center `}>Current Tasks</h1>
        
        { /* --- ACTIVE TASKS --- */ }
        <div className={` p-2 rounded-md bg-light  `}>
          { (tasksActive.length === 0)
            ? 
              <div> { /* - EMPTY - */ }
                <p className="flex justify-center text-darkHeavy font-semibold">No Active Tasks, congrats!</p>
              </div>
            : 
              <div className={` bg- `}>
                { tasksActive.map((task) => (
                  <div className={` 
                    ${ task.state === "TASK_PINNED" ? "bg-darkHeavy" : "bg-lightHeavy" } 
                    taskList
                  `}>
                    <Task
                      key={ task.id }
                      task={ task }
                      onCompleteTask={ (task) => completeTask(task) }
                      onPinTask={ (task) => pinTask(task) }
                      onRestoreTask={ (task) => restoreTask(task) }
                      onArchiveTask={ (task) => archiveTask(task) }
                      onEditTaskTitle={ (task) => editTaskTitle(task) }
                      onDeleteTask={ (task) => deleteTask(task) }
                    />
                  </div>
                )) }
              </div>
          }
        </div>

        { /* --- COMPLETED TASKS --- */ }
        <div className={` 
          ${ styles.borderRounded } 
          mt-4 bg-light  
        `}>
          { (tasksCompleted.length === 0)
            ? 
              <div> { /* - EMPTY - */ }
                <p className={` flex justify-center text-dark font-semibold `}>Such Empty! Get busy with it!</p>
              </div>
            : 
              <div > { /* - DATA - */ }
                { tasksCompleted.map((task) => (
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
      
      </div> { /* - END CURRENT TASKS DIV - */ }

      
      { /* --- ARCHIVED TASKS --- */ }
      <div className={` 
        ${ styles.borderRoundedL } 
        mx-4 mt-8 p-4 flex flex-col bg-dark
      `}>
        <h1 className={` pb-4 text-light flex justify-center `}>Archived Tasks</h1>
        { tasksArchived.length === 0 
          ? 
            <div> { /* - EMPTY - */ }
              <p className={` flex justify-center text-light `}>No Archived Tasks</p>
            </div>
          :
            <div className={` ${ styles.borderRounded } `}> { /* - DATA - */ }
              { tasksArchived.map((task) => (
                <Task
                  key={ task.id }
                  task={ task }
                  onCompleteTask={ (task) => completeTask(task) }
                  onEditTaskTitle={ (task) => editTaskTitle(task, "Test Title") }
                  onRestoreTask={ (task) => restoreTask(task) }
                  onDeleteTask={ (task) => deleteTask(task) }
                />
            )) }
          </div>
        }
      </div>
      
      
      { /* --- DELETED TASKS --- */ }
      <div className={` ${ styles.borderRoundedL }
        mx-4 mt-8 p-4 flex flex-col bg-dark 
      `}>
        <h1 className={` pb-4 text-light flex justify-center `}>Trash Can</h1>
        { tasksDeleted.length === 0 
          ? 
            <div> { /* - EMPTY - */ }
              <p className={` flex justify-center text-light `}>Your Trash is Empty</p>
            </div>
          : 
            <div className={` ${ styles.borderRounded } `}> { /* - DATA - */ }
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