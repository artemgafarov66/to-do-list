import React from 'react';
import './Input.scss';

export default (props) => <input
    type='text'
    className='input'
    onChange={props.onChange}
    onKeyDown={(event) => !(event.keyCode === 13 && props.value) || props.onAdd()}
    placeholder={props.value || 'What do you want to write?'}
    value={props.value}/>;
