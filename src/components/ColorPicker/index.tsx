import React, {useState,useEffect} from "react";
import PropTypes from 'prop-types';
// Styles
import './scss/colorPicker.scss'
import ColorList from "./ColorsList";
import ColorRGBList from "./ColorRGBList";
// Color picker component
const ColorPicker = ({value = '#000',onChange = (color:string)=>{console.log(color)},colors = [{id: 1,color: '#000',name: 'black'}]}) =>{
    const [hexColor,setHexColor] = useState(value);
    const [hexBG,setHexBG] = useState(hexColor);
    const [isHEXList,toggleHEXList] = useState(false)
    const [isRGBList,toggleRGBList] = useState(false)
    // Toggle block
    const toggleBlock = (type = '') => {
        switch (type){
            case 'hex':
                if(isRGBList) {
                    toggleRGBList(false)
                }
                setHexBG(hexColor)
                toggleHEXList(!isHEXList)
                break
            case 'rgb':
                if(isHEXList){
                    toggleHEXList(false)
                }
                toggleRGBList(!isRGBList)
                break
            default:
                throw Error('Please, set a block name to prop')
        }
    }
    // Toggle color
    const toggleColor = (type = '',newColor = '#000') => {
        switch (type) {
            case 'hex':
                setHexColor(newColor)
                setHexBG(newColor)
                toggleHEXList(false)
                onChange(hexColor)
                break
            case 'rgb':
                setHexColor(newColor)
                toggleRGBList(false)
                onChange(hexColor)
                break
            default:
                throw Error('Please, set a type to prop')
        }
    }
    // Toggle rgb bg
    const toggleRgbBG = (newColor = '#000') => {
        setHexBG(newColor)
    }
    // Cancel chages in rgb block
    const cancelRgbChanges = () => {
        setHexBG(hexColor)
        toggleRGBList(false)
    }
    // Click around component
    const handleClickOutside = (e:any) => {
        const colorPickerBlock = document.getElementsByClassName('color-picker')[0];
        if (!e.path.includes(colorPickerBlock)) {
            if(isRGBList){
                setHexBG(hexColor)
                toggleRGBList(false)
            }
            if(isHEXList) {
                toggleHEXList(false)
            }
        }
    }
    // Component did mount + did update
    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, false);
        // Component did unmount
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        }
    })
    return(
      <div className="color-picker">
          <div className="color-picker__value">
              { hexColor }
          </div>
          <div className="color-picker__btn-container">
              <div className="color-picker__color" onClick={() => toggleBlock('hex')}>
                  <button className="color-picker__color-block" style={{backgroundColor:hexBG}} />
              </div>
              <div className="color-picker__colors" onClick={() => toggleBlock('rgb')}>
                  <button className="color-picker__colors-btn fas fa-sort-down" />
              </div>
          </div>
          <div className="color-picker__color-rgb-list-container" style={{display: isRGBList?'block':'none'}}>
              <ColorRGBList cancelRgbChanges={cancelRgbChanges} backgroundHex={hexBG} toggleBG={toggleRgbBG} toggleColor={toggleColor} />
          </div>
          <div className="color-picker__color-list-container" style={{display: isHEXList?'block':'none'}}>
              <ColorList colors={colors} toggleColor={toggleColor}  />
          </div>
      </div>
  )
}
// Validate props
ColorPicker.propTypes = {
    value: (propValue: any) =>{
       if(!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(propValue['value'])){
           return new Error('Prop "value" must be in hex format. Example: #fff')
       }
    },
    onChange: PropTypes.func,
    //@ts-ignore
    colors: PropTypes.arrayOf((propValue: any,key:string)=> {
        if (isNaN(propValue[key]['id'])) {
            return new Error(
                'The "id" property must be a number'
            );
        }
        if(!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(propValue[key]['color'])){
            return new Error('The "color" must be in hex format. Example: #fff')
        }
        if (typeof propValue[key]['name'] !== 'string') {
            return new Error(
                'The "name" property must be a string'
            );
        }
    })
}
export default ColorPicker