import SSG from './components/ssg'
import bpm_logo from './media/bpm_logo_1x1.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <img className="logo" src={bpm_logo} alt="BPM: Bullets Per Minute logo"/>
        <p className="Title">Seeded Save Generator</p>
      </div>
        <SSG />
    </div>
  )
}

export default App;
