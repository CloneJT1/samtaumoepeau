interface StarRatingProps {
  stars: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ stars, max = 5, size = 'md' }: StarRatingProps) {
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  }[size];

  return (
    <span className={`inline-flex gap-0.5 ${sizeClass}`} aria-label={`${stars} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          style={{ color: i < stars ? '#FFD700' : '#4B5563' }}
        >
          ★
        </span>
      ))}
    </span>
  );
}
