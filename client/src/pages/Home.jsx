import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>Visual Creative OS</h1>
      <p>Your creative project planning canvas.</p>
      <Link to="/board">Open Canvas</Link>
    </main>
  );
}

export default Home;
