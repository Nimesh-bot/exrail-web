export const currencyFormatter = (value: number | undefined) => {
    let temp = value?.toFixed(Math.max(0, 2)).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return temp?.split('.')[0];
}