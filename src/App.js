import React, { useEffect, useState, useCallback } from 'react';
import firebase from 'firebase';

import logo from './logo.svg';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';

import { fetchData } from './api/fetchData';

import spinner from './assets/img/coolSpinner.gif';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
      setLoading(false);
    });

    const rootObject = firebase.database().ref();

    rootObject.on('value', snap => {
      setData(snap.val());
    });
  }, []);

  const onDeleteItem = useCallback(
    idx => () => {
      if (idx !== 0) {
        const tasks = firebase.database().ref('tasks');
        const updatedTasks = data.tasks.filter(
          (_, index) => index !== Number(idx)
        );
        tasks.set(updatedTasks);
      }
    },
    [data.tasks]
  );

  const onSubmit = useCallback(
    event => {
      event.preventDefault();

      const { target: { name, desc, date } } = event;
      const tasks = firebase.database().ref('tasks');

      tasks.child(data.tasks.length).set({
        id: data.tasks.length,
        name: name.value,
        desc: desc.value,
        date: date.value
      });
    },
    [data.tasks]
  );

  return (
    <div className="App">
      <header className="App-header container">
        <div style={{ textAlign: 'center' }}>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ width: '30%' }}
          />
        </div>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>
          My task list
        </h2>
        {!loading &&
          data &&
          data.tasks &&
          data.tasks.length > 0 &&
          <TaskList tasks={data.tasks} onDelete={onDeleteItem} />}
        <TaskModal onSubmit={onSubmit} />
        {loading &&
          <div style={{ textAlign: 'center' }}>
            <img src={spinner} alt="spinner" />
          </div>}
        <div />
      </header>
    </div>
  );
}

export default App;
