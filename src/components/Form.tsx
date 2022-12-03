import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

interface Values {
  name: string
  email: string
  phone: string
  town: string
  problem: string
}

const FormComponent = () => {
  const handleSubmit = (values: Values) => {
    console.log(JSON.stringify(values))
    fetch('/form', {
      method: 'POST',
      body: JSON.stringify(values)
    }).then((res) => {
      console.log(res.json())
    })
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        town: '',
        problem: ''
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Please include your name'),
        email: Yup.string().email('Please enter a valid email address').required('Please include a contact email'),
        phone: Yup.string().required('Please include a contact number'),
        town: Yup.string().required('Please include a town'),
        problem: Yup.string().required('Please describe your problem')
      })}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnMount
      enableReinitialize
    >
      <Form className="flex flex-col bg-gray-100 p-5">
        <div className="mb-8 grid grid-cols-2 gap-8">
          {['name', 'email', 'phone', 'town'].map((name) => (
            <div key={name} className="relative">
              <Field
                className="w-full border p-1"
                name={name}
                placeholder={`${name[0].toUpperCase() + name.slice(1)}*`}
              />
              <ErrorMessage
                name={name}
                component="div"
                className="absolute text-sm text-red-600"
              />
            </div>
          ))}
        </div>
        <div className="relative">
          <Field
            as="textarea"
            className="mb-5 h-32 border p-1 w-full"
            name="problem"
            placeholder="Describe your problem*"
          />
          <ErrorMessage
            name="problem"
            component="div"
            className="absolute text-sm text-red-600 bottom-1"
          />
        </div>
        <button
          type="submit"
          className="mx-auto rounded-3xl bg-pink-600 py-2 px-4 text-xl font-semibold text-white transition-all duration-200 hover:bg-pink-500"
        >
          GET A FREE QUOTE
        </button>
      </Form>
    </Formik>
  )
}

export default FormComponent
