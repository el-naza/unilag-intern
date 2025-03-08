import Image from 'next/image'
interface loaderProps {
  background?: string
  height?: string
}
const Loader = ({ background = 'bg-white', height = 'h-screen' }: loaderProps) => {
  return (
    <div className={`${height} ${background} flex`}>
      <Image
        className="m-auto animate__animated animate__heartBeat animate__infinite infinite"
        src={'/images/unilag-logo.png'}
        alt="unilag-logo"
        width={100}
        height={100}
      />
    </div>
  )
}

export default Loader
