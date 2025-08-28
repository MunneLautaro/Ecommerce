export function validatePassword(password) {
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu

  if (/\s/.test(password)) {
    return { error: "The password cannot contain spaces", status: 400 }
  }

  if (emojiRegex.test(password)) {
    return { error: "The password cannot contain emojis", status: 400 }
  }

  return null
}
