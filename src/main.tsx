import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="min-h-screen bg-[#f3f1ef] flex items-center justify-center p-6">
    <div className="text-center max-w-md">
      <img src="/logo.png" alt="SageDash Logo" className="w-72 h-auto mx-auto mb-6 animate-pulse" />
      <h1 className="text-2xl md:text-3xl font-bold text-[#3e3e3c] mb-4 leading-tight">Expert Parenting Coach for Teen Communication</h1>
      <p className="text-lg text-[#3e3e3c] mb-8">Bond Closer. Rise Together.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/onboarding" className="px-8 py-3 bg-[#9ca58a] text-white rounded-full font-medium hover:bg-[#433931] transition shadow-lg">Start Onboarding</a>
        <button className="px-8 py-3 border-2 border-[#d1fae5] text-[#945e5b] rounded-full font-medium hover:border-[#9ca58a] transition">Sign In</button>
      </div>
    </div>
  </div>
)

const Onboarding = () => (
  <div className="min-h-screen bg-[#f3f1ef] p-6">
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-[#3e3e3c] text-center mb-6">Onboarding</h1>
      <p className="text-center text-[#3e3e3c] mb-4">Let's get to know you and your teen!</p>
      <div className="progress-bar mb-4">
        <div className="progress-fill" style={{width: '8%'}}></div>
      </div>
      <p className="text-center text-sm text-[#3e3e3c]">1/12</p>
      <div className="question mb-8">
        <h2 className="text-xl font-semibold text-[#3e3e3c] mb-2">About You</h2>
        <p className="text-sm text-[#6b5a3a] mb-4">Tell me how you naturally talk and parent. Quick and easy.</p>
        <p className="text-lg font-medium mb-4">Are you Mom, Dad, or other?</p>
        <div className="options flex flex-wrap justify-center gap-2 mb-6">
          <div className="option px-4 py-2 border border-[#d1fae5] rounded-full cursor-pointer">Mom</div>
          <div className="option px-4 py-2 border border-[#d1fae5] rounded-full cursor-pointer">Dad</div>
          <div className="option px-4 py-2 border border-[#d1fae5] rounded-full cursor-pointer">Other</div>
        </div>
      </div>
      <div className="buttons flex gap-4 justify-center">
        <button className="secondary px-6 py-2 border-2 border-[#d1fae5] text-[#945e5b] rounded-full">Back</button>
        <button className="primary px-6 py-2 bg-[#9ca58a] text-white rounded-full">Next</button>
      </div>
    </div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
