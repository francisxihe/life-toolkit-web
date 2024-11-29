'use client';

import { useState, useEffect } from 'react';
import { TimePicker as ArcoTimePicker } from '@arco-design/web-react';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const [timeValue, setTimeValue] = useState<string | undefined>(value);

  useEffect(() => {
    setTimeValue(value);
  }, [value]);

  const handleTimeChange = (timeString: string) => {
    setTimeValue(timeString);
    onChange(timeString);
  };

  return (
    <ArcoTimePicker
      style={{ width: 200 }}
      value={timeValue}
      onChange={handleTimeChange}
      format="HH:mm:ss"
      placeholder="Select time"
    />
  );
}
