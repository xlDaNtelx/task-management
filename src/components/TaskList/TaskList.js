import React from 'react';

export const TaskList = ({ tasks, onDelete }) => {
  console.log(tasks);
  const rows = [...Array(Math.ceil(tasks.length / 3))];
  const productRows = rows.map((row, idx) => tasks.slice(idx * 3, idx * 3 + 3));
  const content = productRows.map((row, idx) =>
    <div className="row justify-content-around mt-4">
      {row.map((item, index) =>
        <div className="card col-3" key={item.id}>
          <div
            style={{
              position: 'absolute',
              right: '10px',
              top: '5px',
              cursor: 'pointer'
            }}
          >
            <span
              style={{ color: '#0000ff' }}
              onClick={onDelete(index * (idx + 1) + idx)}
            >
              &#10006;
            </span>
          </div>
          <div class="card-body">
            <h5 class="card-title">
              <b>
                {item.name}
              </b>
            </h5>
            <p class="card-text">
              <i>
                {item.desc}
              </i>
            </p>
            <div class="alert alert-primary" role="alert">
              Deadline: <span class="alert-link">{item.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  return (
    <div>
      {content}
    </div>
  );
};
