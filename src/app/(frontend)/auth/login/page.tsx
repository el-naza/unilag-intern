import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Page() {
  return (
    <div className="px-4 text-white pt-24 tracking-[0.37px]">
      <div className=" text-center">
        <h2 className="text-xl leading-[25.78px] font-medium mb-3">Login as a Siwes Applicate</h2>
        <div className="text-[12px] text-gray-light02 leading-[16.5px] mb-8">
          Enter your username, and we&apos;ll send a password reset link to the associated email
          address.
        </div>
      </div>

      <Label>Username</Label>
      <Input
        placeholder="Matric Number"
        className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light05"
      />

      <Button size="lg" className="w-full mt-8 text-gr">
        Confirm
      </Button>
    </div>
  )
}
