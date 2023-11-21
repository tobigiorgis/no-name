import { useEffect, useState } from "react";
import Cookies from 'js-cookie';


type TaskProps = {
    placeholder: string;
    index: number;
  };

  
  const Task: React.FC<TaskProps> = ({ placeholder, index }) => {
    const [tasked, setTasked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [blur, setBlur] = useState(false);
  
    const handleTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setTasked(true);
        Cookies.set(`task-${index}`, searchTerm, { expires: 1 }); // expires after 1 day
    
      }
    };

    useEffect(() => {
        const task = Cookies.get(`task-${index}`);
        if (task) {
          setSearchTerm(task);
          setTasked(true);
        }
      }, []);

    const handleBlur = () => {
        if (!tasked) return;
        if (searchTerm === '') return;
        if (tasked) {
            setBlur(!blur);
        }
      };

    const onDoneClick = () => {
        setTasked(true);
        setBlur(!blur);
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if ((event.metaKey || event.ctrlKey) && (event.key === '/')) {
            Cookies.remove('task');
            setSearchTerm('');
            setTasked(false);
          }
        };
      
        window.addEventListener('keydown', handleKeyDown);
      
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
  
    return (
      <li className={`flex mb-4 ${blur ? 'blur-sm opacity-30' : 'blur-none opacity-100'} justify-between flex-row w-full text-lg h-12 font-medium pl-3 bg-zinc-900 focus:outline-none rounded-md hover:duration-500`} onClick={handleBlur}>
        {
          !tasked ? 
            <input 
              type="text" 
              onKeyDown={handleTask} 
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className='bg-black text-m placeholder:text-sm active:outline-none w-3/4 h-12 placeholder:text-gray-500 bg-zinc-900 pl-3 focus:outline-none rounded-md hover:duration-300'
            /> 
          : 
          <p onClick={() => setTasked(false)} className='w-3/4 h-12 text-m pl-3 flex items-center'>
            {searchTerm}
          </p>
        }
        <button className='w-1/8 pr-5' onClick={onDoneClick}>done</button>
      </li>
    );
  };
  
  export default Task;