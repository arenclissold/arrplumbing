import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import emailjs from '@emailjs/browser'
import Turnstile from './Turnstile'

interface Values {
  name: string
  email: string
  phone: string
  town: string
  problem: string
}

const FormComponent = () => {
  const [turnstile, setTurnstile] = useState('')

  const handleSubmit = (values: Values) => {
    // fetch('/turnstile', {
    //   method: 'POST',
    //   body: JSON.stringify(turnstile)
    // }).then((res) => {
    //   const result = res.json()
    //   console.log(result)
    // })

    emailjs
      .send('service_irdgb5n', 'template_kpr5u5v', values, 'LZiH3VzIaIxXMV0yW')
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-10 md:px-6 lg:px-12 xl:px-[156px]">
      <h2 className="text-center text-3xl mb-4">REQUEST A FREE QUOTE</h2>
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
          email: Yup.string()
            .email('Please enter a valid email address')
            .required('Please include a contact email'),
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
          <Turnstile callback={(token) => setTurnstile(token)} />
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
              className="mb-5 h-32 w-full border p-1"
              name="problem"
              placeholder="Describe your problem*"
            />
            <ErrorMessage
              name="problem"
              component="div"
              className="absolute bottom-1 text-sm text-red-600"
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
    </section>
  )
}

export default FormComponent
