import React, { FunctionComponent, useEffect, useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

const ScrollToTop: FunctionComponent = function () {
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      btnRef.current?.classList.toggle('on', window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <aside aria-label="Scroll to Top">
      <button
        ref={btnRef}
        type="button"
        id="btn-scroll-top"
        className="btn-scroll-top"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faArrowUp} className="ico" />
      </button>
    </aside>
  )
}

export default ScrollToTop
