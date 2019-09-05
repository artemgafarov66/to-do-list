import React from 'react';
import './ToDo.scss';

export default (props) => {
  const toDoClasses = ['To-do'];
  
  if (props.isDone) toDoClasses.push('done');

  return (
    <div className={toDoClasses.join(' ')}>
      <input
        type='checkbox'
        className='checkbox'
        checked={props.isDone}
        onChange={props.onDone}/>
      <div className='name'>{props.name}</div>
      <div className='buttons'>
        <div
          onClick={props.onDelete}
          className='button-edit'/>
        <div
          onClick={props.onDelete}
          className='button-delete'/>
      </div>
    </div>
  )
}