"use client"

import { useState, useEffect, useCallback } from "react"
import confetti from "canvas-confetti"
import { Heart } from "lucide-react"
import { url } from "inspector"

// Steps
const STEPS = {
  AUTH: 0,
  TYPEWRITER: 1,
  BIRTHDAY_CORNER: 2,
  LOVE_COUNTER: 3,
  MEMORY: 4,
  TREASURE_HUNT: 5,
  FINAL: 6,
}

// Letter content for typewriter
const LETTER_TEXT = `Sevgili bebeğim,

Bu özel gününde seninle birlikte olduğum için çok mutluyum. Sen hayatıma giren en güzel şeysin.

Her geçen gün sana daha çok bağlanıyorum. Gülüşün, bakışların, sesin... Her şeyin benim için paha biçilemez.

İyi ki varsın, iyi ki benimlesin.

Sonsuza kadar seninle...`

// Scrapbook Typewriter Component for left page note
function ScrapbookTypewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [text])

  return (
    <p className="font-serif text-sm md:text-base text-[#5D4037] leading-relaxed">
      {displayedText}
      {!isComplete && <span className="typewriter-cursor">|</span>}
    </p>
  )
}

// Love Typewriter Component for right page
function LoveTypewriter() {
  const [displayedText, setDisplayedText] = useState("")
  const loveText = "Seni cok seviyorum..."
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Delay start to allow polaroid to appear first
    const startDelay = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index < loveText.length) {
          setDisplayedText(loveText.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, 80)
      return () => clearInterval(interval)
    }, 800)
    return () => clearTimeout(startDelay)
  }, [])

  return (
    <div className="text-center">
      <p className="font-serif text-2xl md:text-3xl text-[#E57373] italic">
        {displayedText}
        {!isComplete && displayedText.length > 0 && <span className="typewriter-cursor text-[#E57373]">|</span>}
      </p>
      {isComplete && (
        <div className="mt-2 animate-fade-in">
          <span className="text-[#E57373] text-xl">&#9829;</span>
        </div>
      )}
    </div>
  )
}

// Letter Typewriter Component (kept for compatibility)
function LetterTypewriter() {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < LETTER_TEXT.length) {
        setDisplayedText(LETTER_TEXT.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="font-serif text-lg md:text-xl text-[#5D4037] whitespace-pre-line leading-relaxed min-h-[200px]">
        {displayedText}
        {!isComplete && <span className="typewriter-cursor">|</span>}
      </div>
      {isComplete && (
        <div className="text-right animate-fade-in">
          <span className="font-serif text-[#E57373] text-2xl">&#9829;</span>
        </div>
      )}
    </div>
  )
}

// Auth Title Typewriter
function AuthTitleTypewriter() {
  const [displayedText, setDisplayedText] = useState("")
  const text = " Hatırlarsan girebilirsin bebeğim..."
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <h1 className="font-serif text-2xl md:text-3xl text-[#5D4037] text-center">
      {displayedText}
      {!isComplete && <span className="typewriter-cursor">|</span>}
    </h1>
  )
}

