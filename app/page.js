'use client';
import { Bubble } from '@/components/molecules/Bubble';
import DropdownButton from '@/components/molecules/DropdownButton';
import { InputWithButton } from '@/components/molecules/InputWithButton';
import { GoogleGenerativeAI } from '@google/generative-ai';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export default function Home() {
  const [visibility, setVisibility] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, getValues, setValue, setFocus } = useForm({
    defaultValues: {
      dataModel: '',
      gemini: [],
    },
    mode: 'onChange',
  });

  const { fields, append, replace } = useFieldArray({
    control,
    name: 'gemini',
  });

  const saveHistory = (data) => {
    const historyData = JSON.stringify(data);
    localStorage.setItem('history-chat', historyData);
  };

  const getHistory = () => {
    const storedHistory = localStorage.getItem('history-chat');
    return storedHistory ? JSON.parse(storedHistory) : [];
  };

  const clearHistory = () => {
    localStorage.removeItem('history-chat');
    replace([]);
    setVisibility(false);
  };

  const deleteImage = ()=> {
    setImageSrc(null)
  }

  useEffect(() => {
    const history = getHistory();
    if (history.length > 0) {
      replace(history);
      setVisibility(true);
    }
  }, [replace]);

  useEffect(() => {
    saveHistory(fields);
  }, [fields]);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  const run = async (params) => {
    setLoading(true);
    const prompt = params;

    const fileInputEl = document.querySelector('input[type=file]');
    const imageParts = await Promise.all([...fileInputEl.files].map(fileToGenerativePart));

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    append({ text: response.text(), time: moment().format('h:mm'), isPerson: false });

    fileInputEl.value = '';
    setImageSrc(null);
    setLoading(false);
  };

  const onSubmit = () => {
    const dataModelValue = getValues('dataModel');
    run(dataModelValue);
    append({ text: dataModelValue, time: moment().format('h:mm'), isPerson: true, imageSrc: imageSrc });
    setVisibility(true);
    setValue('dataModel', '');
    setImageSrc(null);
    setFocus('dataModel');
  };

  return (
    <main className="flex flex-row justify-between py-3 relative">
      <div className="flex flex-col w-full">
        <header className="fixed top-0 w-full flex justify-between items-center px-[30px] border-b-2 py-2 bg-white z-50">
          <h1 className="text-center text-lg font-bold flex-grow">
            Sant<span className="text-blue-700">AI</span>
          </h1>
          <DropdownButton
            className="ml-auto"
            clearHistory={clearHistory}
          />
        </header>
        <div className="overflow-y-auto px-[30px] py-10">
          {visibility &&
            fields?.map((field) => (
              <Bubble
                key={field.id}
                className={`flex flex-col ${field.isPerson ? 'items-end' : 'items-start'} my-[30px]`}
                cardClassName={'max-w-[80%] p-[8px]'}
                text={field.text}
                time={field.time}
                isPerson={field.isPerson}
                imageSrc={field.imageSrc}
              />
            ))}
        </div>
        <div className="fixed bottom-0 w-full bg-white z-50">
          <InputWithButton
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            fileToGenerativePart={(params) => fileToGenerativePart(params)}
            loading={loading}
            imageSrc={imageSrc}
            deleteImage={deleteImage}
            visibility={visibility}
          />
        </div>
      </div>
    </main>
  );
}
