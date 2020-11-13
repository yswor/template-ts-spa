import React, { useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  onMove: (distance: { x: number; y: number }) => void
  style: any
}

const ViewDragable: React.FC<Props> = ({ style, onMove }) => {
  const [moving, setMoving] = useState(false)
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  const [moveDistance, setMoveDistance] = useState({ x: 0, y: 0 })
  const bodyRef = useRef(document.body).current

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setMoving(true)
    setPrevPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const onMouseUp = useCallback((e: MouseEvent) => {
    setMoving(false)
  }, [])

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!moving) return
      const distance = {
        x: e.clientX - prevPosition.x,
        y: e.clientY - prevPosition.y,
      }

      setMoveDistance(distance)
      setPrevPosition({ x: e.clientX, y: e.clientY })
    },
    [moving, prevPosition.x, prevPosition.y]
  )

  useEffect(() => {
    if (!bodyRef) return

    bodyRef.addEventListener('mousemove', onMouseMove)
    bodyRef.addEventListener('mouseup', onMouseUp)

    return () => {
      bodyRef.removeEventListener('mousemove', onMouseMove)
      bodyRef.removeEventListener('mouseup', onMouseUp)
    }
  }, [bodyRef, onMouseMove, onMouseUp])

  useEffect(() => {
    onMove(moveDistance)
  }, [moveDistance, onMove])

  return <div onMouseDown={onMouseDown} className={style}></div>
}

export default ViewDragable
