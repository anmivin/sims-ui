import styled from '@emotion/styled'
import BaseSliderValueLabel from './valueLabel';

export const SliderRoot = styled('span')(
{
    borderRadius: 12,
    boxSizing: 'content-box',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    touchAction: 'none',
    WebkitTapHighlightColor: 'transparent',
    'disabled': {
      pointerEvents: 'none',
      cursor: 'default',
      color: (theme.vars || theme).palette.grey[400],
    },
    'dragging': {
      [`& .${sliderClasses.thumb}, & .${sliderClasses.track}`]: {
        transition: 'none',
      },
    },
   '.horizontal' : {
          height: 4,
          width: '100%',
          padding: '13px 0',
           marginBottom: 20,
        },
      


     '.vertical': {
          height: '100%',
          width: 4,
          padding: '0 13px',
         
          marginRight: 44,
        },

  });

export const SliderRail = styled('span')({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38,
  '.horizontal' : {
    width: '100%',
        height: 'inherit',
        top: '50%',
        transform: 'translateY(-50%)',
  },
  '.vertical': {
    height: '100%',
    width: 'inherit',
    left: '50%',
    transform: 'translateX(-50%)',
  }
 
});

export const SliderTrack = styled('span')({
      display: 'block',
      position: 'absolute',
      borderRadius: 'inherit',
      border: '1px solid currentColor',
      backgroundColor: 'currentColor',
      transition: theme.transitions.create(['left', 'width', 'bottom', 'height'], {
        duration: theme.transitions.duration.shortest,
      }),
      '.horizontal': {
        height: 'inherit',
        top: '50%',
        transform: 'translateY(-50%)'
      },
      '.verical': {
        width: 'inherit',
        left: '50%',
        transform: 'translateX(-50%)'
      }
      
    });

export const SliderThumb = styled('span')({
    position: 'absolute',
    width: 20,
    height: 20,
    boxSizing: 'border-box',
    borderRadius: '50%',
    outline: 0,
    backgroundColor: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create(['box-shadow', 'left', 'bottom'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&::before': {
      position: 'absolute',
      content: '""',
      borderRadius: 'inherit',
      width: '100%',
      height: '100%',
      boxShadow: (theme.vars || theme).shadows[2],
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      borderRadius: '50%',
      // 42px is the hit target
      width: 42,
      height: 42,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    [`&.${sliderClasses.disabled}`]: {
      '&:hover': {
        boxShadow: 'none',
      },
    },

      'horizontal': {
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
      'vertical': {
          left: '50%',
          transform: 'translate(-50%, 50%)',
        },
      
      
  });

export const SliderValueLabel = styled(BaseSliderValueLabel)({
    zIndex: 1,
    whiteSpace: 'nowrap',
    ...theme.typography.body2,
    fontWeight: 500,
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    position: 'absolute',
    backgroundColor: (theme.vars || theme).palette.grey[600],
    borderRadius: 2,
    color: (theme.vars || theme).palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem 0.75rem',
    'horizontal': 
    
 {
          transform: 'translateY(-100%) scale(0)',
          top: '-10px',
          transformOrigin: 'bottom center',
          '&::before': {
            position: 'absolute',
            content: '""',
            width: 8,
            height: 8,
            transform: 'translate(-50%, 50%) rotate(45deg)',
            backgroundColor: 'inherit',
            bottom: 0,
            left: '50%',
          },
          [`&.${sliderClasses.valueLabelOpen}`]: {
            transform: 'translateY(-100%) scale(1)',
          },
        },
     'vertical': {
          transform: 'translateY(-50%) scale(0)',
          right: '30px',
          top: '50%',
          transformOrigin: 'right center',
          '&::before': {
            position: 'absolute',
            content: '""',
            width: 8,
            height: 8,
            transform: 'translate(-50%, -50%) rotate(45deg)',
            backgroundColor: 'inherit',
            right: -8,
            top: '50%',
          },
          [`&.${sliderClasses.valueLabelOpen}`]: {
            transform: 'translateY(-50%) scale(1)',
          },
        },
      },
      );


export const SliderMark = styled('span')({
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
     'horizontal': {
          top: '50%',
          transform: 'translate(-1px, -50%)',
        },
      'vertical': {
          left: '50%',
          transform: 'translate(-50%, 1px)',
        },
     
  });

export const SliderMarkLabel = styled('span')({
    color: (theme.vars || theme).palette.text.secondary,
    position: 'absolute',
    whiteSpace: 'nowrap',
'horizontal' : {
          top: 30,
          transform: 'translateX(-50%)',
          '@media (pointer: coarse)': {
            top: 40,
          },
        },
'vertical' : {
          left: 36,
          transform: 'translateY(50%)',
          '@media (pointer: coarse)': {
            left: 44,
          },
        },
      
  });