import React from 'react';
import {Item} from 'react-photoswipe-gallery';

const GalleryImg = ({originalImg , thumbnailImg , itemWidth , itemHeight }) =>  {

  //let winDowheight = window.innerHeight;

  return (
                <Item
                    original={originalImg}
                    thumbnail={thumbnailImg}
                    width={itemWidth}
                    height={itemHeight}
                    >
                    {({ ref, open }) => (
                        <img
                            ref={ref} 
                            onClick={open}
                            src={thumbnailImg}
                            style={{width:"100%" /*, height:parseInt(winDowheight)/1*/ , cursor:"pointer"}}
                            alt={thumbnailImg}
                         />
                          )}
               </Item>
  )
}

export default GalleryImg;
