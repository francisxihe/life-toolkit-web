import React from 'react';

export default function CustomIcon({
  id,
  width = 16,
  height = 16,
  className,
  onClick,
}: {
  id: string;
  width?: number;
  height?: number;
  className?: string;
} & React.DOMAttributes<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      className={`${className} fill-[currentColor]`}
      onClick={onClick}
    >
      <use href={`/public/icons.svg#${id}`} />
    </svg>
  );
}
