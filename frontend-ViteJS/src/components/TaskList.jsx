import React from "react"
import Task from "./Task"
import { useDispatch, useSelector } from "react-redux"
import { updateTaskState } from "../lib/store"

import { add, trashDark } from "../assets"
import styles from "../style"

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
    <div className={` flex flex-col items-center `} data-testid="success" key={ "success" }>
      
      { /* - CURRENT TASKS DIV - */ }
      <div className={` 
        ${ styles.taskListContainer } 
      `}>
        <h1 className={` pb-4 text-light flex justify-center `}>Current Tasks</h1>
        { /* TASKS DIV */ }
        <div className={` flex md:flex-row flex-col `}>
          
          { /* --- ACTIVE TASKS --- */ }
          <div className={` 
            ${ styles.taskList }
            min-h-[200px] flex-1 
          `}>
            <div className={` flex flex-row justify-end `}>    
              <button type="button" 
                className={` 
                  ${ styles.button }
                  mb-4 px-2 py-1 
                `}
              >
                <img 
                  className={` mr-2 w-[16px] h-[16px] `}
                  src={ add } 
                />
                <p>Add Task</p>
                </button>
              </div>
              
              { (tasksActive.length === 0)
              ? 
                <div>
                  { /* - ACTIVE TASKS EMPTY - */ }
                 <p className="flex justify-center text-darkHeavy font-semibold">No Active Tasks, congrats!</p>  
                </div>
              : 
                <div>
                    
                  { /* - PINNED TASKS LIST - */ }
                  <div>
                    { tasksActive.filter((t) => t.state === "TASK_PINNED").map((task) => (
                      <div className={` 
                        ${ styles.taskListBackgroundDark }
                        ${ tasksActive.filter((t) => t.state === "TASK_INBOX").length !== 0 ? "last:rounded-b-none " : "" }
                      `}>
                        <Task
                          key={ task.id }
                          task={ task }
                          onCompleteTask={ (task) => completeTask(task) }
                          onRestoreTask={ (task) => restoreTask(task) }
                          onArchiveTask={ (task) => archiveTask(task) }
                          onEditTaskTitle={ (task) => editTaskTitle(task) }
                          onDeleteTask={ (task) => deleteTask(task) }
                        />
                      </div>
                    )) }
                  </div>
                        
                  { /* - DEFAULT TASKS LIST - */ }
                  <div>
                    { tasksActive.filter((t) => t.state === "TASK_INBOX").map((task) => (
                      <div className={` 
                        ${ styles.taskListBackground }
                        ${ tasksActive.filter((t) => t.state === "TASK_PINNED").length !== 0 ? "first:rounded-t-none" : "" }
                      `}>
                        <Task
                          key={ task.id }
                          task={ task }
                          onCompleteTask={ (task) => completeTask(task) }
                          onPinTask={ (task) => pinTask(task) }
                          onArchiveTask={ (task) => archiveTask(task) }
                          onEditTaskTitle={ (task) => editTaskTitle(task) }
                          onDeleteTask={ (task) => deleteTask(task) }
                        />
                      </div>
                    )) }                      
                  </div>
                </div>
  
            }
          </div>

          { /* --- COMPLETED TASKS --- */ }
          <div className={` 
            ${ styles.taskList } 
            ml-4
          `}>
            { (tasksCompleted.length === 0)
              ? 
                <div>
                  { /* - COMPLETED TASKS EMPTY - */ }
                  <p className={` flex justify-center text-dark font-semibold `}>Such Empty! Get busy with it!</p>
                </div>
              : 
                <div className={` flex flex-col `} >
                  { /* - COMPLETED TASKS LIST - */ }
                  <div className={` 
                    ${ styles.taskListHeader }
                  `}>
                    <p className={` flex justify-center color-darkHeavy font-semibold `}>Recently Completed</p>
                    <div className={` m-2 mt-0 flex justify-end items-end `}>
                      <button type="button" 
                        className={` 
                          ${ styles.button }
                          px-2 py-1
                        `}
                      >
                        <img 
                          className={` mr-2 w-[16px] h-[16px] `}
                          src={ trashDark } 
                        />
                        <p>Delete All</p>
                      </button>
                    </div>
                  </div>
                  <div>
                    { tasksCompleted.map((task) => (
                      <div className={`
                        ${ styles.taskListBackground }
                      `}>
                        <Task
                          key={ task.id }
                          task={ task }
                          onRestoreTask={ (task) => restoreTask(task) }
                          onDeleteTask={ (task) => deleteTask(task) }
                        />
                      </div>
                    )) }
                  </div>
                </div>
            }
          </div>

        </div>
      
      </div> { /* - END CURRENT TASKS DIV - */ }

      <div className={` flex md:flex-row flex-col`}>

        { /* --- ARCHIVED TASKS --- */ }
        <div className={` 
          ${ styles.taskListContainer } 
          mt-8 flex-1
        `}>
          <h1 className={` pb-4 text-light flex justify-center `}>Archived Tasks</h1>
          <div 
            className={` 
              ${ styles.taskList } 
            `}
          >
          { tasksArchived.length === 0 
            ? 
              <div>
                { /* - ARCHIVED TASKS EMPTY - */ }
                <p className={` flex justify-center text-dark font-semibold `}>No Archived Tasks</p>
              </div>
            :
              <div>
                { /* - ARCHIVED TASKS LIST - */ }
                { tasksArchived.map((task) => (
                  <div className={`
                    ${ styles.taskListBackground }
                  `}>
                    <Task
                      key={ task.id }
                      task={ task }
                      onCompleteTask={ (task) => completeTask(task) }
                      onEditTaskTitle={ (task) => editTaskTitle(task, "Test Title") }
                      onRestoreTask={ (task) => restoreTask(task) }
                      onDeleteTask={ (task) => deleteTask(task) }
                    />
                  </div>
              )) }
            </div>
          }
          </div>
        </div>
        
        
        { /* --- DELETED TASKS --- */ }
        <div className={` 
          ${ styles.taskListContainer }
          mt-8 ml-2 flex-1 bg-dark 
        `}>
          <h1 className={` pb-4 text-light flex justify-center `}>Trash Can</h1>
          <div className={` 
            ${ styles.taskList } 
          `}>
            { tasksDeleted.length === 0 
              ? 
                <div>
                  { /* - DELETED TASKS EMPTY - */ }
                  <p className={` flex justify-center text-darkHeavy font-semibold `}>Your Trash is Empty</p>
                </div>
              : 
                <div>
                  { /* - DELETED TASKS LIST - */ }
                  <div className={` flex flex-row justify-end`}>
                    <button type="button" 
                      className={` 
                        ${ styles.button }
                        mb-2 px-2 py-1 w-auto flex justify-center
                      `}
                    >
                      <img 
                        className={` mr-2 w-[16px] h-[16px] `}
                        src={ trashDark } 
                      />
                      <p>Delete All</p>
                    </button>
                  </div>
                  <div>
                    { tasksDeleted.map((task) => (
                      <div className={`
                        ${ styles.taskListBackground }
                      `}>
                        <Task
                          key={ task.id }
                          task={ task }
                          onRestoreTask={ (task) => restoreTask(task) }
                          onDeleteTask={ (task) => deleteTask(task) }
                        />
                      </div>
                    )) }
                  </div>
                </div> 
            }
          </div>
        </div>

      </div>

    </div>
  );
}