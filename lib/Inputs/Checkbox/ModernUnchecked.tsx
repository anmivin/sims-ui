const ModernUnchecked = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      style={{ filter: "drop-shadow(0 2px 3px #848484)" }}
    >
      <defs>
        <linearGradient id='checkbox-unchecked' x1='0%' x2='0%' y1='0%' y2='100%'>
          <stop offset='0%' stopColor='#f9f9f9' />
          <stop offset='90%' stopColor='#dddddd' />
        </linearGradient>
      </defs>
      <path
        fill='url(#checkbox-unchecked)'
        d='M 2 6 C 2 4 4 2 6 2 L 18 2 C 20 2 22 4 22 6 L 22 18 C 22 20 20 22 18 22 L 6 22 C 4 22 2 20 2 17 L 2 6'
      />
    </svg>
  );
};

export default ModernUnchecked;
