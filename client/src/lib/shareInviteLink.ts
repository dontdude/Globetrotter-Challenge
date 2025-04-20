import { generateShareImage } from "@/lib/shareImage";

export const handleInvite = (
    username: string,
    score: number,
    totalQuestions: number
) => {
    const shareUrl = `${window.location.origin}/home?invitedBy=${username}`;
    const message = `🌍 I just scored ${score}/${totalQuestions} in the Globetrotter Challenge! Can you beat me?\n Play now: ${shareUrl}`;

    try {
        const imageUrl = generateShareImage(username, score, totalQuestions);
        const fullMessage = `${message}\n\n📸 Check out my scorecard:\n${imageUrl}`;

        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
            fullMessage
        )}`;
        window.open(whatsappUrl, "_blank");
    } catch (error) {
        console.error("Error generating share image:", error);
        // fallback without image
        const fallbackUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
            message
        )}`;
        window.open(fallbackUrl, "_blank");
    }
};