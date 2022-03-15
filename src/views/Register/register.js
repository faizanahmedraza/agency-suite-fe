import React from 'react'
import Controllers from 'src/Controllers';

const Register = () => {

  return (
    <div>
      <div className='container mx-auto mb-10 pt-4 px-6'>
        <div className='text-center mt-20'>
          <h2 className='font-extrabold text-4xl'>Start your free trial</h2>
          <p className='pt-2 font-semibold text-gray-500'>14-day free trial. No credit card needed.</p>
        </div>

        <Controllers.Input
          label="Name"
        />
        <Controllers.Input
          label="Choose a name for your portal *"
          smallLabel="You can change this later"
        />
        <Controllers.Input
          label="Email *"
        />

        <Controllers.Select
          label="What stage is your business at? *"
          options={[
            { id: 1, name: 'I am just starting my business' },
            { id: 2, name: 'I am a freelancer / consultant' },
            { id: 3, name: 'Dummy Text' },
            { id: 4, name: 'Dummy Text' },
          ]} //Must be an array
        />

        <Controllers.TextArea
          label="What services are you selling? *"
        />
        <Controllers.TextArea
          label="What solution are you currently using to manage your requests? What is the biggest pain point you want to solve?"
        />
        <Controllers.Select
          label="How did you hear about us? *"
          options={[
            { id: 1, name: 'I am just starting my business' },
            { id: 2, name: 'I am a freelancer / consultant' },
            { id: 3, name: 'Dummy Text' },
            { id: 4, name: 'Dummy Text' },
          ]}
        />

        <div className='flex justify-center'>
          <Controllers.Toggler />
          By selecting this, you agree to the Privacy Policy and Cookie Policy .
        </div>

        <Controllers.Button
          label="Start a free trail"
        />

      </div>
    </div >
  )
}

export default Register