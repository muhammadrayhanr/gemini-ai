import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HamburgerMenuIcon, TrashIcon } from '@radix-ui/react-icons';

const DropdownButton = ({ className, clearHistory }) => {
  return (
    <DropdownMenu className={`${className}`}>
      <DropdownMenuTrigger className="p-2">
        <HamburgerMenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem className={'text-xs'} onClick={clearHistory}>
            Clear History
            <DropdownMenuShortcut className={'text-destructive ps-3'}>
              <TrashIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownButton;
