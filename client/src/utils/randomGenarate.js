const randomBetween = (min, max) => Math.floor(Math.random() * ((max) - min + 1)) + min // gera um número aleatório entre
// Sorteia cores aleatórias para os elementos post it
export const randomBg = (colors ,min, max) => colors[randomBetween(min, max)]