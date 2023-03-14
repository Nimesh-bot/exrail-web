export interface InputProps {
    label?: string
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    show?: boolean
    setShow?: () => void
    additionalClass?: string
    type?: string
    icon? : JSX.Element
    disabled?: boolean
    additionalLabelClass?: string
    error?: string | boolean

    array?: any[] //select and selectInput
    open? : boolean //select and selectInput
    updateValue? : () => void //select and selectInput
    closeOptions? : () => void //select and selectInput
    showOptions? : () => void //select and selectInput
}