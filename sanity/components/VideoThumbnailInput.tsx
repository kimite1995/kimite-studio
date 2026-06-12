import { useEffect, useRef, useState } from 'react'
import { set, unset, useClient, useFormValue } from 'sanity'

type VideoAssetField = {
  asset?: {
    _ref?: string
  }
}

type SanityAsset = {
  _id: string
  url?: string
}

const apiVersion = '2024-06-01'

function canCaptureVideoUrl(url: string) {
  const lower = url.toLowerCase()
  return lower.endsWith('.mp4') || lower.includes('cdn.sanity.io') || lower.includes('commondatastorage')
}

function makeFilename(title?: unknown) {
  const safeTitle = typeof title === 'string' && title.trim() ? title.trim() : 'kimite-thumbnail'
  return `${safeTitle.replace(/[\\/:*?"<>|]/g, '-').slice(0, 70)}-thumbnail.jpg`
}

export function VideoThumbnailInput(props: any) {
  const client = useClient({ apiVersion })
  const parentPath = Array.isArray(props.path) ? props.path.slice(0, -1) : []
  const videoField = useFormValue([...parentPath, 'video']) as VideoAssetField | undefined
  const videoUrlField = useFormValue([...parentPath, 'videoUrl']) as string | undefined
  const localTitle = useFormValue([...parentPath, 'title'])
  const workTitle = useFormValue(['title'])
  const title = localTitle || workTitle
  const isNestedVideo = parentPath.length > 0
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [status, setStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadVideoUrl() {
      setStatus('')
      setVideoUrl('')

      const assetRef = videoField?.asset?._ref
      if (assetRef) {
        try {
          const asset = await client.fetch<SanityAsset | null>(
            '*[_id == $id][0]{_id, url}',
            { id: assetRef }
          )

          if (!cancelled && asset?.url) {
            setVideoUrl(asset.url)
          }
        } catch {
          if (!cancelled) {
            setStatus('대표 영상 파일을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.')
          }
        }
        return
      }

      if (videoUrlField && canCaptureVideoUrl(videoUrlField)) {
        setVideoUrl(videoUrlField)
        return
      }

      if (videoUrlField) {
        setStatus('YouTube/Vimeo 같은 외부 링크는 브라우저 보안 때문에 장면 캡처가 제한됩니다. MP4 파일 업로드 영상에서 사용해주세요.')
      }
    }

    loadVideoUrl()

    return () => {
      cancelled = true
    }
  }, [client, videoField?.asset?._ref, videoUrlField])

  async function saveCurrentFrame() {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas || !videoUrl) {
      setStatus('먼저 대표 영상 파일을 업로드해주세요.')
      return
    }

    if (!video.videoWidth || !video.videoHeight) {
      setStatus('영상이 아직 준비되지 않았습니다. 영상을 한 번 재생한 뒤 다시 눌러주세요.')
      return
    }

    setIsSaving(true)
    setStatus('현재 장면을 썸네일로 저장하는 중입니다...')

    try {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      if (!context) throw new Error('canvas context unavailable')

      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => {
          if (result) resolve(result)
          else reject(new Error('thumbnail blob unavailable'))
        }, 'image/jpeg', 0.9)
      })

      const asset = await client.assets.upload('image', blob, {
        filename: makeFilename(title),
      })

      props.onChange(
        asset?._id
          ? set({
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id,
              },
            })
          : unset()
      )

      setStatus('저장 완료. 이 장면이 메인페이지 썸네일로 사용됩니다.')
    } catch {
      setStatus('이 영상에서는 장면을 캡처하지 못했습니다. Sanity에 직접 업로드한 MP4 파일인지 확인해주세요.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      {props.renderDefault(props)}

      <div
        style={{
          marginTop: 16,
          padding: 16,
          border: '1px solid var(--card-border-color)',
          borderRadius: 8,
          background: 'var(--card-bg-color)',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
          영상 장면을 썸네일로 저장
        </div>
        <div style={{ color: 'var(--card-muted-fg-color)', fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>
          {isNestedVideo
            ? '이 추가 영상을 재생해서 원하는 장면에서 멈춘 뒤 아래 버튼을 누르세요. 저장된 이미지는 해당 영상 목록 썸네일로 표시됩니다.'
            : '대표 영상을 재생해서 원하는 장면에서 멈춘 뒤 아래 버튼을 누르세요. 저장된 이미지는 메인페이지 카드 썸네일로 표시됩니다.'}
        </div>

        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              crossOrigin="anonymous"
              preload="metadata"
              style={{
                display: 'block',
                width: '100%',
                maxHeight: 360,
                background: '#000',
                borderRadius: 8,
                objectFit: 'contain',
              }}
            />
            <button
              type="button"
              onClick={saveCurrentFrame}
              disabled={isSaving}
              style={{
                marginTop: 12,
                width: '100%',
                border: 0,
                borderRadius: 6,
                padding: '12px 14px',
                cursor: isSaving ? 'wait' : 'pointer',
                background: isSaving ? '#555' : '#111827',
                color: '#fff',
                fontWeight: 700,
              }}
            >
              {isSaving ? '저장 중...' : '현재 장면을 대표 썸네일로 저장'}
            </button>
          </>
        ) : (
          <div style={{ color: 'var(--card-muted-fg-color)', fontSize: 13 }}>
            {isNestedVideo
              ? '이 추가 영상의 파일을 먼저 업로드하면 여기에서 장면을 고를 수 있습니다.'
              : '대표 영상 파일을 먼저 업로드하면 여기에서 장면을 고를 수 있습니다.'}
          </div>
        )}

        {status && (
          <div style={{ marginTop: 10, color: 'var(--card-muted-fg-color)', fontSize: 13, lineHeight: 1.5 }}>
            {status}
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  )
}
