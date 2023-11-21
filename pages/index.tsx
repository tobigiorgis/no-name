import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'

import Cookies from 'js-cookie';
import { ToDo } from '@/components/ToDo';
import { Dropdown } from '@/components/Dropdown';
import { formatDistanceToNow } from 'date-fns';


const inter = Inter({ subsets: ['latin'] })


export default function Home () {

  const [searchTerm, setSearchTerm] = useState('')
  const [thoughts, setThoughts] = useState<{ text: string, date: Date }[]>([]);
  const [opacity, setOpacity] = useState(false)
  const [changePage, setChangePage] = useState(false)

  
  const onSearchTerm = () => {
    
    // If input is empty, do nothing
    if (searchTerm.length === 0) return
    
    // Send note as an object from input to thoughts array
    const updatedThoughts = [...thoughts, {text: searchTerm, date: new Date()}];
    setThoughts(updatedThoughts)

    // Clear input
    setSearchTerm('')
    console.log(searchTerm);
    console.log(thoughts);

    Cookies.set('thoughts', JSON.stringify(updatedThoughts))

  }
  
  useEffect(() => {
    const savedThoughts = Cookies.get('thoughts');
    if (savedThoughts) {
      const parsedThoughts = JSON.parse(savedThoughts);
      console.log(parsedThoughts);
      parsedThoughts.forEach((thought: any) => thought.date = new Date(thought.date));
      setThoughts(parsedThoughts);
    }
  }, []);

  

  const handleKeyDown = (event: KeyboardEvent) => {
    


    if ((event.metaKey || event.ctrlKey) && (event.key === 'b')) {

      setOpacity(!opacity)
    }
    if ((event.metaKey || event.ctrlKey) && (event.key === '0') ) {
      setChangePage(!changePage)
    }
    if ((event.metaKey || event.ctrlKey) && (event.key === `'`) ) {
      setThoughts([])
      Cookies.remove('thoughts')
    }
  }



  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);
  
  
  return (
    <main
      className={`flex min-h-screen pt-20 flex-col items-center ${changePage ? 'justify-center' : ''}  ${inter.className} bg-black text-white w-full h-full`}
    >
      {
        !changePage ? (
          <div className='flex flex-col w-3/4 h-3/4 justify-center items-center mt-10'>
            <div  className='flex flex-row w-3/4 items-center justify-between'>
              <h2 className='text-2xl font-medium pl-3 flex items-start w-2/4'>Today</h2>
              <Dropdown handleKeyDown={handleKeyDown}/>
            </div>
            <div className='w-3/4 mt-2'>
              <input 
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={ (e) => e.key === 'Enter' ? onSearchTerm() : null}
                type="text" 
                placeholder="Think something" 
                className='bg-black text-m active:outline-none w-full h-12 placeholder:text-gray hover:bg-zinc-900 pl-3 focus:outline-none rounded-md hover:duration-300'
              />
            </div>
            <hr className='mt-2 border-b-1 w-3/4'/>
            {
              thoughts.length >= 1 && (
              <ul className='mt-2 w-3/4'>
                {/* Map through thoughts array and render each thought as a list item */}
                {thoughts.slice().reverse().map((thought, index) => 
                  thought ? (
                    <li key={index} className='flex flex-row w-full items-center text-lg h-12 font-medium pl-3 hover:bg-zinc-900 focus:outline-none rounded-md hover:duration-500'>
                      <p 
                        className={`flex items-center text-white-800 h-full w-3/4 hover:duration-500 hover:blur-none ${opacity ? 'blur-sm opacity-30' : 'blur-none opacity-100'} hover:opacity-100`}>
                        {thought.text}
                      </p>
                      <p 
                        className='flex justify-end pr-2 text-xs items-center text-gray-700 w-1/4'>
                        {`${formatDistanceToNow(new Date(thought.date))} ago`}
                      </p>
                    </li>
                  ) : null
                )}
              </ul>
              )}
          </div>
        ) :
        <ToDo handleKeyDown={handleKeyDown}/>
      }
    </main>
  )
}
