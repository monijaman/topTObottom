import type { NextPage } from 'next'
import GenericForm from '../components/genericForm'


type Props = {
    // Where to GET/POST the form data
    url: string
    
    // Function that returns a component that will display the inner form
    renderForm: (formProps: FormProps) => React.ReactNode
}

// All values that come from useForm, to be used in our custom forms
export type FormProps = {
    register: UseFormRegister<FieldValues>
    isSubmitting: boolean
    errors: { [error: string]: any }
}


const Signup: NextPage = () => {
    const fields = [
        {type: "email", name: "email", required: true, label: "Email", autoComplete: "email"},
        {type: "text", name: "name", required: true, label: "Name"},
        {type: "password", name: "password", required: true, label: "Password"},
    ]

    const renderForm = ({register, errors, isSubmitting}: FormProps) => {
        return <>
            {fields.map(field => {
                return <>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input type={field.type} autoComplete={field.autoComplete}
                           {...register(field.name, {required: field.required})} />
                    <div className="error">{errors[field.name]?.message}</div>
                </>
            })}

            <button disabled={isSubmitting}>
                {isSubmitting ? "Loading" : "Submit"}
            </button>
        </>;
    }
    return <GenericForm url="/api/form" renderForm={renderForm} />
}

export default Signup