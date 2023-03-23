import React from 'react'
import PropTypes from 'prop-types'

import { archive, pin } from "../assets"

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={` pl-2 flex justify-center bg-primaryDark list-item ${state} `}>
      <label
        htmlFor="checked"
        aria-label={` completedTask-${id} `}
        className="checkbox"
      >
        <input
          type="checkbox"
          disabled={ true }
          name="checked"
          id={` completedTask-${id} `}
          checked={ state === "TASK_COMPLETED" }
        />
        <span
          className="h-full flex justify-center checkbox-custom"
          onClick={ () => onCompletedTask(id) }
        />
      </label>

      <label htmlFor="title" aria-label={ title } className="h-full flex justify-center title">
        <input
          type="text"
          value={ title }
          readOnly={ true }
          name="title"
          placeholder="Input title"
          className="pl-2 text-primaryWhite overflow-ellipsis"
        />
      </label>

      { state !== "TASK_COMPLETED" && (
        <div className="flex justify-end">
          <button
            className="w-[16px] h-16px] flex justify-center items-center pin-button"
            onClick={ () => onPinTask(id) }
            id={` pinTask-${ id } `}
            aria-label={` pinTask-${ id } `}
            key={` pinTask-${ id } `}
          >
            <img src={ pin } className="w-[16px] h-16px]" />
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
  onCompletedTask: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
};