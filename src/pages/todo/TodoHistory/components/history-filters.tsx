'use client';

import { useState } from 'react';
// import { Calendar } from "@/components/ui/calendar";
import { Button } from '@arco-design/web-react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Select } from '@arco-design/web-react';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { TagInput } from '../../components/tag-input';
import { IMPORTANCE_LEVELS, URGENCY_LEVELS } from '../../constants';

interface HistoryFiltersProps {
  onFiltersChange: (filters: HistoryFilters) => void;
}

export interface HistoryFilters {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  importance: string;
  urgency: string;
  tags: string[];
}

export function HistoryFilters({ onFiltersChange }: HistoryFiltersProps) {
  const [filters, setFilters] = useState<HistoryFilters>({
    dateRange: {
      from: undefined,
      to: undefined,
    },
    importance: 'all',
    urgency: 'all',
    tags: [],
  });

  const updateFilters = (updates: Partial<HistoryFilters>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters: HistoryFilters = {
      dateRange: {
        from: undefined,
        to: undefined,
      },
      importance: 'all',
      urgency: 'all',
      tags: [],
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <div className="space-y-4 bg-card p-4 rounded-lg border mb-6">
      <div className="flex flex-wrap gap-4">
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              type="outline"
              className="min-w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                    {format(filters.dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(filters.dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={{
                from: filters.dateRange.from,
                to: filters.dateRange.to,
              }}
              onSelect={(range) =>
                updateFilters({
                  dateRange: {
                    from: range?.from,
                    to: range?.to,
                  },
                })
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover> */}

        <Select
          value={filters.importance}
          onChange={(value) => updateFilters({ importance: value })}
        >
          <Select.Option value="all">All Importance</Select.Option>
          {Object.entries(IMPORTANCE_LEVELS).map(([value, label]) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>

        <Select
          value={filters.urgency}
          onChange={(value) => updateFilters({ urgency: value })}
        >
          <Select.Option value="all">All Urgency</Select.Option>
          {Object.entries(URGENCY_LEVELS).map(([value, label]) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>

        <Button type="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <div className="text-sm font-medium">Filter by tags:</div>
        <div className="flex-1">
          <TagInput
            value={filters.tags}
            onChange={(tags) => updateFilters({ tags })}
            placeholder="Add tags to filter..."
          />
        </div>
      </div>
    </div>
  );
}
