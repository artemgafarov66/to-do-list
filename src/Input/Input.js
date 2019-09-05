import React from 'react';
import './Input.scss';

export default (props) => {
  return (
    <input
      type='text'
      className='Input'
      onChange={props.changeInput}
      placeholder='What do you want to do?'
    />
  )
}