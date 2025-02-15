const ModernRadioCheckIcon = () => {
  return (
    <svg width={24} height={24} viewBox='0 0 24 24'>
      <defs>
        <linearGradient id='radio-checked' x1='0%' x2='0%' y1='0%' y2='100%'>
          <stop offset='0%' stopColor='#5db823' />
          <stop offset='90%' stopColor='#269331' />
        </linearGradient>
      </defs>
      <path
        fill='url(#radio-checked)'
        d='M 12 23 C 18 23 23 18 23 12 C 23 6 18 1 12 1 C 6 1 1 6 1 12 C 1 18 6 23 12 23 Z'
      />
      <circle cx='12' cy='12' r='4' fill='#fff'></circle>
    </svg>
  );
};

export default ModernRadioCheckIcon;
