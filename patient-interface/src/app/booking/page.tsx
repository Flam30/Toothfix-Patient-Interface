import React from 'react'

const page = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Monday
            </th>
            <th scope="col" className="px-6 py-3">
              Tuesday
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Wednesday
            </th>
            <th scope="col" className="px-6 py-3">
              Thursday
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Friday
            </th>
            <th scope="col" className="px-6 py-3">
              Saturday
            </th>
          </tr>
        </thead>
        <tbody>
        
        </tbody>
      </table>
    </div>
  )
}

export default page