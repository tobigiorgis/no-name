import React, { FC, useEffect, useState } from 'react'
import Task from './Task';
import Cookies from 'js-cookie';
import { Dropdown } from './Dropdown';

interface Props {
    handleKeyDown: (event: KeyboardEvent) => void;
  }

export const ToDo: FC<Props> = ({handleKeyDown}) => {



    
      return (
        <div className='w-3/4 h-full flex flex-col justify-center items-center'>
            <h2 className='h-1/8 w-3/4 text-2xl font-medium'>3x5 Notecard</h2>
            <Dropdown handleKeyDown={handleKeyDown}/>
            <ul className='flex flex-col w-3/4 h-7/8 mt-5'>
            {Array.from({ length: 5 }).map((_, index) => (
                <Task key={index} index={index} placeholder={`Task ${index + 1}`} />
            ))}
            </ul>
        </div>
      );
}
