import React, { useRef } from 'react'

const ImageToggle = ({ primaryImg, secondaryImg, size }) => {
  const imageRef = useRef(null);
  
  return (
    <img 
      onMouseOver={ () => {
        imageRef.current.src = secondaryImg;
      } }
      onMouseOut={ () => {
        imageRef.current.src= primaryImg;
      } }
      src={ primaryImg } 
      alt=""
      ref={ imageRef }
      className={`w-[${ size }] h-[${ size }] `}
    />
  )
}

export default ImageToggle