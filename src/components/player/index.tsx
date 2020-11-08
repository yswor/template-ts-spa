import React, { useCallback, useEffect, useRef, useState } from 'react'
import audios from '@config/audios'
import { wait } from '../../help/util'
import {
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  VolumeDown,
  VolumeMute,
  VolumeUp,
} from '@material-ui/icons'

const styles = require('./index.scss')

enum SongControllerAction {
  PLAY = 'play',
  PAUSE = 'pause',
  BACK = 'back',
  NEXT = 'next',
}

/**
 * 更新当前播放时间
 */
function useCurrentTime(ref: HTMLAudioElement | null) {
  const [curTime, setCurTime] = useState(0)

  const updateTime = useCallback(() => {
    if (!ref) return
    setCurTime(ref.currentTime)
  }, [ref, setCurTime])

  useEffect(() => {
    if (!ref) return
    ref.addEventListener('timeupdate', updateTime)

    return () => {
      ref.removeEventListener('timeupdate', updateTime)
    }
  }, [ref, updateTime])

  return curTime
}

/**
 * 更新歌曲总时长
 */
function useTotalTime(ref: HTMLAudioElement | null) {
  const [totalTime, setTotalTime] = useState(0)

  useEffect(() => {
    if (!ref) return

    const updateTotalTime = (e: any) => {
      const total = e.currentTarget.duration
      setTotalTime(total)
    }

    ref.addEventListener('durationchange', updateTotalTime)

    return () => {
      ref.removeEventListener('durationchange', updateTotalTime)
    }
  }, [ref])

  return totalTime
}

/**
 * 歌曲时长信息
 */
function useTimeUpdate(ref: React.MutableRefObject<HTMLAudioElement | null>) {
  const [currentTime, setCurrentTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const cur = useCurrentTime(ref.current)
  const total = useTotalTime(ref.current)

  useEffect(() => {
    const audioRef = ref.current
    if (!audioRef) return
    const init = () => {
      setCurrentTime(audioRef.currentTime)
      setTotalTime(audioRef.duration)
    }

    audioRef.addEventListener('loadstart', init)

    return () => {
      audioRef.removeEventListener('loadstart', init)
    }
  }, [ref])

  return [cur || currentTime, total || totalTime]
}

const Player: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [isPlaying, setPlayStatus] = useState(false)
  const audioEleRef = useRef<HTMLAudioElement | null>(null)

  /**
   * 点击控制器
   */
  const clickSongController = useCallback(async (action: SongControllerAction) => {
    const audioRef = audioEleRef.current
    if (!audioRef) {
      return alert('song is not ready!')
    }

    switch (action) {
      case SongControllerAction.PAUSE:
        setPlayStatus(s => !s)
        audioRef.pause()
        break
      case SongControllerAction.BACK:
        setIndex(i => (i - 1 < 0 ? audios.length - 1 : i - 1))
        break
      case SongControllerAction.NEXT:
        setIndex(i => (i + 1 >= audios.length ? 0 : i + 1))
        break
      default:
        setPlayStatus(s => !s)
        audioRef.play()
        break
    }
  }, [])

  /**
   * 歌曲资源改变后开始播放
   */
  useEffect(() => {
    if (!isPlaying) return
    const audioRef = audioEleRef.current
    if (!audioRef) {
      return alert('song is not ready!')
    }
    audioRef.play()
  }, [index, isPlaying])

  /**
   * 监听歌曲播放结束
   */
  useEffect(() => {
    const audioRef = audioEleRef.current
    if (!audioRef) return

    const onSongEnd = () => {
      audioRef.pause()
      setIndex(i => (i + 1 >= audios.length ? 0 : i + 1))
    }

    audioRef.addEventListener('ended', onSongEnd)

    return () => {
      audioRef.removeEventListener('timeupdate', onSongEnd)
    }
  }, [])

  const [currentTime, totalTime] = useTimeUpdate(audioEleRef)

  return (
    <div className={styles.player}>
      <audio src={audios[index].src} ref={audioEleRef} />
      <h2 className={styles.title}>{audios[index].name}</h2>
      <Progress current={currentTime} total={totalTime} />
      <div className={styles.controller}>
        <SongController clickAction={clickSongController} playing={isPlaying} />
        <VolumeController audioEleRef={audioEleRef} />
      </div>
    </div>
  )
}

interface ProgressProps {
  current: number
  total: number
  onProgressChange?: (current: number) => void
}

const Progress: React.FC<ProgressProps> = ({ current, total, onProgressChange }) => {
  const calcWidth = useCallback(() => {
    return (current / total) * 100 + '%'
  }, [current, total])

  return (
    <div className={styles.progressBox}>
      <div className={styles.progressNumber}>
        <p>{formatTime(current * 1000)}</p>
        <p>{formatTime(total * 1000)}</p>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressContent} style={{ width: calcWidth() }}></div>
      </div>
    </div>
  )
}

interface SongControllerProps {
  clickAction: (action: SongControllerAction) => void
  playing: boolean
}

const SongController: React.FC<SongControllerProps> = ({ clickAction, playing }) => {
  const click = useCallback(
    e => {
      const type = e.currentTarget.getAttribute('data-type')
      clickAction(type)
    },
    [clickAction]
  )

  return (
    <div className={styles.sc}>
      <div onClick={click} data-type={SongControllerAction.BACK} className={styles.back}>
        <SkipPrevious fontSize="inherit" />
      </div>

      {playing ? (
        <div onClick={click} data-type={SongControllerAction.PAUSE} className={styles.pause}>
          <Pause fontSize="inherit" />
        </div>
      ) : (
        <div onClick={click} data-type={SongControllerAction.PLAY} className={styles.play}>
          <PlayArrow fontSize="inherit" />
        </div>
      )}
      <div onClick={click} data-type={SongControllerAction.NEXT} className={styles.next}>
        <SkipNext fontSize="inherit" />
      </div>
    </div>
  )
}

interface VolumeControllerProps {
  audioEleRef: React.MutableRefObject<HTMLAudioElement | null>
}

const VolumeController: React.FC<VolumeControllerProps> = ({ audioEleRef }) => {
  const [showController, setControllerStatus] = useState(false)
  const [volume, setVolume] = useState(0)

  /**
   * 设置音量初始值
   */
  useEffect(() => {
    const audioRef = audioEleRef.current
    if (!audioRef) return

    const value = audioRef.volume
    setVolume(value)
  }, [audioEleRef])

  /**
   * 手动更改音量
   */

  const toggleVolController = useCallback(() => setControllerStatus(s => !s), [])

  return (
    <div className={styles.soundBox}>
      <div className={styles.soundProgress} hidden={!showController}>
        <div className={styles.point} />
        <div className={styles.content} />
      </div>
      <div onClick={toggleVolController} className={styles.sound}>
        <VolumeDown fontSize="inherit" />
        <VolumeMute fontSize="inherit" />
        <VolumeUp fontSize="inherit" />
      </div>
    </div>
  )
}

/**
 * 格式化时间
 * m:s
 */
function formatTime(t: number) {
  if (Number.isNaN(t)) {
    return 'xx:xx'
  }
  const time = Math.floor(t / 1000)
  const m = Math.floor(time / 60).toString()
  const s = (time % 60).toString()

  const minutes = m.length < 2 ? '0' + m : m
  const seconds = s.length < 2 ? '0' + s : s

  return `${minutes}:${seconds}`
}

export default Player
