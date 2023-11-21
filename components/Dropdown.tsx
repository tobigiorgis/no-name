import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import React, { FC } from 'react'

  interface Props {
    handleKeyDown: (event: KeyboardEvent) => void;
  }
  
  export const Dropdown: FC<Props> = ({handleKeyDown}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-auto flex justify-end items-center pr-2 text-sm">Commands</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleKeyDown(new KeyboardEvent('keydown', { key: 'b', metaKey: true }))}>
                    <span>Toggle Blur</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleKeyDown(new KeyboardEvent('keydown', { key: '0', metaKey: true }))}>
                    <span>Switch Page</span>
                    <DropdownMenuShortcut>⌘0</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleKeyDown(new KeyboardEvent('keydown', { key: '/', metaKey: true }))}>
                    <span>Clear ToDo</span>
                    <DropdownMenuShortcut>⌘/</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleKeyDown(new KeyboardEvent('keydown', { key: `'`, metaKey: true }))}>
                    <span>Clear Thoughts</span>
                    <DropdownMenuShortcut>⌘'</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      
    )
  }
  

  