// Interactive Date Pinpad Auth Screen
function AuthScreen({ onSuccess }: { onSuccess: () => void }) {
  const [digits, setDigits] = useState<string[]>([])
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const correctPassword = "220925"

  const handleDigitPress = (digit: string) => {
    if (digits.length >= 6 || isSuccess) return
    
    setPressedKey(digit)
    setTimeout(() => setPressedKey(null), 150)
    
    const newDigits = [...digits, digit]
    setDigits(newDigits)

    // Auto-check when 6 digits entered
    if (newDigits.length === 6) {
      const enteredPassword = newDigits.join("")
      if (enteredPassword === correctPassword) {
        // Success
        setIsSuccess(true)
        setTimeout(() => {
          onSuccess()
        }, 1200)
      } else {
        // Error
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
          setDigits([])
        }, 600)
      }
    }
  }

  const handleDelete = () => {
    if (digits.length > 0 && !isSuccess) {
      setDigits(digits.slice(0, -1))
    }
  }

  const pinpadLayout = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["", "0", "del"]
  ]

  
  return (
    <div className="fixed inset-0 flex items-center justify-center mesh-gradient-bg overflow-hidden">
      {/* Success heart overlay */}
      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <svg
            className="heart-grow text-[#7ed3f0]"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      )}

      {/* Main Panel */}
      <div className={`glass-panel glow-border rounded-3xl p-8 md:p-10 w-full max-w-sm mx-4 ${isSuccess ? "page-zoom-in" : ""}`}>
        {/* Title with typewriter */}
        <div className="mb-6">
          <AuthTitleTypewriter />
        </div>

        {/* Date format hint */}
        <p className="text-center text-[#FFAB91] text-sm mb-6 tracking-widest">
          GG / AA / YY
        </p>

        {/* Heart Input Display */}
        <div className={`flex justify-center gap-3 mb-8 ${isError ? "shake" : ""}`}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="flex flex-col items-center">
              {digits[index] ? (
                <svg
                  className={`w-8 h-8 text-[#E57373] heart-pop ${isError ? "heart-error" : ""}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : (
                <div className="w-8 h-8 flex items-end justify-center">
                  <div className="w-5 h-0.5 bg-[#FFAB91] rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pinpad */}
        <div className="grid grid-cols-3 gap-3">
          {pinpadLayout.map((row, rowIndex) => (
            row.map((key, colIndex) => {
              if (key === "") {
                return <div key={`${rowIndex}-${colIndex}`} className="w-full" />
              }
              if (key === "del") {
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={handleDelete}
                    className="pinpad-button w-full aspect-[2/1] rounded-full flex items-center justify-center"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#5D4037"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                )
              }
              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleDigitPress(key)}
                  className={`pinpad-button w-full aspect-[2/1] rounded-full flex items-center justify-center text-2xl font-serif text-[#5D4037] ${
                    pressedKey === key ? "button-press" : ""
                  }`}
                >
                  {key}
                </button>
              )
            })
          ))}
        </div>
      </div>
    </div>
  )
}

// Birthday Typewriter Screen with lipstick background and confetti
function TypewriterScreen({ onContinue }: { onContinue: () => void }) {
  const [displayedText, setDisplayedText] = useState("")
  const [showButton, setShowButton] = useState(false)
  const [confettiStarted, setConfettiStarted] = useState(false)
  const fullText = "Benim bebisimin bugün doğum günü! Doğum günün kutlu olsun askımm..."

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowButton(true), 500)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  // Trigger confetti when text is complete
  useEffect(() => {
    if (displayedText.length === fullText.length && !confettiStarted) {
      setConfettiStarted(true)
      
      const duration = 4 * 1000
      const animationEnd = Date.now() + duration
      const colors = ["#FFAB91", "#F8BBD9", "#FFCDD2", "#FFE0B2", "#FFF9C4", "#64B5F6"]

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 40 * (timeLeft / duration)
        
        confetti({
          particleCount,
          startVelocity: 25,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.2,
          },
          colors,
        })
      }, 300)

      return () => clearInterval(interval)
    }
  }, [displayedText, confettiStarted])

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/birthday page.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-white/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#000000] drop-shadow-lg">
          {displayedText}
          {displayedText.length < fullText.length && (
            <span className="typewriter-cursor">|</span>
          )}
        </h1>
        
        {showButton && (
          <button
            onClick={onContinue}
            className="mt-12 px-8 py-3 bg-[#E57373] text-white font-medium text-lg rounded-full shadow-lg hover:bg-[#D95F5F] hover:scale-105 transition-all duration-300 border border-white/30"
          >
            Hazırsan Devam
          </button>
        )}
      </div>
    </div>
  )
}

// Click Typewriter for envelope
function ClickTypewriter() {
  const [displayedText, setDisplayedText] = useState("")
  const text = "mektubunu aç bitanem..."

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
        }
      }, 100)
      return () => clearInterval(interval)
    }, 500)
    return () => clearTimeout(startDelay)
  }, [])

  return (
    <p className="font-serif text-xl md:text-2xl text-[#5D4037] mt-6">
      {displayedText}
      {displayedText.length < text.length && <span className="typewriter-cursor">|</span>}
    </p>
  )
}

// Birthday Corner Section Component
function BirthdayCornerSection({ onContinue }: { onContinue: () => void }) {
  const [isLandscape, setIsLandscape] = useState(true)
  const [envelopeClicked, setEnvelopeClicked] = useState(false)
  const [showScrapbook, setShowScrapbook] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [showArrow, setShowArrow] = useState(false)

  // Check orientation
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }
    checkOrientation()
    window.addEventListener("resize", checkOrientation)
    window.addEventListener("orientationchange", checkOrientation)
    return () => {
      window.removeEventListener("resize", checkOrientation)
      window.removeEventListener("orientationchange", checkOrientation)
    }
  }, [])

  // Preload images
  useEffect(() => {
    const envelopeImg = new Image()
    const scrapbookImg = new Image()
    let loadedCount = 0

    const onLoad = () => {
      loadedCount++
      if (loadedCount === 2) {
        setImagesLoaded(true)
      }
    }

    envelopeImg.onload = onLoad
    scrapbookImg.onload = onLoad
    envelopeImg.src = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/envelop-urF8f0AQehLcaiXlR2kxYr4Kf5KU0E.png"
    scrapbookImg.src = "/20s-page.png"
  }, [])

  // Handle envelope click
  const handleEnvelopeClick = () => {
    if (!imagesLoaded) return
    setEnvelopeClicked(true)
    setTimeout(() => {
      setShowScrapbook(true)
    }, 800)
  }

  // Show arrow after scrapbook appears
  useEffect(() => {
    if (showScrapbook) {
      const timer = setTimeout(() => {
        setShowArrow(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showScrapbook])

  // Portrait mode warning
  if (!isLandscape) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF9F9] to-[#FAF0F0] z-50 p-8">
        <div className="text-6xl mb-6">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#E57373" strokeWidth="1.5">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M12 18h.01" />
          </svg>
        </div>
        <p className="font-serif text-xl md:text-2xl text-[#5D4037] text-center leading-relaxed">
          Bu deneyim icin <br />telefonunu yatay çevir askitom...
        </p>
        <div className="mt-6 animate-bounce">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFAB91" strokeWidth="2">
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Envelope Scene */}
      {!showScrapbook && (
        <div className="flex flex-col items-center justify-center animate-fade-in">
          {/* Envelope Image */}
          <div
            className={`relative cursor-pointer transition-all duration-300 envelope-pulse seal-glow ${
              envelopeClicked ? "opacity-0 scale-90" : ""
            }`}
            onClick={handleEnvelopeClick}
            style={{ 
              maxHeight: "80vh",
              transition: envelopeClicked ? "all 0.8s ease-out" : undefined
            }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/envelop-urF8f0AQehLcaiXlR2kxYr4Kf5KU0E.png"
              alt="Mektup Zarfı"
              className={`max-h-[80vh] w-auto object-contain drop-shadow-2xl ${
                !imagesLoaded ? "opacity-50" : ""
              }`}
            />
            {/* Seal overlay for glow effect */}
            <div 
              className={`seal absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full ${
                envelopeClicked ? "seal-breaking" : ""
              }`}
            />
          </div>
          
          {/* Click instruction with typewriter */}
          {!envelopeClicked && imagesLoaded && (
            <ClickTypewriter />
          )}
          
          {/* Loading indicator */}
          {!imagesLoaded && (
            <p className="font-serif text-lg text-[#5D4037] mt-6 animate-pulse">
              Yükleniyor...
            </p>
          )}
        </div>
      )}

      {/* Scrapbook Scene */}
      {showScrapbook && (
        <div className="w-full h-full flex items-center justify-center p-4 scrapbook-emerge">
          {/* Scrapbook Image with shimmer */}
          <div className="relative shimmer-border rounded-lg pen-shimmer">
            <img
              src="/20s-page.png"
              alt="Dogum Gunu Karti"
              className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Navigation Arrow - Bottom Left - Minimalist Gray */}
          {showArrow && (
            <button
              onClick={onContinue}
              className="fixed right-[30px] bottom-[30px] z-50 minimal-arrow-fade-in minimal-arrow p-3"
              aria-label="Devam Et"
            >
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function BirthdayPage() {
  const [currentStep, setCurrentStep] = useState(STEPS.AUTH)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [treasureStep, setTreasureStep] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [easterEggTriggered, setEasterEggTriggered] = useState(false)

  const startDate = new Date("2025-09-22T00:00:00")

  // Love counter
  useEffect(() => {
    if (currentStep === STEPS.LOVE_COUNTER) {
      const updateCounter = () => {
        const now = new Date()
        const diff = now.getTime() - startDate.getTime()
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        setTimeElapsed({ days, hours, minutes, seconds })
      }
      
      updateCounter()
      const interval = setInterval(updateCounter, 1000)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  // Confetti on final step
  useEffect(() => {
    if (currentStep === STEPS.FINAL) {
      const duration = 5 * 1000
      const animationEnd = Date.now() + duration
      const colors = ["#FFAB91", "#F8BBD9", "#FFCDD2", "#FFE0B2", "#FFF9C4"]

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.2,
          },
          colors,
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [currentStep])

  const goToStep = useCallback((step: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep(step)
      setIsTransitioning(false)
    }, 400)
  }, [])

  const handleEasterEgg = () => {
    setEasterEggTriggered(true)
  }

  const [password, setPassword] = useState("")

  const [typewriterText, setTypewriterText] = useState("")
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [showContinueButton, setShowContinueButton] = useState(false)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden mesh-gradient-bg">
      {/* Step 2: Birthday Corner - Full Screen Envelope & Scrapbook */}
      {currentStep === STEPS.BIRTHDAY_CORNER && (
        <BirthdayCornerSection onContinue={() => goToStep(STEPS.LOVE_COUNTER)} />
      )}

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-200/20 to-transparent blur-2xl animate-float-slow" />
        <div className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-rose-200/20 to-transparent blur-2xl animate-float-slow-reverse" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-orange-100/20 to-transparent blur-xl animate-float-medium" />
      </div>

      <div 
        className={`w-full max-w-md mx-auto flex flex-col items-center justify-center transition-opacity duration-[800ms] ease-in-out relative z-10 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Step 0: Auth Screen - Full Screen Pinpad */}
        {currentStep === STEPS.AUTH && (
          <AuthScreen onSuccess={() => goToStep(STEPS.TYPEWRITER)} />
        )}

        {/* Step 1: Typewriter Welcome - Full Screen with Lipstick Background */}
        {currentStep === STEPS.TYPEWRITER && (
          <TypewriterScreen onContinue={() => goToStep(STEPS.BIRTHDAY_CORNER)} />
        )}

        {/* Step 3: Love Counter */}
        {currentStep === STEPS.LOVE_COUNTER && (
          <div className="text-center space-y-8">
            <div className="glass-panel glow-border rounded-3xl p-8">
              <h2 className="text-2xl md:text-3xl font-serif text-[#5D4037] mb-6">
                İyi ki dediğim günden beri...
              </h2>
              
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                <div className="glass-panel glow-border p-4 rounded-2xl">
                  <div className="text-3xl md:text-4xl font-bold text-[#FF8A65]">
                    {timeElapsed.days}
                  </div>
                  <div className="text-xs md:text-sm text-[#5D4037]">Gün</div>
                </div>
                <div className="glass-panel glow-border p-4 rounded-2xl">
                  <div className="text-3xl md:text-4xl font-bold text-[#FF8A65]">
                    {timeElapsed.hours}
                  </div>
                  <div className="text-xs md:text-sm text-[#5D4037]">Saat</div>
                </div>
                <div className="glass-panel glow-border p-4 rounded-2xl">
                  <div className="text-3xl md:text-4xl font-bold text-[#FF8A65]">
                    {timeElapsed.minutes}
                  </div>
                  <div className="text-xs md:text-sm text-[#5D4037]">Dakika</div>
                </div>
                <div className="glass-panel glow-border p-4 rounded-2xl">
                  <div className="text-3xl md:text-4xl font-bold text-[#FF8A65]">
                    {timeElapsed.seconds}
                  </div>
                  <div className="text-xs md:text-sm text-[#5D4037]">Saniye</div>
                </div>
              </div>

              <p className="text-lg font-serif text-[#5D4037] mt-6">
                Varlığınla geçen her saniye daha da anlamlı...
              </p>
            </div>

            <button
              onClick={() => goToStep(STEPS.MEMORY)}
              className="salmon-button"
            >
              Bir şey daha!   
            </button>
          </div>
        )}

        {/* Step 4: The Memory (F1 Drawing) */}
          {currentStep === STEPS.MEMORY && (
    <div className="text-center space-y-8">
      
      <div className="glass-panel glow-border rounded-3xl p-8">
        <h2 className="text-2xl md:text-3xl font-serif text-[#5D4037] mb-6">
          Her şey bu çizimle başlamıştı...
        </h2>

        <div className="glass-panel glow-border p-6 rounded-3xl shadow-lg max-w-sm mx-auto">
          <div className="aspect-square rounded-2xl flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <img
              src="/f1-drawing.jpeg"
              alt="F1 Çizimim"
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>

      <p className="text-lg font-serif px-4 text-[#5D4037] mt-6">
        Senin için çizdiğim ve her gece bakarak uykuya daldığın o resime bak şimdi
      </p>

      <button
        onClick={() => goToStep(STEPS.TREASURE_HUNT)}
        className="salmon-button"
      >
        Kutlamaya devam
      </button>

    </div>
  )}

        {/* Step 5: Treasure Hunt */}
{currentStep === STEPS.TREASURE_HUNT && (
  <div className="text-center space-y-10 animate-fade-in">

    {/* Title */}
    <div className="space-y-2">
      <h2 className="text-3xl md:text-4xl font-serif text-[#5D4037]">
        Son Sürpiz
      </h2>
      <p className="text-sm text-[#5D4037]/70">
        Küçük bir şey hazırladım senin için...
      </p>
    </div>

    {/* Card */}
    <div className="glass-panel glow-border rounded-3xl p-10 max-w-md mx-auto space-y-8 transition-all duration-500">

      {/* STEP 0 */}
      {treasureStep === 0 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-6xl">🚶‍♀️</div>
          
          <p className="text-lg font-serif text-[#5D4037] leading-relaxed">
            Şimdi yavaşça dolabına<br />
            doğru ilerle.
          </p>

          <button
            onClick={() => setTreasureStep(1)}
            className="px-6 py-3 bg-[#E57373] text-white rounded-full shadow-md hover:scale-105 transition-all"
          >
            İlerledim
          </button>
        </div>
      )}

      {/* STEP 1 */}
      {treasureStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-6xl">🚪</div>

          <p className="text-lg font-serif text-[#5D4037] leading-relaxed">
            Kapağı aç…<br />
            ve en alt rafa bak.
          </p>

          <button
            onClick={() => setTreasureStep(2)}
            className="px-6 py-3 bg-[#E57373] text-white rounded-full shadow-md hover:scale-105 transition-all"
          >
            Gördüm
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {treasureStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-6xl">🎁</div>

          <p className="text-lg font-serif text-[#5D4037] leading-relaxed">
            Orada seni bekleyen bir paket var…<br />
            onu eline al.
          </p>

          <button
            onClick={() => goToStep(STEPS.FINAL)}
            className="px-6 py-3 bg-[#E57373] text-white rounded-full shadow-lg hover:scale-105 transition-all"
          >
            Açıyorum
          </button>
        </div>
      )}

    </div>

    {/* Progress */}
    <div className="flex justify-center gap-3">
      {[0, 1, 2].map((step) => (
        <div
          key={step}
          className={`h-2 rounded-full transition-all duration-300 ${
            treasureStep >= step ? "w-6 bg-[#E57373]" : "w-2 bg-[#E57373]/30"
          }`}
        />
      ))}
    </div>

  </div>
)}

        {/* Step 6: Final & Celebration */}
        {currentStep === STEPS.FINAL && (
          <div className="text-center space-y-8">
            <div className="glass-panel glow-border rounded-3xl p-10">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-[#5D4037]">
                  Seni çok seviyorum .
                </h1>
                <h3 className="text-3xl md:text-4xl font-serif text-[#FF8A65]">
                  İyi ki yapmışlar seni bebişim!
                </h3>
              </div>

              <div className="text-6xl md:text-8xl animate-pulse my-8">
                &#10084;&#65039;
              </div>

              <p className="text-lg font-serif px- text-[#5D4037]">
                Senin için yaptığım bu siteyi bitirdiysen, şimdi sıra sende…
                Sana gönderdiğim şeyi kur.
                Bunu yaparken her parçada beni hatırla istedim…
                Keşke yanında olup birlikte kurabilseydik.
                Aramızda hep mesafe var ama kalbim de aklım da hep seninle.
                Sensiz olmuyor.
                İyi ki doğdun sevgilim, iyi ki hayatımdasın her şeyim
              </p>

              <button
                onClick={() => {
                  setCurrentStep(STEPS.AUTH)
                  setPassword("")
                  setTypewriterText("")
                  setShowContinueButton(false)
                  setEnvelopeOpen(false)
                  setTreasureStep(0)
                }}
                className="mt-8 px-6 py-2 rounded-full text-sm transition-all hover:scale-105 bg-transparent text-[#FF8A65] border border-[#FF8A65] hover:bg-[#FF8A65]/10"
              >
                Başa Dön
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Easter Egg Heart */}
      <button
        onClick={handleEasterEgg}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-50 hover:opacity-100 transition-opacity"
      >
        <Heart size={24} fill="#FFAB91" color="#FFAB91" />
      </button>

      {/* Easter Egg Modal */}
      {easterEggTriggered && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/30 backdrop-blur-sm"
          onClick={() => setEasterEggTriggered(false)}
        >
          <div 
            className="glass-panel glow-border p-8 rounded-3xl max-w-sm text-center animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-4">&#128150;</div>
            <p className="font-serif text-xl text-[#5D4037]">
              bebisim benim seni çok ama çok seviyorum allahım cok tatlı bi cocuk ya iyi ki annesi babası yapmıslar bitanemi evebeynlerine kucak dolusu sevgiilerrr
            </p>
            <button
              onClick={() => setEasterEggTriggered(false)}
              className="salmon-button mt-6"
            >
              &#9829;
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(-20px); }
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          25% { opacity: 0.8; transform: scale(0.95) rotate(-2deg); }
          50% { opacity: 1; transform: scale(1.05) rotate(2deg); }
          75% { opacity: 0.9; transform: scale(0.98) rotate(-1deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        
        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -15px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-flicker {
          animation: flicker 0.3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.4s ease-out forwards;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-slow-reverse {
          animation: float-slow-reverse 10s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
