import React, { useEffect, useState } from 'react';
import "./style.css";

const Colorpalette = () => {
  const [color, setColor] = useState(["#EEEDF0", "#A1B5C1", "#F9ACA7", "#68747D", "#CF365F"]);
  const [copiedColor, setCopiedColor] = useState(null);
  const [copiedColorByC, setCopiedColorByC] = useState(null);
  const colorutil = (length) => {
    return Math.floor(Math.random() * length);
  }

  const handlecolor = () => {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    const newcolor = [...color];

    for (let i = 0; i < 5; i++) {
      let hexcolor = "#"
      for (let j = 0; j < 6; j++) {
        hexcolor += hex[colorutil(hex.length)]
      }
      newcolor[i] = hexcolor;
    }
    setColor(newcolor);
  }

  const handlecopy = (color) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(color)
        .then(() => {
          setCopiedColor(color);
          setTimeout(() => {
            setCopiedColor(null);
          }, 1500);
        })
        .catch(error => console.error('Error copying to clipboard:', error));
    } else {
      console.error('Clipboard API not available.');
    }
  }
  const handlekeypress = (event) => {
    if (event.keyCode === 32) {
      handlecolor();
    } else if (event.keyCode === 67) {
      handlecopy(color.join('\n'));
      setCopiedColorByC(color.join('\n'));
      setTimeout(() => {
        setCopiedColorByC(null);
      }, 1500);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handlekeypress);
    return () => {
      window.removeEventListener('keydown', handlekeypress);
    }
  }, [color])
    
  return (
    <>
      <div className="color">
       
 {(copiedColor && !copiedColorByC) && <p className='noti'>Color {copiedColor} copied to your clipboard</p>}
        {copiedColorByC && <p className='noti'>Palette copied to your clipboard</p>}
        <p className="head">Color palette generator</p>
        <div className="color-card">
          {
            color.map((color, index) => (
              <div key={index} className="color-item" onClick={() => handlecopy(color)}>
                <div className="inner" style={{ background: color }}></div>
                <h3>{color}</h3>
              </div>
            ))
          }
        </div>
        <button onClick={() => handlecolor()}>Generate Palette</button>
        <span>Or just press the "Spacebar" to generate new palettes.</span>
        <div className="cpbtn">Click to copy individual color. Press "C" to copy the palettes.</div>
      </div>
    </>
  );
}

export default Colorpalette;
