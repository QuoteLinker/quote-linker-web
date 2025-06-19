'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StepperProps {
  steps: {
    id: string;
    label: string;
    description?: string;
    optional?: boolean;
  }[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  onStepClickAction?: (step: number) => void;
  className?: string;
  hideLabels?: boolean;
  labelOrientation?: 'horizontal' | 'vertical';
}

export function Stepper({
  steps,
  activeStep,
  orientation = 'horizontal',
  onStepClickAction,
  className,
  hideLabels = false,
  labelOrientation = 'horizontal',
}: StepperProps) {
  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4',
        className,
      )}
    >
      {steps.map((step, index) => {
        const isActive = activeStep === index;
        const isCompleted = activeStep > index;
        const isLastStep = index === steps.length - 1;
        const isOptional = !!step.optional;

        return (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                'flex',
                labelOrientation === 'vertical' ? 'flex-col items-center gap-2' : 'flex-row items-center gap-3',
              )}
            >
              <div className="flex items-center">
                <button
                  type="button"
                  className={cn(
                    'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-solid transition-colors',
                    isActive
                      ? 'border-primary-600 bg-primary-600 text-white'
                      :                    isCompleted
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 bg-white text-gray-500',
                    onStepClickAction && 'cursor-pointer hover:bg-gray-50',
                  )}
                  onClick={() => {
                    if (onStepClickAction) {
                      onStepClickAction(index);
                    }
                  }}
                  disabled={!onStepClickAction}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
              </div>

              {!hideLabels && (
                <div className="flex flex-col">
                  <span
                    className={cn(
                      'text-sm font-medium',
                      isActive || isCompleted
                        ? 'text-gray-900'
                        : 'text-gray-500',
                    )}
                  >
                    {step.label}
                    {isOptional && (
                      <span className="ml-1 text-xs text-gray-400">(optional)</span>
                    )}
                  </span>
                  {step.description && (
                    <span className="text-xs text-gray-500">{step.description}</span>
                  )}
                </div>
              )}
            </div>

            {!isLastStep && orientation === 'horizontal' && (
              <div className="flex flex-1 items-center">
                <span
                  className={cn(
                    'h-[1px] w-full bg-gray-200',
                    isCompleted && 'bg-primary-600',
                  )}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
