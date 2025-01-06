import CustomIcon from '@/components/Icon';

export default function IconSelector({
  map,
  icon,
  value,
  onChange,
}: {
  map: Map<number, { color: string; label: string }>;
  icon: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {[...Array.from(map.entries())].map(([key, value], index) => {
        const { color, label } = value;
        return (
          <CustomIcon
            key={index}
            width={16}
            height={16}
            id={icon}
            className={`text-${color} cursor-pointer`}
            onClick={() => {
              onChange(key);
            }}
          />
        );
      })}

      <CustomIcon
        width={16}
        height={16}
        id={icon}
        className={`text-info cursor-pointer`}
        onClick={() => {
          onChange(undefined);
        }}
      />
    </div>
  );
}
