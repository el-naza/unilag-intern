'use client'
import React from 'react'
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import './tool-bar.scss'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ToolBar = () => {
  return (
    <div className="toolbar-width h-[72px] ml-[270px] p-[20px] bg-gray-light-5 fixed flex justify-between z-20">
      <div className="flex gap-3">
        <Button variant="outline" size="icon">
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight />
        </Button>
      </div>

      <div className="flex gap-8 items-center">
        <Button variant="ghost" className="rounded-full w-[40px] h-[40px] relative bg-gray-light-2">
          <span className="absolute top-[2px] right-[5px] text-[red] text-xs">2</span>
          <Bell className="!w-[25px] !h-[25px]" />
        </Button>

        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          </Avatar>
          <div>
            <p className="font-medium">S.C</p>
            <p className="text-xs">+2348287382</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border-none">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuItem>
                <LogOut />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default ToolBar
