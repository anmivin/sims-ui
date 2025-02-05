import * as React from 'react'
import * as Styles from './CircularProgress.styled'

const CircularProgress = (variant: 'old' | 'modern') => {
return (
    <>
        {variant === 'modern' ? ( <Styles.StyledModernSpinner width={120} height={120 * 2} viewBox='0 0 24 24'>
          <path className='path_01' d='M 12 16 L 14 20 L 12 24 L 10 20 Z' />
          <path
            className='path_02'
            d='M 9.1716 14.8284 L 7.7574 19.0711 L 3.5147 20.4853 L 4.9289 16.2426 Z'
          />
          <path className='path_03' d='M 8 12 L 4 14 L 0 12 L 4 10 Z' />
          <path
            className='path_04'
            d='M 9.1716 9.1716 L 4.9289 7.7574 L 3.5147 3.5147 L 7.7574 4.9289 Z'
          />
          <path className='path_05' d='M 12 8 L 10 4 L 12 0 L 14 4 Z' />
          <path
            className='path_06'
            d='M 14.8284 9.1716 L 16.2426 4.9289 L 20.4853 3.5147 L 19.0711 7.7574 Z'
          />
          <path className='path_07' d='M 16 12 L 20 10 L 24 12 L 20 14 Z' />
          <path
            className='path_08'
            d='M 14.8284 14.8284 L 19.0711 16.2426 L 20.4853 20.4853 L 16.2426 19.0711 Z'
          />
        </Styles.StyledModernSpinner>) : (<Styles.StyledOldSpinner width={120} height={120} viewBox='0 0 52 52'>
              <radialGradient id='background' x1='0%' x2='0%' y1='0%' y2='100%'>
                <stop offset='0%' stopColor='#5166a9' />
                <stop offset='100%' stopColor='#222943' />
              </radialGradient>
              <radialGradient id='fill' x1='0%' x2='0%' y1='0%' y2='100%'>
                <stop offset='0%' stopColor='#6c9add' />
                <stop offset='100%' stopColor='#365fa0' />
              </radialGradient>
        
              <path
                strokeLinejoin='round'
                className='contour'
                stroke='#cad4db'
                fill='url(#background)'
                d='M 11 8 L 41 8 L 28 26 L 41 44 L 11 44 L 24 26 L 11 8 Z'
              />
        
              <path
                fill='url(#fill)'
                className='hourglass_1'
                d='M 15 12 L 37 12 L 27 26 L 27 37 L 35 37 L 39 43 L 13 43 L 17 37 L 25 37 L 25 26 L 15 12 Z'
              />
        
              <path
                fill='url(#fill)'
                className='hourglass_2'
                d='M 20 19 L 32 19 L 27 26 L 27 33 L 32 33 L 39 43 L 13 43 L 20 33 L 25 33 L 25 26 L 20 19 Z'
              />
        
              <path
                fill='url(#fill)'
                className='hourglass_3'
                d='M 25 26 L 27 26 L 39 43 L 13 43 L 25 26 Z'
              />
            </Styles.StyledOldSpinner>)}
    </>
)

}


export default CircularProgress