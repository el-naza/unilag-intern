'use client'

import * as React from 'react'
import Menu from '@mui/material/Menu'

interface dropdownProps {
  handleClose: () => void
  anchorEl?: HTMLElement | null
  children: React.ReactNode
  style?: React.CSSProperties
  popupStyles?: React.CSSProperties
}

export default function AppDropDown({
  handleClose,
  anchorEl,
  children,
  style,
  popupStyles,
}: dropdownProps) {
  const open = Boolean(anchorEl)
  const paperStyle = {
    borderRadius: '8px',
    ...popupStyles,
  }

  // Inline styles for the overlay
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(198, 203, 214, 0.6)',
    display: open ? 'block' : 'none',
    zIndex: 1000,
  }

  return (
    <>
      <div style={overlayStyle} onClick={handleClose} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={style}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: paperStyle,
        }}
        // Position the menu to the left of the button
        anchorOrigin={{
          vertical: 'top', // Align top
          horizontal: 'left', // Open from the left side
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right', // Moves the menu to the left
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>{children}</div>
      </Menu>
    </>
  )
}
