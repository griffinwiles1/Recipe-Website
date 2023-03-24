import React from "react"
import PropTypes from "prop-types"

import { archive, archiveDark, edit, editDark, restore, star, starHover, starSelected, trash, trashDark } from "../assets"
import styles from "../style"

/*----- TASK STATES ----- 
  
  TASK_INBOX (Default state)
    -Options: Complete, Pin, Archive, Edit, Delete
  
  TASK_COMPLETED (Add a checkmark and text line-through)
    -Options: Restore (Replaces Complete) and Delete
  
  TASK_PINNED (Inverse the color)
    -Options: Complete, Restore (Replaces Pin), Archive, Edit, Delete

  TASK_ARCHIVED (Same as TASK_INBOX)
    -Options: Complete, Restore, Edit, Delete

  TASK_DELETED (Same as TASK_COMPLETED)
    -Options: Restore, Delete (permanently)

*/

export default function Task({ task: { id, title, state }, onCompleteTask, onPinTask, onArchiveTask, onEditTaskTitle, onRestoreTask, onDeleteTask }) {
  return (
    <div className={` 
      ${ styles.divContainer } 
      ${ styles.flexBetween } 
      ${ state } 
      rounded-s
    `}>

      { /* - TASK TITLE DIV - */ }
      <div className={` 
        ${ state === "TASK_PINNED" ? "bg-lightHeavy hover:bg-dark" : "bg-darkHeavy hover:bg-darkMed" }
        list-item flex flex-1 rounded-md
      `} >

        { /* --- CHECKBOX INPUT --- */ }
        <label
          htmlFor="checked"
          aria-label={` completeTask-${ id } `}
          className={` 
            ${ state === "TASK_PINNED" ? "checkboxDark  border-darkHeavy border-[3px]" : "border-lightHeavy border-2" } 
            checkbox  border-r-0 rounded-l-md 
          `}
        >
          <button type="checkbox">

          </button>

          <input
            type="checkbox"
            disabled={ true }
            name="checked"
            id={` completeTask-${ id } `}
            checked={ state === "TASK_COMPLETED" }
          />
          <span
            className={` flex justify-center cursor-pointer `}
            onClick={ 
              () => state === "TASK_COMPLETED" ? onRestoreTask(id) 
              : state === "TASK_DELETED" ? onSelectDeletedTask(id)
              : onCompleteTask(id) 
            }
          />
        </label>
          
        { /* --- TITLE INPUT --- */ }
        <label 
          htmlFor="title" 
          aria-label={ title } 
          className={` 
            ${ state === "TASK_PINNED" ? "border-darkHeavy border-[3px]" : "border-lightHeavy border-2" } 
            title  pl-2 border-l-0 rounded-r-md
          `} 
        >
          <input
            type="text"
            value={ title }
            readOnly={ true }
            name="title"
            placeholder="Input title"
            className={` 
              ${ state === "TASK_PINNED" ? "text-darkHeavy font-semibold" : "text-light" }
              ${ (state === "TASK_COMPLETED" || state === "TASK_DELETED") ? "line-through hover:no-underline" : "" }
              flex-1 overflow-ellipsis cursor-pointer`}
            onClick={ 
              () => state === "TASK_COMPLETED" ? onRestoreTask(id) 
              : state === "TASK_DELETED" ? onSelectDeletedTask(id)
              : onCompleteTask(id) 
            }
          />
        </label>
      
      </div> { /* - END TASK TITLE DIV - */ }


      { /* - TASK BUTTONS DIV - */ }
      <div className={` 
        ${ state === "TASK_PINNED" ? "bg-darkHeavy" : "bg-lightHeavy" }
        flex rounded-r-md
      `}>

        { /* --- PIN & ARCHIVE TASK BUTTONS --- */ }
        { (state !== "TASK_COMPLETED" && state !== "TASK_ARCHIVED" && state !== "TASK_DELETED") && (
          <div className={` flex `}>
            
            { /* --- PIN TASK --- */ }
            <div className={` 
              ${ state === "TASK_PINNED" ? styles.buttonDivLight : styles.buttonDiv } 
            `}>
              <button
                className={` taskButton `}
                onClick={ 
                  () => state === "TASK_PINNED" ? onRestoreTask(id) : onPinTask(id) 
                }
                id={` pinTask-${ id } `}
                aria-label={` pinTask-${ id } `}
                key={` pinTask-${ id } `}
              >
                <img className={` w-[16px] h-[16px] `}
                  src={ state === "TASK_PINNED" ? starSelected : star } 
                />
              </button>
            </div>
            
            { /* --- ARCHIVE TASK BUTTON --- */ }
            <div className={` 
              ${ state === "TASK_PINNED" ? styles.buttonDivLight : styles.buttonDiv } 
            `}>
              <button
                className={` taskButton `}
                onClick={ 
                  () => onArchiveTask(id) 
                }
                id={` archiveTask-${ id } `}
                aria-label={` archiveTask-${ id } `}
                key={` archiveTask-${ id } `}
              >
                <img className={` w-[16px] h-[16px] `}
                  src={ state === "TASK_PINNED" ? archiveDark : archive }
                />
              </button>
            </div>

          </div>
        ) }
        
        { /* --- RESTORE TASK BUTTON --- */ }
        { (state === "TASK_ARCHIVED" || state === "TASK_DELETED") && (
          <div className={` ${ styles.buttonDiv } `}>
            <button
              className={` taskButton `}
              onClick={ 
                () => onRestoreTask(id) 
              }
              id={` restoreDeletedTask-${ id } `}
              aria-label={` restoreDeletedTask-${ id } `}
              key={` restoreDeletedTask-${ id } `}
            >
              <img className={` w-[16px] h-[16px] `}
                src={ restore } 
              />
            </button>
          </div>
        ) }

        { /* --- EDIT TASK BUTTON --- */ }
        { (state === "TASK_INBOX" || state ==="TASK_PINNED" || state === "TASK_ARCHIVED") && (
          <div className={` 
            ${ state === "TASK_PINNED" ? styles.buttonDivLight : styles.buttonDiv } 
          `}>
            <button
              className={` taskButton `}
              onClick={ 
                () => onEditTaskTitle(id) 
              }
              id={` editTask-${ id } `}
              aria-label={` editTask-${ id } `}
              key={` editTask-${ id } `}
            >
              <img className={` w-[16px] h-[16px] `} 
                src={ state === "TASK_PINNED" ? editDark : edit } 
              />
            </button>
          </div>
        ) } 

        { /* --- DELETE TASK BUTTON --- */ } 
        <div className={` 
          ${ state === "TASK_PINNED" ? styles.buttonDivLight : styles.buttonDiv } 
          rounded-l-md 
        `}>
          <button
            className={` taskButton `}
            onClick={ 
              () => onDeleteTask(id) 
            }
            id={` deleteTask-${ id } `}
            aria-label={` deleteTask-${ id } `}
            key={` deleteTask-${ id } `}
          >
            <img className={` w-[16px] h-[16px] `}
              src={ state === "TASK_PINNED" ? trashDark : trash }
            />
          </button>
        </div>

      </div> { /* - END TASK BUTTONS DIV - */ }

    </div>
  );
}

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
    /** Id of the task */
    id: PropTypes.string.isRequired,
    /** Title of the task */
    title: PropTypes.string.isRequired,
    /** Current state of the task */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the task to completed */
  onCompleteTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to archived */
  onEditTaskTitle: PropTypes.func,
  /** Event to change the task to unpinned */
  onRestoreTask: PropTypes.func,
  /** Event to change the task to deleted */
  onDeleteTask: PropTypes.func,
};