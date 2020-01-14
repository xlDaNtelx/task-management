import React from 'react';
import { TaskForm } from '../TaskForm';

export const TaskModal = ({ onSubmit }) =>
  <React.Fragment>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#staticBackdrop"
      style={{ margin: '20px auto', display: 'block' }}
    >
      Add new task +
    </button>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Add new task
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <TaskForm onSubmit={onSubmit} />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>;
