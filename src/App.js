import React from 'react';
import './App.scss';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import ToDo from './components/ToDo/ToDo';
class App extends React.Component {
  state = {
    toDo: JSON.parse(localStorage.getItem('toDo')) || [],
    newToDoName: '',
    currentToDoName: null,
  };

  copyToDo = () => [...this.state.toDo].map(toDo => ({ ...toDo }));

  changeInput(newToDoName) {
    this.setState({ newToDoName });
  }

  changeInputEdit(currentToDoName) {
    this.setState({ currentToDoName });
  }

  onDelete(index) {
    const toDo = [...this.state.toDo];
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
    this.setState({ toDo, currentToDoName: toDo[index].name });
  }

  onCancel(index) {
    const toDo = this.copyToDo();
    toDo[index].isEdit = false;
    this.setState({ toDo, currentToDoName: null });
  }

  onAdd(index) {
    const toDo = this.copyToDo();
    if (typeof index === 'undefined') {
      toDo.push({
        name: this.state.newToDoName,
        isDone: false,
        isEdit: false,
      });

      localStorage.setItem('toDo', JSON.stringify(toDo));
      return this.setState({ toDo, newToDoName: '' });
    }

    toDo[index].name = this.state.currentToDoName;
    toDo[index].isEdit = false;
    localStorage.setItem('toDo', JSON.stringify(toDo));
    this.setState({ toDo, currentToDoName: null });
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
            value={this.state.newToDoName}
            onChange={(event) => this.changeInput(event.target.value)}
            onAdd={() => this.onAdd()} />
          <Button
            isActive={this.state.newToDoName}
            addToDo={() => this.onAdd()} />
        </div>
        <div className='to-do-list'>
          {
            this.toDoSort(this.state.toDo).map((toDo, i) => (
                <ToDo
                  key={i}
                  toDo={toDo}
                  valueEdit={this.state.currentToDoName}
                  onChange={(event) => this.changeInputEdit(event.target.value)}
                  onDelete={() => this.onDelete(i)}
                  onDone={(event) => this.onDone(event.target.checked, i)}
                  onEdit={() => this.onEdit(i)}
                  onCancel={() => this.onCancel(i)}
                  onSave={() => this.onAdd(i)} />
              ))
          }
        </div>
      </div>
    );
  }
}

export default App;
