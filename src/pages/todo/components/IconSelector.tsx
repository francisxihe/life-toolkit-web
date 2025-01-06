import CustomIcon from '@/components/Icon';

export default function IconSelector(props: {
  map: Map<number, { color: string; label: string }>;
  icon: string;
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  const { map, icon, value, onChange } = props;

  return (
    <div className="py-1">
      {[...Array.from(map.entries())].map(([key, value], index) => {
        const { color, label } = value;
        return (
          <div
            key={index}
            className="px-3 py-1 flex items-center gap-2 cursor-pointer"
            onClick={() => {
              onChange(key);
            }}
          >
            <CustomIcon
              width={16}
              height={16}
              id={icon}
              className={`cursor-pointer`}
              style={{
                color: `rgb(var(--${color}-6))`,
              }}
            />
            <div className="text-body-3">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
