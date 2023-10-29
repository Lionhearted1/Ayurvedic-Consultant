import React from 'react'

const Box = (props) => {
  return (
    <>
    <div className='w-auto h-auto text-[1rem] bg-black bg-opacity-90 text-white px-4 py-2 rounded-3xl m-4 hover:bg-white hover:text-black hover:font-semibold' >
        {props.value}
    </div>
    </>
  )
}

export default Box
