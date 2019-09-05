import React from 'react';
import './App.scss';
import Input from './Input/Input';
import Button from './Button/Button';
import ToDo from './ToDo/ToDo';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toDo: JSON.parse(localStorage.getItem('toDo')) || [],
      inputValue: '',
      buttonState: 'disabled',
    };
  }
  
  changeInput(inputValue) {
    let buttonState = inputValue ? 'active' : 'disabled';
    this.setState({ inputValue, buttonState });
  }

  addToDo() {
    const toDo = [...this.state.toDo];

    toDo.push({
      name: this.state.inputValue,
      done: false,
    });

    localStorage.setItem('toDo', JSON.stringify(this.toDoSort(toDo)));
    this.setState({ toDo: this.toDoSort(toDo) });
  }

  onDelete(index) {
    const toDo = [...this.state.toDo];
    toDo.splice(index, 1);
    toDo.length ? localStorage.setItem('toDo', JSON.stringify(toDo)) : localStorage.clear();
    this.setState({ toDo });
  }

  onDone(checked, index) {
    const toDo = [...this.state.toDo];
    toDo[index].done = checked;
    localStorage.setItem('toDo', JSON.stringify(toDo));
    this.setState({ toDo });
  }

  toDoSort(toDo) {
    return toDo.sort((prev, next) => {
      const x = prev.name.toLowerCase(),
        y = next.name.toLowerCase();

      return x > y ? -1 : x < y ? 1 : 0;
    });
  }

  render() {
    return (
      <div className='App'>
        <div className='title'>To do:</div>
        <div className='add-line'>
          <Input
            changeInput={(event) => this.changeInput(event.target.value)} />
          <Button
            state={this.state.buttonState}
            addToDo={this.addToDo.bind(this)} />
        </div>
        <div className='to-do-list'>
          {
            this.state.toDo.map((todo, i) => {
              return (
                <ToDo
                  key={i}
                  name={todo.name}
                  onDelete={this.onDelete.bind(this, i)}
                  onDone={(event) => this.onDone(event.target.checked, i)}
                  isDone={this.state.toDo[i].done} />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
