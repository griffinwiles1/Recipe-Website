import React from "react"
import PropTypes from "prop-types"

import { archive, archiveDark, edit, editDark, restore, star, starSelected, trash, trashDark } from "../assets"
import styles from "../style"

/*----- TASK STATES ----- 
  
  TASK_INBOX (Default state)
    -Options: Complete, Pin, Archive, Edit, Delete
  
  TASK_COMPLETED (Change background color & add a checkmark and text line-through)
    -Options: Restore (Replaces Complete) and Delete
  
  TASK_PINNED (Change the color)
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
    `}>

      { /* - TASK TITLE CONTAINER BACKGROUND - */ }
      <div className={` 
        ${ state === "TASK_PINNED" ? "bg-darkHeavy" : "bg-lightMed" }
        flex flex-1 rounded-l-md
      `}>

        { /* - TASK TITLE CONTAINER - */ }
        <div className={` 
          ${ state === "TASK_PINNED" 
            ? 
              styles.button 
            : 
              (state === "TASK_COMPLETED" || state === "TASK_DELETED") 
            ?
              styles.buttonMed 
            : 
              styles.buttonDark 
          }
          list-item flex-1
        `}>

          { /* --- CHECKBOX INPUT --- */ }
          <label
            htmlFor="checked"
            aria-label={` completeTask-${ id } `}
            className={` 
              ${ state === "TASK_PINNED" ? "checkboxDark" : "" } 
              ${ state === "TASK_COMPLETED" ? "checkboxChecked" : "checkbox" }
               cursor-pointer
            `}
            onClick={ 
              () => state === "TASK_COMPLETED" ? onRestoreTask(id) 
              : state === "TASK_DELETED" ? onSelectDeletedTask(id)
              : onCompleteTask(id) 
            }
          >
            <input
              type="checkbox"
              disabled={ true }
              name="checked"
              id={` completeTask-${ id } `}
              className={` p-2 `}
              checked={ state === "TASK_COMPLETED" }
            />
            <span
              className={` flex justify-center `}
            />
          </label>

          { /* --- TITLE INPUT --- */ }
          <label 
            htmlFor="title" 
            aria-label={ title } 
            className={` title  h-full `} 
          >
            <input
              type="text"
              value={ title }
              readOnly={ true }
              name="title"
              placeholder="Input title"
              className={` 
                ${ state === "TASK_PINNED" ? "text-darkHeavy font-semibold" : "text-light" }
                ${ (state === "TASK_COMPLETED") ? "line-through" : "" }
                pl-2 flex-1 bg-transparent cursor-pointer focus:outline-none `}
              onClick={ 
                () => state === "TASK_COMPLETED" ? onRestoreTask(id) 
                : state === "TASK_DELETED" ? onSelectDeletedTask(id)
                : onCompleteTask(id) 
              }
            />
          </label>
      
        </div>
    
      </div> { /* - END TASK TITLE DIV - */ }


      { /* - TASK BUTTONS DIV - */ }
      <div className={` 
        ${ state === "TASK_PINNED" ? "bg-darkHeavy" : "bg-lightMed" }
        flex rounded-r-md
      `}>

        { /* --- PIN & ARCHIVE TASK BUTTONS --- */ }
        { (state !== "TASK_COMPLETED" && state !== "TASK_ARCHIVED" && state !== "TASK_DELETED") && (
          <div className={` flex `}>
            
            { /* --- PIN TASK --- */ }
            <div className={` 
              ${ state === "TASK_PINNED" ? styles.button : styles.buttonDark } 
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
              ${ state === "TASK_PINNED" ? styles.button : styles.buttonDark } 
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
          <div className={` ${ (state === "TASK_COMPLETED" || state === "TASK_DELETED") ? styles.buttonMed : styles.buttonDark } `}>
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
            ${ state === "TASK_PINNED" ? styles.button : styles.buttonDark } 
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
          ${ state === "TASK_PINNED" 
          ? 
            styles.button 
          : 
            (state === "TASK_COMPLETED" || state === "TASK_DELETED") 
          ?
            styles.buttonMed
          : 
            styles.buttonDark 
          } 
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
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  
  onCompleteTask: PropTypes.func,
  onPinTask: PropTypes.func,
  onArchiveTask: PropTypes.func,
  onEditTaskTitle: PropTypes.func,
  onRestoreTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
};