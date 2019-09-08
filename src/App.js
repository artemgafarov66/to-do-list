import React from 'react';
import './App.scss';
import Input from './Input/Input';
import Button from './Button/Button';
import ToDo from './ToDo/ToDo';
class App extends React.Component {
  state = {
    toDo: JSON.parse(localStorage.getItem('toDo')) || [],
    inputValue: '',
    inputValueEdit: null,
  };

  copyToDo = () => [...this.state.toDo].map(toDo => ({ ...toDo }));

  changeInput(inputValue) {
    this.setState({ inputValue });
  }

  changeInputEdit(inputValueEdit) {
    this.setState({ inputValueEdit });
  }

  onDelete(index) {
    const toDo = [...this.state.toDo]
    toDo.splice(index, 1);
    toDo.length ? localStorage.setItem('toDo', JSON.stringify(toDo)) : localStorage.clear();
    this.setState({ toDo });
  }

  onDone(checked, index) {
    const toDo = this.copyToDo();
    toDo[index].isDone = checked;
    localStorage.setItem('toDo', JSON.stringify(toDo));
    this.setState({ toDo });
  }

  onEdit(index) {
    const toDo = this.copyToDo();
    toDo[index].isEdit = true;
    this.setState({ toDo, inputValueEdit: toDo[index].name });
  }

  onCancel(index) {
    const toDo = this.copyToDo();
    toDo[index].isEdit = false;
    this.setState({ toDo, inputValueEdit: null });
  }

  onAdd(index) {
    const toDo = this.copyToDo();
    if (index === undefined) {

      toDo.push({
        name: this.state.inputValue,
        isDone: false,
        isEdit: false,
      });

      localStorage.setItem('toDo', JSON.stringify(toDo));
      return this.setState({ toDo, inputValue: '' });
    }

    toDo[index].name = this.state.inputValueEdit;
    toDo[index].isEdit = false;
    localStorage.setItem('toDo', JSON.stringify(toDo));
    this.setState({ toDo, inputValueEdit: null })
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
        <div className='to-do-form'>
          <Input
            value={this.state.inputValue}
            onChange={(event) => this.changeInput(event.target.value)}
            onAdd={() => this.onAdd()} />
          <Button
            isActive={this.state.inputValue}
            addToDo={() => this.onAdd()} />
        </div>
        <div className='to-do-list'>
          {
            this.toDoSort(this.state.toDo).map((toDo, i) => {
              return (
                <ToDo
                  key={i}
                  toDo={toDo}
                  valueEdit={this.state.inputValueEdit}
                  onChange={(event) => this.changeInputEdit(event.target.value)}
                  onDelete={() => this.onDelete(i)}
                  onDone={(event) => this.onDone(event.target.checked, i)}
                  onEdit={() => this.onEdit(i)}
                  onCancel={() => this.onCancel(i)}
                  onSave={() => this.onAdd(i)} />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;