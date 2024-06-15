import classNames from 'classnames';

interface SkeletonRowsProps {
  variant: 'primary' | 'secondary' | 'tertiary';
}

const SkeletonRows = ({ variant }: SkeletonRowsProps) => {
  const rows = Array.from({ length: 8 });

  const columns = {
    primary: 4,
    secondary: 3,
    tertiary: 7,
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200 text-sm font-medium">
      {rows.map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {Array.from({ length: columns[variant] }).map((_, colIndex) => (
            <td
              key={colIndex}
              className={classNames('', {
                hidden: (variant === 'primary' && colIndex === 1) || (variant === 'secondary' && (colIndex === 2 || colIndex === 3)),
                'hidden md:table-cell': variant === 'primary' && (colIndex === 2 || colIndex === 4),
                'hidden sm:table-cell': variant === 'tertiary' && (colIndex === 1 || colIndex === 5),
                'hidden lg:table-cell': variant === 'tertiary' && (colIndex === 2 || colIndex === 3 || colIndex === 4),
              })}>
              <div className={classNames('px-4 md:px-6 py-4 min-h-[72px] flex items-center justify-center', { 'gap-2': colIndex === 0 })}>
                {colIndex === 0 && <div className="min-w-5 min-h-5 rounded-full bg-primary-200" />}
                <div className="bg-primary-200 h-5 rounded w-full" />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default SkeletonRows;
