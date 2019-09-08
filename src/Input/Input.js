import React from 'react';
import './Input.scss';

export default (props) => {
  const handleKeyDown = (event) => !(event.keyCode === 13 && props.value) || props.onAdd();

  return <input
    type='text'
    className='input'
    onChange={props.onChange}
    onKeyDown={handleKeyDown}
    placeholder={props.value || 'What do you want to write?'}
    value={props.value}
  />
};