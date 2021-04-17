import React, {useState, Validator} from "react";
import PropTypes from 'prop-types';
// Styles
import './scss/colorPicker.scss'
// Color picker component
const ColorPicker = ({value = '#000',onChange = ()=>{},colors = [{id: 1,color: '#000',name: 'black'}]}) =>{
    const [color,setColor] = useState(value);
    return(
      <div className="color-picker">
          <div className="color-picker__value">
              { color }
          </div>
          <div className="color-picker__color">
              <button className="color-picker__color-block" style={{backgroundColor:color}} />
          </div>
          <div className="color-picker__colors">
              <button className="color-picker__colors-btn fas fa-sort-down" />
          </div>
      </div>
  )
}
// Validate props
// @ts-ignore
ColorPicker.propTypes = {
    value: (propValue: any) =>{
        console.log(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(propValue['value']))
       if(!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(propValue)){
           return new Error('Prop "value" must be in hex format. Example: #fff')
       }
    },
    onChange: PropTypes.func,
    //@ts-ignore
    colors: PropTypes.arrayOf((propValue: any)=> {
        if (isNaN(propValue['id'])) {
            return new Error(
                'The "id" property must be a number'
            );
        }
        if(!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(propValue['color'])){
            return new Error('The "color" must be in hex format. Example: #fff')
        }
        if (typeof propValue['name'] !== 'string') {
            return new Error(
                'The "name" property must be a string'
            );
        }
    })
}
export default ColorPicker