declare namespace Income {
    interface IIncome {
        _id?: string;
        monthlySalary?: number;
        estimatedSaving?: number;
        receiveDate?: number;
        year?: number;
        month?: number;
        user?: string;
    }
    interface IGetIncomeResponse {
        message: string;
        income: IIncome[];
    }
}