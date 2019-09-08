import React from 'react';
import './Button.scss';

export default (props) => <div
    className={`button-add ${!props.isActive ? 'disabled' : ''}`}
    onClick={props.addToDo} />;