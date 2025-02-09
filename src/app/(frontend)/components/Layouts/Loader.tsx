import Image from 'next/image'

const Loader = () => {
  return (
    <div className="h-screen bg-white flex">
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
