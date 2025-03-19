export const formetDate = (isoDate) =>{
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}