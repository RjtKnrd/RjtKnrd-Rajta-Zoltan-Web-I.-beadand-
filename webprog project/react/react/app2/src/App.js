function app1() {
  const { useState } = React;
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Számláló</h2>
      <p>Érték: {count}</p>
      <button onClick={() => setCount(count + 1)}>Növel</button>
      <button onClick={() => setCount(count - 1)}>Csökkent</button>
    </div>
  );
}

window.app1 = app1;