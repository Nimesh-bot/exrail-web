declare namespace Wish {
    interface IWish {
        _id?: string;
        productName: string;
        price: number;
        image: string;
        user: string;
    }

    interface IGetWishResponse {
        message: string;
        wish: IWish[];
    }

    interface IDeleteWishResponse {
        message: string;
    }
}