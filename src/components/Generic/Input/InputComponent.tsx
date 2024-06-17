import React from 'react';

type Props = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'checkbox';
  icon?: React.ReactNode;
  iconAction?: () => void;
  extraCss?: string;
};
const InputComponent: React.FC<Props> = ({
  label = '',
  name,
  placeholder = '',
  type = 'text',
  icon,
  iconAction,
  extraCss = '',
}) => {
  return (
    <div className={`rounded  my-2   ${extraCss}`}>
      {label && (
        <div className="bg-none">
          <label htmlFor={name} className="font-bold">
            {label}
          </label>
        </div>
      )}

      <div className="relative">
        {
          <>
            <input
              className="w-full p-2 border-b-2 border-b-black"
              name={name}
              placeholder={placeholder}
              type={type}
            />
            {icon && (
              <span
                onClick={iconAction}
                className="absolute right-0 bottom-0 text-3xl h-full  flex justify-center items-center"
              >
                {icon}
              </span>
            )}
          </>
        }
      </div>
    </div>
  );
};

export default InputComponent;
