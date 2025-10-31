import { FocusCardsDemo } from '@/components/Features'
import React from 'react'

function Featurepage() {
    return (
        <div className='pt-18 pb-20 bg-gradient-to-b from-[#ECFFF9] via-white to-[#E9F6FF]'>
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Features</h2>
            <p className="text-gray-600">Lorem ipsum dolor Lorem ipsum dolor Lorem</p>
          </div>
            <FocusCardsDemo />
        </div>
    )
}

export default Featurepage