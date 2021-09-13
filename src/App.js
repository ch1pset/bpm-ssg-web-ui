import Characters from './components/dropdowns/characters';
import Difficulties from './components/dropdowns/difficulties';
import SeedField from './components/seed/seedfield';
import GenerateButton from './components/generate/generate';
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
          <SeedField />
        </div>
        <div className="Button">
          <GenerateButton/>
        </div>
    </div>
  )
}

export default App;
