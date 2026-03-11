import React, { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Clock } from "lucide-react"

export function SessionExpiryWarning() {
  const { session, signOut } = useAuth()
  const [warningOpen, setWarningOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0) // in seconds

  // Simulated session expiry logic (For MVP, we assume a token expiration, but Supabase handles renewal automatically usually. 
  // If the requirement dictates "Auto logout after period of inactivity or real expiration", we can mock it here or hook to real JWT exp)
  
  React.useEffect(() => {
    if (!session?.expires_at) return

    const checkExpiry = setInterval(() => {
      const now = Math.floor(Date.now() / 1000)
      const exp = session.expires_at!
      const remainingSeconds = exp - now

      // 5 minutes = 300 seconds
      if (remainingSeconds > 0 && remainingSeconds <= 300) {
        setWarningOpen(true)
        setTimeLeft(remainingSeconds)
      } else if (remainingSeconds <= 0) {
        setWarningOpen(false)
        signOut()
      } else {
        setWarningOpen(false)
      }
    }, 1000)

    return () => clearInterval(checkExpiry)
  }, [session, signOut])

  if (!warningOpen) return null

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <Dialog open={warningOpen} onOpenChange={setWarningOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <DialogTitle className="text-heading-lg text-foreground">세션 만료 경고</DialogTitle>
          </div>
          <DialogDescription className="text-body-lg">
            보안을 위해 잠시 후 로그아웃됩니다. 진행 중인 작업을 저장해주세요.
            <br className="mb-2" />
            <span className="font-bold text-destructive">
              남은 시간: {minutes}분 {seconds < 10 ? `0${seconds}` : seconds}초
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-3">
          <Button variant="outline" onClick={() => signOut()}>지금 로그아웃</Button>
          <Button onClick={() => setWarningOpen(false)}>작업 계속하기 (세션 연장)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
