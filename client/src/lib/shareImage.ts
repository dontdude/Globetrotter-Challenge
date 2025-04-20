export function generateShareImage(username: string, score: number, totalQuestions: number): string {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
    const baseImageId = process.env.NEXT_PUBLIC_BASE_IMAGE_ID;

    if (!cloudName || !baseImageId) {
        throw new Error('Cloudinary configuration missing in environment variables');
    }

    const pad = (text: string, spaces: number) => `${'\u00A0'.repeat(spaces)}${text}`;

    const messageLines = [
        pad('Globetrotter Challenge', 10),
        '',
        pad(`${username} scored ${score} out of ${totalQuestions}`, 4),
        '',
        pad('Can you beat this?', 14)
    ];

    const message = messageLines.join('\n');
    const encodedMessage = encodeURIComponent(message);

    const overlayParams = [
        'e_blur:500',
        'l_text:verdana_100_bold:' + encodedMessage,
        'co_rgb:000000',
        'g_center',
    ].join('/');

    return `https://res.cloudinary.com/${cloudName}/image/upload/${overlayParams}/${baseImageId}.png`;
}
