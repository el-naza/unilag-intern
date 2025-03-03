interface ButtonProps {
  title: string
  width?: string
  height?: string
  backgroundColor?: string
  padding?: string
  color?: string
  border?: string
  fontWeight?: string
  fontSize?: string
  textWrap?: string
  borderRadius?: string
  handleClick?: () => void
  disabled?: string
}

export default function MainButton({
  title,
  width = 'w-[139px]',
  height = 'h-[40px]',
  backgroundColor = 'bg-[#0B7077]',
  padding = 'py-[3.6px]',
  color = 'text-white',
  border = '',
  fontWeight = 'font-bold',
  textWrap = 'whitespace-nowrap',
  fontSize = 'text-[14px]',
  borderRadius = 'rounded-[12px]',
  handleClick,
  disabled
}: ButtonProps) {
  return (
    <button
      className={`${width} ${height} ${backgroundColor} ${padding} ${color} ${border} ${fontWeight} ${fontSize} ${textWrap} ${borderRadius}`}
      onClick={handleClick}
      // disabled={disabled}
    >
      {title}
    </button>
  )
}
