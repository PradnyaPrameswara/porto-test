import { useState } from "react"

import { Button } from "@/components/ui/button"

export function FoundationCheck() {
  const [checked, setChecked] = useState(false)

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => setChecked((previous) => !previous)}
    >
      {checked ? "React interaction works" : "Test React interaction"}
    </Button>
  )
}
