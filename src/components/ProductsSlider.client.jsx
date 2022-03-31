import React, { useEffect, useRef, useState } from 'react'
import Flickity from 'react-flickity-component';

const flickityOptions = {
  freeScroll: true,
  wrapAround: true,
  prevNextButtons: false,
  pageDots: false,
  cellAlign: 'left',
  percentPosition: true,
  draggable: true,
};

function Testimonial({ images }) {
  const swiperRef = useRef(null);
  const swiperOutterRef = useRef(null);
  const requestId = useRef(null);
  const flickityRef = useRef(null);
  const isMouseMoved = useRef(false);
  const lastPos = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStlProductIdx, setCurrentStlProductIdx] = useState(0);
  const [currentProductSlideIdx, setCurrentProductSlideIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(0);
console.log('images', images)
   useEffect(() => {
    flickityRef.current.flkty.on('dragMove', () => {
      isMouseMoved.current = true;
    });
    flickityRef.current.flkty.on('ready', () => {
      flickityRef.current.flkty.x = lastPos.current;
      flickityRef.current.flkty.settle(lastPos.current);
    });
    play();
   }, []);
  

  function play() {
    // Set the decrement of position x
    flickityRef.current.flkty.x -= 2.25 - (2 * settings.main_loop_animation_speed / 100);
    // Settle position into the slider
    flickityRef.current.flkty.settle(flickityRef.current.flkty.x);
    // Set the requestId to the local variable
    requestId.current = typeof window !== 'undefined' && window?.requestAnimationFrame(play);
  }
  function pause() {
    if (requestId.current) {
      // Cancel the animation
      typeof window !== 'undefined' && window?.cancelAnimationFrame(requestId.current);
      // Reset the requestId for the next animation.
      requestId.current = undefined;
    }
  }


  return (
    <div
          onMouseOver={pause}
          onDragCapture={pause}
          onMouseLeave={() => {
            if (isModalOpen) return;
            play();
          }}
          className="products-slider"
        >
          <Flickity
            ref={flickityRef}
            elementType={'div'} // default 'div'
            options={flickityOptions} // takes flickity options {}
            disableImagesLoaded={true}
            reloadOnUpdate={true}
          >
            {images.map(
              (stlProduct, stlProductIndex) => {
                return (
                  stlProduct && (
                    <div
                      key={stlProductIndex}
                      className="slider-image__wrapper"
                    >
                      <div className="slider-image__container">
                        <img
                          className="Image--lazyLoad"
                          onClick={() => {
                            if (!isMouseMoved.current) {
                              const idx =
                                stlProductIndex >= settings.stl_products.length
                                  ? stlProductIndex -
                                    settings.stl_products.length
                                  : stlProductIndex;
                              openModal(idx);
                            }
                            isMouseMoved.current = false;
                          }}
                          src={typeof window !== 'undefined' && window?.resizeImage(stlProduct, 768)}
                          alt="Shop the Look Image"
                        />
                      </div>
                    </div>
                  )
                );
              },
            )}
      </Flickity>
      </div>
  )
}

export default Testimonial