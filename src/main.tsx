import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-6xl mb-4">🌿</div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
        Bond Closer. Rise Together.
      </h1>
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg">Install App</button>
        <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg">Sign In</button>
      </div>
    </div>
  </React.StrictMode>
)
