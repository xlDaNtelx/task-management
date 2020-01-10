import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

const fetchData = async () => {
    const config = {
        apiKey: 'AIzaSyA-ejMbM00y1YdqFDt85rGPiHWyWG6zO4A ',
        databaseURL: 'https://task-management-af948.firebaseio.com/'
    };
    firebase.initializeApp(config);

    const rootObject = firebase.database().ref();

    const values = await rootObject.once('value');

    return values.val();
};

function App() {
    const [data, setData] = useState({});

    useEffect(() => {
        fetchData().then(data => setData(data));

        const rootObject = firebase.database().ref();

        rootObject.on('value', snap => {
            setData(snap.val());
        });
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <p>
                    {data &&
                        data.tasks &&
                        data.tasks.map(item =>
                            <span key={`${item.id}`}>
                                {item.name}
                                <br />
                                {item.desc}
                                <br />
                                {item.date}
                                <br />
                            </span>
                        )}
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <div>
                    <form
                        action=""
                        onSubmit={event => {
                            event.preventDefault();
                            console.log(event.target.name.value);
                            const tasks = firebase.database().ref('tasks');
                            tasks.child(data.tasks.length).set({
                                key: '2',
                                id: '2',
                                name: 'someName',
                                desc: 'someDesc'
                            });
                            // const newTask = tasks.push();
                        }}
                    >
                        <input type="text" name="name" />
                        <br />
                        <textarea name="desc" />
                        <br />
                        <button>Click me</button>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default App;
