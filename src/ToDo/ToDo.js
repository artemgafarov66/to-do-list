import React from 'react';
import './ToDo.scss';
import Input from '../Input/Input';

export default (props) => (
  <div className={`to-do ${props.toDo.isDone ? 'done' : ''} ${!props.toDo.isEdit && props.valueEdit !== null ? 'disabled' : ''}`}>
    {props.toDo.isEdit &&
      <>
        <Input
          onChange={props.onChange}
          onAdd={props.onSave}
          value={props.valueEdit} />
        <div className='buttons'>
          <div
            onClick={props.onCancel}
            className='button-small button-delete' />
          <div
            onClick={props.onSave}
            className={`button-small button-done ${!props.valueEdit ? 'disabled' : ''}`} />
        </div>
      </>
    }
    {!props.toDo.isEdit &&
      <>
        <input
          type='checkbox'
          className='checkbox'
          checked={props.toDo.isDone}
          onChange={props.onDone} />
        <div className='name'>{props.toDo.name}</div>
        <div className='buttons'>
          <div
            onClick={props.onEdit}
            className='button-small button-edit' />
          <div
            onClick={props.onDelete}
            className='button-small button-delete' />
        </div>
      </>
    }
  </div>);