import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Tradetrove';
export const size = {
    width: 720,
    height: 720,
};

export const contentType = 'image/png';

export default async function Image() {
    const interSemiBold = fetch(
        new URL('./SpaceMono-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    fontSize: 128,
                    letterSpacing: '-0.05em',
                    display: 'flex',
                    width: '100%',
                    fontWeight: 700,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    color: '#4F80E1',
                }}
            >
                Tradetrove
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Inter',
                    data: await interSemiBold,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    );
}
