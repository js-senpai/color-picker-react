import React from 'react'
import PropTypes from "prop-types";
// Styles
import './scss/colorList.scss'

const ColorList = ({toggleHEX = (color: string) => console.log(color),colors = [{id: 1,color: '#000',name: 'black'}]}) => {
  return (
      <div className="color-list">
          <div className="color-list__container">
              <ul className="color-list__nav">
                  {
                      colors.map(({id,color,name}) =>(
                          <li key={id} onClick={() => toggleHEX(color)} className="color-list__nav-item">
                              <div className="color-list__nav-item__title">{ name }</div>
                              <div className="color-picker__color-block color-list__nav-item__color" style={{backgroundColor: color}}/>
                          </li>
                      ))
                  }
              </ul>
          </div>
      </div>
  )
}
ColorList.propTypes = {
    toggleHEX: PropTypes.func,
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
export default ColorList