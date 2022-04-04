import React from 'react'
import Men from '../../videos/Men.webp'

function ImageIntro() {
  return (
      <div className='relevant'>
          <img className='h-[110vh] w-[100%] object-cover'width="100%" height='100vh' src={Men} />
          <div className='absolute bottom-[150px] right-0 left-0 text-center text-white font-bold '>
                <span className='text-1xl tracking-wider'>CASUAL TO CLASSIC</span>
                <h1 className='text-5xl tracking-wide sm:text-3xl'>LUXURY TRAVELWEAR</h1>
                <button className='bg-white text-black text-base py-[10px] px-[20px] mt-6'>SHOP NOW</button>
            </div>
    </div>
  )
}

export default ImageIntro