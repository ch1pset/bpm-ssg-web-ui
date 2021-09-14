import Characters from './components/dropdowns/characters';
import Difficulties from './components/dropdowns/difficulties';
import StartingFloor from './components/dropdowns/startingfloor';
import SeedField from './components/seed/seedfield';
import GenerateButton from './components/generate/generate';
import Options from './components/checkboxes/options';
import './App.css';

function App() {
  return (
    <div className="App">
        <div className="Title">
          <h1>BPM Seeded Save Generator</h1>
        </div>
        <div className="field">
          <Characters />
        </div>
        <div className="field">
          <Difficulties />
        </div>
        <div className="field">
          <StartingFloor />
        </div>
        <div className="field">
          <SeedField />
        </div>
        <div className="field">
          <Options/>
        </div>
        <div className="Button">
          <GenerateButton/>
        </div>
    </div>
  )
}

export default App;
