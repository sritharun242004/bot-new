"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [phase, setPhase] = useState<"cover" | "reveal" | "done">("cover")

  useEffect(() => {
    setPhase("cover")

    const t1 = setTimeout(() => setPhase("reveal"), 100)
    const t2 = setTimeout(() => setPhase("done"), 1400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname])

  const open = phase === "reveal"

  return (
    <>
      {phase !== "done" && (
        <>
          {/* Grey curtain — iris opens second */}
          <svg
            className="fixed inset-0 z-[9998] w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="greyHole">
                <rect width="100" height="100" fill="white" />
                <circle
                  cx="50"
                  cy="50"
                  r={open ? "80" : "0"}
                  fill="black"
                  style={{
                    transition: open
                      ? "r 0.9s cubic-bezier(0.76, 0, 0.24, 1) 0.25s"
                      : "none",
                  }}
                />
              </mask>
            </defs>
            <rect
              width="100"
              height="100"
              fill="var(--base-300)"
              mask="url(#greyHole)"
            />
          </svg>

          {/* White curtain — iris opens first */}
          <svg
            className="fixed inset-0 z-[9999] w-full h-full pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="whiteHole">
                <rect width="100" height="100" fill="white" />
                <circle
                  cx="50"
                  cy="50"
                  r={open ? "80" : "0"}
                  fill="black"
                  style={{
                    transition: open
                      ? "r 0.9s cubic-bezier(0.76, 0, 0.24, 1)"
                      : "none",
                  }}
                />
              </mask>
            </defs>
            <rect
              width="100"
              height="100"
              fill="var(--base-100)"
              mask="url(#whiteHole)"
            />
          </svg>
        </>
      )}

      <div
        style={{
          opacity: phase === "cover" ? 0 : 1,
          transition: phase !== "cover"
            ? "opacity 0.4s ease 0.7s"
            : "none",
        }}
      >
        {children}
      </div>
    </>
  )
}
