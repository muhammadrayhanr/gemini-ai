import * as React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Markdown from 'marked-react';

export function Bubble({ className, cardClassName, text, time, isPerson, imageSrc }) {
  return (
    <div className={`${className} pb-3`}>
      <Card className={`${cardClassName}`}>
        <CardContent>
          <div className={`text-base ${isPerson ? 'text-end' : 'text-start'} w-full`}>
            {imageSrc && (
              <div className="mb-4">
                <img
                  src={imageSrc}
                  alt="selected_image"
                  className="max-w-full h-auto rounded-md"
                />
              </div>
            )}
           <Markdown>{text}</Markdown>
          </div>
        </CardContent>
        <CardFooter>
          <label className={`flex flex-col ${isPerson ? 'items-end' : 'items-start'} text-[10px] text-end w-full text-slate-600 pt-1`}>{time}</label>
        </CardFooter>
      </Card>
    </div>
  );
}
