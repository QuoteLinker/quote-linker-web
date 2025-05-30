import React from 'react';
import { Popover } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface TooltipProps {
  content: string;
}

export function Tooltip({ content }: TooltipProps) {
  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="rounded-full" aria-describedby={tooltipId}>
            <InformationCircleIcon
              className={`h-5 w-5 text-[#28A745] hover:text-[#28A745] transition-colors ${
                open ? 'text-[#28A745]' : ''
              }`}
            />
          </Popover.Button>
          <Popover.Panel
            id={tooltipId}
            role="tooltip"
            className="absolute z-10 w-72 px-4 mt-3 transform -translate-x-1/2 left-1/2 transition-opacity duration-200 ease-in-out"
          >
            <div className="bg-[#F8F9FA] text-[#212529] text-sm rounded-lg py-2 px-3 shadow-lg">
              {content}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-[#F8F9FA]" />
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
