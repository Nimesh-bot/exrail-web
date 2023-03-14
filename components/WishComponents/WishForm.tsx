import { Add, Gallery } from 'iconsax-react';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent } from 'react'
import { ErrorToastMessages, SuccessToastMessages } from '../../lib/toasts/ToastMessages';
import { useAddWishMutation } from '../../redux/features/wish/wishApi.slice';
import { PrimaryButton, PromiseButton } from '../Buttons';
import { TextInput } from '../Inputs'

const WishForm = () => {
    const [values, setValues] = React.useState({
        productName: '',
        price: '',
    });
    
    const [image, setImage] = React.useState<File | null>(null);

    const [ addWish, { isLoading } ] = useAddWishMutation();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('productName', values.productName);
        formData.append('price', values.price);
        formData.append('image', image!);

        if(values.productName === '' || values.price === '' || image === null) {
            ErrorToastMessages('Please fill all the fields');
        }
        else {
            addWish(formData).unwrap().then(() => {
                setValues({
                    productName: '',
                    price: '',
                });
                setImage(null);
                SuccessToastMessages('Wish Added Successfully');
            }).catch(err => {
                ErrorToastMessages(err.data.response.message || 'Something went wrong');
            })
        }
    }

  return (
    <form className='w-full lg:w-1/4 flex flex-col gap-6 my-4'>
        <div className='flex flex-col'>
            <label htmlFor='productName'>Product Name</label>
            <TextInput 
                value={values.productName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValues({...values, productName: e.target.value})}
            />
        </div> 
        <div className='flex flex-col'>
            <label htmlFor='price'>Price</label>
            <TextInput 
                value={values.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValues({...values, price: e.target.value})}
            />
        </div> 
        <div className='flex flex-col'>
            <label htmlFor='image'>Image</label>
            {
                image ?
                <div className='w-40 h-40 relative mt-2'>
                    <Image src={URL.createObjectURL(image)} alt='wish' width={200} height={200} className='w-full h-full rounded-xl object-cover' />
                    <div className='bg-red-500 p-2 absolute -top-2 -right-2 rotate-45 rounded-full' onClick={() => setImage(null)}>
                        <Add size="21" color="#eeeeee"/>
                    </div>
                </div>
                :
                <div className='w-full h-48 rounded-xl bg-inputBgLight dark:bg-inputBgDark p-4 mt-2 flex justify-center items-center'>
                    <label htmlFor='image-input' className='flex flex-col items-center'>
                        <Gallery size="24" color="#3B82F6" variant="Bulk"/>
                        <p className='mt-2'>Upload Image</p>
                    </label>
                    <input type='file' id='image-input' className='hidden' onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files![0])} />
                </div>
            }
        </div>
        {
            isLoading ?
            <PromiseButton
                text=''
                additionalclassName='mt-4'
            />
            :
            <PrimaryButton
                text='Add Wish'
                additionalclassName='mt-4'
                onClick={handleSubmit}
            />
        }
    </form>
  )
}

export default WishForm