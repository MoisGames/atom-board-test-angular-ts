interface objectSales {
    date: string,
    Vikidokart: number,
    Telefony: number,
    Televizory: number,
    Noutbuki: number,
    Klaviatury: number
}

export interface ElectronicSales {
    sales_data:Array<objectSales>
}