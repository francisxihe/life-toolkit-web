import React from 'react';

export default function SiteIcon({
  id,
  width = 16,
  height = 16,
  className,
  style,
  onClick,
}: {
  id: string;
  width?: number;
  height?: number;
  className?: string;
} & React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      className={`${className} fill-[currentColor]`}
      onClick={onClick}
      style={style}
    >
      <use href={`${import.meta.env.VITE_APP_BASE_PATH}/icons.svg#${id}`} />
    </svg>
  );
}
