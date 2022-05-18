export const ellipsize = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    const partLength = Math.floor(maxLength / 2);
    return `${text.substring(0, partLength)}...${text.substring(text.length - partLength)}`;
}

export const round = (num, places) => (Math.floor(num * 10 ** places) / 10 ** places);