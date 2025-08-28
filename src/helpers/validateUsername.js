export function validateUsername(username) {
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu

  if (/\s/.test(username)) {
    return { error: "The username cannot contain spaces", status: 400 }
  }

  if (emojiRegex.test(username)) {
    return { error: "The username cannot contain emojis", status: 400 }
  }

  if (username.length > 15) {
    return {
      error: "The username should be shorter (max 15 characters)",
      status: 400,
    }
  }

  return null
}
