import { ImageResponse } from 'next/og'

// OG Image Generator for eduVisual
// Generate at: /api/og or use as a static image

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(to bottom right, #7209b7, #f77f00, #06d6a0)',
          color: 'white',
          padding: '120px',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            marginBottom: 40,
          }}
        >
          eduVisual
        </div>
        <div
          style={{
            fontSize: 48,
            opacity: 0.9,
          }}
        >
          交互式可视化教育平台
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
