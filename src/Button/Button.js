import React from 'react';
import './Button.scss';

export default (props) => {
  const buttonClasses = ['Button'];

  if (props.state === 'disabled') buttonClasses.push('disabled');

  return (
    <div
      className={buttonClasses.join(' ')}
      onClick={props.addToDo}/>
  )
}