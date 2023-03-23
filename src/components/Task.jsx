import React from 'react'
import PropTypes from 'prop-types'

import { star, starHover, starSelected, starSelectedHover, archive, trash } from "../assets"
import ImageToggle from "../lib/ImageToggle"

export default function Task({ task: { id, title, state }, onCompleteTask, onPinTask, onArchiveTask, onRestoreTask, onDeleteTask }) {
  return (
    <div className={` flex flex-row justify-between list-item ${state} `}>
      <label
        htmlFor="checked"
        aria-label={` completeTask-${id} `}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={ true }
          name="checked"
          id={` completeTask-${id} `}
          checked={ state === "TASK_COMPLETED" }
        />
        <span
          className="flex justify-center checkbox-custom cursor-pointer"
          onClick={ () => state === "TASK_COMPLETED" ? onRestoreTask(id) : onCompleteTask(id) }
        />
      </label>
      <label htmlFor="title" aria-label={ title } className="w-full flex justify-start title border-0">
        <input
          type="text"
          value={ title }
          readOnly={ true }
          name="title"
          placeholder="Input title"
          className="w-max pl-2 text-primaryWhite overflow-ellipsis cursor-pointer"
          onClick={ () => state === "TASK_COMPLETED" ? onRestoreTask(id) : onCompleteTask(id) }
        />
      </label>
      
    { state !== "TASK_COMPLETED" && (
      <div className="flex justify-end">
        <button
          className="w-[16px] h-16px] flex justify-center items-center pin-button"
          onClick={ () => state === "TASK_PINNED" ? onRestoreTask(id) : onPinTask(id) }
          id={` pinTask-${ id } `}
          aria-label={` pinTask-${ id } `}
          key={` pinTask-${ id } `}
        >
          <ImageToggle
            primaryImg={ state === "TASK_PINNED" ? starSelected : star }
            secondaryImg={ state === "TASK_PINNED" ? starSelectedHover : starHover }
            size="16px"
            alt=""
          />
        </button>
        <button
          className="w-[16px] h-16px] flex justify-center items-center pin-button"
          onClick={ () => onArchiveTask(id) }
          id={` archiveTask-${ id } `}
          aria-label={` archiveTask-${ id } `}
          key={` archiveTask-${ id } `}
        >
          <img src={ archive } className="w-[16px] h-16px]" />
        </button>
      </div>
    ) }
      
    <button
      className="w-[16px] h-16px] flex justify-center items-center pin-button"
      onClick={ () => onDeleteTask(id) }
      id={` deleteTask-${ id } `}
      aria-label={` deleteTask-${ id } `}
      key={` deleteTask-${ id } `}
    >
      <img src={ trash } className="w-[16px] h-16px]" />
    </button>
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
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  /** Event to change the task to unpinned */
  onRestoreTask: PropTypes.func,
  /** Event to change the task to deleted */
  onDeleteTask: PropTypes.func,
};