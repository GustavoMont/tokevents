const randomBetween = (min, max) => Math.floor(Math.random() * ((max) - min + 1)) + min

export const randomBg = (colors ,min, max) => colors[randomBetween(min, max)]