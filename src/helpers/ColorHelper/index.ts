// Hex to rgb
const hexToRgb = (hex:string) => {
    if(!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(hex)){
        return [0,0,0]
    }
    // @ts-ignore
    return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        ,(m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
}
// RGB to hex
const rgbToHex = (r:number, g:number, b:number): string => '#' + [r, g, b]
    .map(x => x.toString(16).padStart(2, '0')).join('')
export  {
    hexToRgb,
    rgbToHex
}