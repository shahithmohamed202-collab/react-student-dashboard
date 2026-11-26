
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const age = 20;

  return (
    <main className={`demo${isDark ? ' is-dark' : ''}`}>
      <button
        className="button theme-toggle"
        type="button"
        aria-pressed={isDark}
        onClick={() => setIsDark((value) => !value)}
      >
        {isDark ? 'Light mode' : 'Dark mode'}
      </button>
      <section className="demo-card" aria-label="React demo">
        <p className="count">Count:{count}</p>

        <div className="counter-actions">
          <button
            className="button primary"
            type="button"
            onClick={() => setCount((value) => value + 1)}
          >
            Increase
          </button>
          <button
            className="button reset"
            type="button"
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>

        <div className="button-row">
          <button className="button delete" type="button">Delete</button>
          <button className="button outline" type="button">Outline</button>
          <button className="button secondary" type="button">secondary</button>
          <button className="button ghost" type="button">Ghost</button>
        </div>

        <div className="copy">
          <p>This is test</p>
          <p>Students</p>
          <p>I am user and age is {age}</p>
        </div>
      </section>
    </main>
  );
}

export default App;
