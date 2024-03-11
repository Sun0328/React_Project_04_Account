export const transformDate = (date) => {
    let formattedDate = new Date(date * 1000);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const formattedDateString = `${year}-${month}-${day}`;
    return formattedDateString;
}
