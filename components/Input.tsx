import React from "react"

// Defining the props interface for the Input component by using types from TypeScript
interface InputProps {
    id: string;
    onChange: any;
    value:string;
    label:string;
    type?:string;
    autoFocus?: any;
    onKeyDown?: any;
}

// Defining the Input component
/*Here we are using Functional Component: define the component in react with JS function instead of Classes
functional components are an elegant and modern way to create user interfaces in React, 
offering a lighter syntax and the ability to use advanced features through hooks.*/ 
const Input: React.FC <InputProps> = ({
    id,
    onChange,
    value,
    label,
    type,
    autoFocus,
    onKeyDown
}) => {
    return (
        <div className="relative">
            <input
                onChange={onChange}
                value={value}
                type={type}
                id= {id}
                autoFocus= {autoFocus}
                onKeyDown={onKeyDown}
                className="
        block
        rounded-md
        px-6
        pt-6
        pb-1
        w-full
        text-md
        text-white
        bg-neutral-700
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        "
                placeholder=" "
            />
            <label
            className="
            absolute
            text-md
            text-zinc-400
            duration-150
            transform
            -translate-y-3
            scale-75
            top-4
            z-10
            origin-[0]
            left-6
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3
            "
            htmlFor= {id}>
                {label}
            </label>
        </div>
    );
};

export default Input;
