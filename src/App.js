import React, { useEffect, useState, useCallback } from 'react';
import firebase from 'firebase';

import logo from './logo.svg';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';

import { fetchData } from './api/fetchData';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import './App.css';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData().then(data => setData(data));

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
        {data &&
          data.tasks &&
          data.tasks.length > 0 &&
          <TaskList tasks={data.tasks} onDelete={onDeleteItem} />}
        <TaskModal onSubmit={onSubmit} />
        <div />
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{ position: 'relative', minHeight: '200px' }}
        >
          <div class="toast" style={{ position: 'absolute', top: 0, right: 0 }}>
            <div class="toast-header">
              <img src="..." class="rounded mr-2" alt="..." />
              <strong class="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
              <button
                type="button"
                class="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="toast-body">Hello, world! This is a toast message.</div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
