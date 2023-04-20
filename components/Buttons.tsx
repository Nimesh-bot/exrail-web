import React, { FC } from 'react'
import styled from 'styled-components'

interface BtnProps {
  text: string
  onClick?: any
  additionalclassName?: string
  icon?: JSX.Element 
  type?: 'button' | 'submit' | 'reset'
}

const ShineWrapper = styled.div`
  position: absolute;
  top: -0.5rem;
  left: -46%;
  transform: translateX(-50%);

  width: 100%;
  height: 124%;
  display: flex;
  gap: 0.5rem;
  z-index: 1;
  transition: 0.8s;
`
const Shine = styled.span`
  width: 10px;
  height: 100%;
  transform: rotate(22deg);

  background-color: #fff;
  opacity: 0.15;
`
const BtnText = styled.h3`
  position: relative;
  z-index: 10;
  color: #F4F7ED;
  font-size: 16px;
  font-weight: 500;
`
const Btn = styled.button`
  border: none;
  width: fit-content;
  font-size: 18px;
  font-weight: 400;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  position: relative;
  overflow: hidden;

  &:hover ${ShineWrapper} {
    left: 50%;
    transform: translateX(-20%);
  }
`
const Loader = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #FFF;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
  }
`

const PrimaryButton: FC<BtnProps> = ({ text, onClick, additionalclassName, type }) => {
  return (
    <Btn onClick={onClick} type={type} className={`bg-primary ${additionalclassName}`}>
        <BtnText>
            {text}
        </BtnText>
        <ShineWrapper>
            <Shine />
            <Shine />
            <Shine />
        </ShineWrapper>
    </Btn>
  )
}

const PromiseButton: FC<BtnProps> = ({ text, onClick, additionalclassName, type }) => {
  return (
    <Btn onClick={onClick} type={type} className={`bg-primary ${additionalclassName}`}>
        <div className='flex gap-x-4 items-center'>
          <Loader />
          {
            text !== "" || text !== undefined &&
            <p>{text}</p>
          }
        </div>
    </Btn>
  )
}

const FlatButton: FC<BtnProps> = ({ text, onClick, additionalclassName, type }) => {
    return (
        <button className={`w-fit bg-transparent text-primary text-[14px] lg:text-sm font-medium ${additionalclassName}`} onClick={onClick} type={type}>
            {text}
        </button>
    )
}

const FlatIconButton: FC<BtnProps> = ({ icon, onClick, additionalclassName, type }) => {
  return (
    <button className={`w-fit bg-transparent text-primary text-[14px] lg:text-sm font-medium ${additionalclassName}`} onClick={onClick} type={type}>
      {icon}
    </button>
  )
}

export { PrimaryButton, FlatButton, FlatIconButton, PromiseButton }