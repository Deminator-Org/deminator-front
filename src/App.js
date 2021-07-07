import "./App.css";
import Game from "./Deminator.js";
import DeminatorService from "./DeminatorService";

function App() {
  var demServ = new DeminatorService("http://90.59.186.172/")
  return <Game width={15} height={15} lineSize={5} demServ={demServ}></Game>;
}

export default App;
