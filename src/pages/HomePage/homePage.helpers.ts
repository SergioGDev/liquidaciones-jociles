export const getDate = (dateStr: string) => {
    const split = dateStr.split('/');
    return new Date(Number(split[2]), Number(split[1]) - 1, Number(split[0]));
}