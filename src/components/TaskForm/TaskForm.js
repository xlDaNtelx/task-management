import React from 'react';

export const TaskForm = ({ onSubmit }) =>
  <form
    onSubmit={onSubmit}
    style={{ paddingTop: '50px', width: '300px', margin: '0 auto' }}
  >
    <div class="form-group">
      <label for="exampleInputEmail1">Task name</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        name="name"
        required
        placeholder="Enter task name..."
      />
      <small id="emailHelp" class="form-text text-muted">
        The name we beliave
      </small>
    </div>
    <br />
    <div class="form-group">
      <label for="exampleInputEmail1">Task deadline date</label>
      <input
        type="date"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        name="date"
        required
      />
      <small id="emailHelp" class="form-text text-muted">
        Some valid date
      </small>
    </div>
    <br />
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Task description</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        name="desc"
        placeholder="Enter task description..."
        required
      />
    </div>
    <br />
    <button type="submit" class="btn btn-primary mb-2">
      Publish task
    </button>
  </form>;
