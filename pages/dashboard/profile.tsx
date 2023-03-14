import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import CoverImage from '../../components/ProfileComponents/CoverImage'
import ProfileForm from '../../components/ProfileComponents/ProfileForm'
import Security from '../../components/ProfileComponents/Security'

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile Setting</title>
      </Head>
      <section className='w-full custom-container flex gap-x-24 rounded-xl overflow-auto hide-scrollbar'>
        <div className='w-full flex flex-col gap-y-12'>
            <div>
                <h1>Account Settings</h1>
                <p>Manage your profile.</p>
            </div>
            <CoverImage />
            <ProfileForm />
            <Security />
        </div>
      </section>
    </>
  )
}

export default Profile