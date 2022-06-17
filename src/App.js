import './App.css'

import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';
import Header from './Header';
import Bulb from "./Bulb"

function App() {
  return (
    <div className="app">
      <Header />
      <div className='charts'>
        <TemperatureChart />
        <HumidityChart />
      </div>
    </div>
  );
}

export default App;
