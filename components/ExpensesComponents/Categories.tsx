import { Car, DollarSquare, Reserve, StopCircle } from 'iconsax-react'
import React, { Dispatch, SetStateAction } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'

interface ICardProps {
    icon: JSX.Element 
    selected?: boolean
    handleClick?: () => void
}

interface ICategories {
    index: number
    setIndex: Dispatch<SetStateAction<number>>
}

const Categories = ({ index, setIndex }: ICategories) => {
  return (
    <ScrollContainer className='flex gap-x-8 items-center'>
        <CategoriesCard 
            icon={<Reserve size="24" color={index === 0 ? "#f7f7f7" : "#3B82F6"} variant="Bulk"/>}
            selected = {index === 0}
            handleClick={() => setIndex(0)}
        />
        <CategoriesCard 
            icon={<Car size="24" color={index === 1 ? "#f7f7f7" : "#3B82F6"} variant="Bulk"/>}
            selected = {index === 1}
            handleClick={() => setIndex(1)}
        />
        <CategoriesCard 
            icon={<DollarSquare size="24" color={index === 2 ? "#f7f7f7" : "#3B82F6"} variant="Bulk"/>}
            selected = {index === 2}
            handleClick={() => setIndex(2)}
        />
        <CategoriesCard 
            icon={<StopCircle size="24" color={index === 3 ? "#f7f7f7" : "#3B82F6"} variant="Bulk"/>}
            selected = {index === 3}
            handleClick={() => setIndex(3)}
        />
    </ScrollContainer>
  )
}

const CategoriesCard = ({ icon, selected, handleClick }: ICardProps) => {
    return (
        <div className={`rounded-lg p-4 ${selected ? 'bg-primary' : 'bg-inputBgLight dark:bg-inputBgDark'}`} onClick={handleClick}>
            {icon}
        </div>
    )
}

export default Categories