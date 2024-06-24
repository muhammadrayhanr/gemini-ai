import { Button } from '@/components/ui/button';
import { Textarea } from '../ui/textarea';
import { PaperPlaneIcon, ImageIcon, ReloadIcon, Cross1Icon, Cross2Icon } from '@radix-ui/react-icons';
import { Input } from '../ui/input';
import { useRef } from 'react';

export function InputWithButton({ control, handleSubmit, onSubmit, fileToGenerativePart, loading, imageSrc, deleteImage, visibility }) {
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full items-center space-x-2 px-[30px] relative py-2 border-t-2">
      <Input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          fileToGenerativePart(e.target.files[0]);
        }}
      />

      <label htmlFor="file-input">
        {!imageSrc ? (
          <div
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 w-10 hover:bg-accent hover:text-accent-foreground"
            onClick={handleFileButtonClick}>
            <ImageIcon className="h-5 w-5" />
          </div>
        ) : (
          <div
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 w-10 hover:bg-accent hover:text-accent-foreground"
            onClick={deleteImage}>
            <Cross2Icon className="h-5 w-5" />
          </div>
        )}
      </label>

      <Textarea
        control={control}
        name={'dataModel'}
        placeholder="Message SantAI"
      />

      <Button type="submit">
        <PaperPlaneIcon />
      </Button>

      {loading && (
        <div className="absolute top-[-50px] left-[-20px] w-full flex items-center justify-center z-50">
          <div className="flex items-center space-x-2 bg-white border rounded-full p-2 text-sm font-medium">
            <span>Generating</span>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          </div>
        </div>
      )}

      {imageSrc && (
        <div className="absolute top-[-100px] left-0">
          <img
            src={imageSrc}
            alt="selected_image"
            className="w-32 h-24 rounded-md z-50"
          />
        </div>
      )}

      {!visibility && (
        <div className="absolute top-[-400px] lg:top-[-300px] left-[-20px] w-full flex items-center justify-center">
          <img
            src="./panda-chilling.png"
            alt="panda chilling"
            className="w-44 h-auto rounded-md m-auto z-0"
          />
        </div>
      )}
    </form>
  );
}
