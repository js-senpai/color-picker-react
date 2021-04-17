import React, {useState} from "react";
import PropTypes from "prop-types";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { hexToRgb,rgbToHex } from '../../../helpers/ColorHelper/'
// Style
import './scss/colorRgbList.scss'
const ColorRGBList = ({cancelRgbChanges = () => console.log('cancel changes'),toggleBG = (color: string) => console.log(color),toggleRGB = (color: string) => console.log(color),backgroundHex = '#000',hexColor = '#000'}) => {
  // Get rgb
  const [rgbColor,setRgbColor] = useState(hexToRgb(backgroundHex))
  // Change color
  const changeColor = (index: number,arr: number[],value: number):void => {
      arr[index] = value
      setRgbColor(arr)
      toggleBG(rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2]))
  }
  return(
      <div className="color-rgb-list">
          <div className="color-rgb-list__container">
              <ul className="color-rgb-list__nav">
                  {
                      ['R','G','B'].map((name,index)=>(
                          <li className="color-rgb-list__nav-item" key={index}>
                              <div className="color-rgb-list__nav-item__name">{ name }</div>
                              <Slider min={0} max={255} onChange={(color:number) => changeColor(index,rgbColor,color)} defaultValue={rgbColor[index]} />
                          </li>
                      ))
                  }
              </ul>
              <div className="color-rgb-list__btn-container">
                  <button className="color-rgb-list__btn color-rgb-list__btn-cancel" onClick={() => cancelRgbChanges()}>Cancel</button>
                  <button className="color-rgb-list__btn color-rgb-list__btn-submit" onClick={() => toggleRGB(rgbToHex(rgbColor[0],rgbColor[1],rgbColor[2]))}>Ok</button>
              </div>
          </div>
      </div>
  )
}
ColorRGBList.propTypes = {
    cancelRgbChanges: PropTypes.func,
    toggleBG: PropTypes.func,
    toggleRGB: PropTypes.func,
    //@ts-ignore
    hexColor: (propValue: any) =>{
        if(!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(propValue['hexColor'])){
            return new Error('Prop "value" must be in hex format. Example: #fff')
        }
    },
    backgroundHex: (propValue: any) =>{
        if(!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(propValue['backgroundHex'])){
            return new Error('Prop "value" must be in hex format. Example: #fff')
        }
    }
}
export default ColorRGBList