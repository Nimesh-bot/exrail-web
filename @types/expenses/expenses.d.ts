declare namespace Expenses {
    interface IExpenses {
        _id?: string;
        food?: number;
        transport?: number;
        expected?: number;
        uncertain?: number;
        total?: number;
        estimated_food?: number;
        estimated_transport?: number;
        estimated_expected?: number;
        year?: number;
        month?: number;
        user?: string;
    }
    interface IGetExpensesResponse {
        [x: string]: string | number | undefined;
        message: string;
        expense: IExpenses[];
    }
    
    interface IGetAllExpensesResponse {
        [x: string]: string | number | undefined;
        message: string;
        expenses: IExpenses[];
    }
}
