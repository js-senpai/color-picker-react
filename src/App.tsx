import React from 'react';
import ColorPicker from "./components/ColorPicker";
import './assets/scss/app.scss'
function App() {
  // Default colors
  const colors:{
      id: number
      color: string
      name: string
  }[] = [
      {id: 1,color: '#000',name: 'black'},
      {id: 2,color:'#FF0C00',name: 'red'},
      {id: 3,color: '#FFF300',name: 'yellow'}]
  // Default color
  const value: string = "#FF00CC"
  const colorLog = ():void => {
      console.log('Color is change')
  }
  return (
    <div className="app-container">
       <ColorPicker value={value} colors={colors} onChange={colorLog} />
    </div>
  );
}

export default App;
