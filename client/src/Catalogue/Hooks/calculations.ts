const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color?.slice(1), 16),
        amt = Math.round(2.55 * percent * 100),
        r = (num >> 16) + amt,
        g = ((num >> 8) & 0x00ff) + amt,
        b = (num & 0x0000ff) + amt;

    return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
};

export {
    lightenColor
}