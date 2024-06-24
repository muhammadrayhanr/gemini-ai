import * as React from 'react';

import { cn } from '@/lib/utils';
import { Controller } from 'react-hook-form';

const Textarea = React.forwardRef(({ className, control, name, ...props }, ref) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <textarea
          className={cn(
            'flex min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none',
            className
          )}
          ref={ref}
          onChange={onChange}
          value={value}
          {...props}
        />
      )}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
