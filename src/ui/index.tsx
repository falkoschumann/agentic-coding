// Copyright (c) 2026 Falko Schumann. All rights reserved. MIT license.

import "bootstrap";

import "./style.css";

function App() {
  return (
    <div className="container my-3">
      <header>
        <h1 className="text-center">todos</h1>
      </header>
      <main>
        <form>
          <div className="input-group mb-3">
            <button className="btn btn-outline-primary" type="button">
              <i className="bi bi-check-lg"></i>
            </button>
            <input className="form-control" type="text" placeholder="What needs to be done?" />
          </div>
        </form>
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <input className="form-check-input me-2" type="checkbox" defaultChecked id="todo-1" />
            <label className="form-check-label" htmlFor="todo-1">
              foo
            </label>
            <button type="button" className="btn-close float-end ms-2"></button>
          </li>
          <li className="list-group-item">
            <input className="form-check-input me-2" type="checkbox" id="todo-2" />
            <label className="form-check-label" htmlFor="todo-2">
              bar
            </label>
            <button type="button" className="btn-close float-end ms-2"></button>
          </li>
          <li className="list-group-item d-flex align-items-center">
            <input className="form-check-input me-2" type="checkbox" id="todo-3" />
            <input className="form-control form-control-sm" type="text" defaultValue="edit me" />
            <button type="button" className="btn-close float-end ms-2"></button>
          </li>
        </ul>
      </main>
      <footer className="sticky-bottom py-2 bg-body">
        <nav className="navbar">
          <div className="container">
            <div>1 item left</div>
            <div className="btn-group">
              <a href="#" className="btn btn-outline-primary active" aria-current="page">
                All
              </a>
              <a href="#" className="btn btn-outline-primary">
                Active
              </a>
              <a href="#" className="btn btn-outline-primary">
                Completed
              </a>
            </div>
            <button className="btn btn-primary" type="button">
              Clear completed
            </button>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default App;
