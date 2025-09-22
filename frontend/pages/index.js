import { useState, useRef } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function Home() {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInput = useRef(null)

  const onDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f && f.type === 'application/pdf') setFile(f)
  }
  const onDragOver = (e) => e.preventDefault()

  const submit = async (e) => {
    e && e.preventDefault()
    if (!file) return alert('Select a PDF')
    const form = new FormData()
    form.append('file', file)
    form.append('job_description', jobDesc)
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:8000/analyze', form, { headers: { 'Content-Type': 'multipart/form-data' }})
      setResult(res.data.result)
    } catch (err) {
      alert('Error: ' + err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="card">
              <h1 className="text-2xl font-bold mb-2">Upload your resume</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Get instant ATS-style feedback and suggested improvements.</p>

              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-md p-6 flex flex-col items-center justify-center mb-4 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 transition"
                onClick={() => fileInput.current.click()}
              >
                <input ref={fileInput} type="file" accept="application/pdf" className="hidden" onChange={e => setFile(e.target.files[0])} />
                <div className="text-4xl">📄</div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">Drag & drop a PDF resume here, or click to select</div>
                {file && <div className="mt-3 text-sm font-medium">Selected: {file.name}</div>}
              </div>

              <label className="block text-sm font-medium mb-1">Job description (optional)</label>
              <textarea rows={4} className="w-full rounded-md p-3 border border-slate-200 dark:border-slate-700 bg-transparent mb-4" value={jobDesc} onChange={e => setJobDesc(e.target.value)} />

              <div className="flex items-center space-x-3">
                <button onClick={submit} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition" disabled={loading}>
                  {loading ? 'Analyzing...' : 'Analyze resume'}
                </button>
                <button onClick={() => { setFile(null); setResult(null); setJobDesc('') }} className="px-4 py-2 border rounded-md">Reset</button>
              </div>
            </div>

            {result && (
              <div className="card mt-6">
                <h2 className="text-xl font-semibold">Analysis Summary</h2>
                <div className="mt-4">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">ATS Score</div>
                      <div className="text-sm font-semibold">{result.score}</div>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div style={{ width: `${result.score}%` }} className="h-3 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Resume skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.resume_skills.map((s,i) => <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm">{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Missing skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.missing_skills.length === 0 ? <div className="text-sm text-slate-600 dark:text-slate-300">None! Good match.</div> : result.missing_skills.map((s,i) => <span key={i} className="px-2 py-1 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-full text-sm">{s}</span>)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Advice</h3>
                    <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-200">
                      {result.advice.map((a,i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside>
            <div className="card">
              <h3 className="font-semibold">Tips</h3>
              <ul className="mt-2 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
                <li>Use clear headings (Work Experience, Education, Skills).</li>
                <li>Quantify achievements with numbers.</li>
                <li>Match keywords from the job description.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <footer className="mt-12 py-6 text-center text-sm text-slate-500 dark:text-slate-400">Made with ❤️ — AI Resume Analyzer</footer>
    </div>
  )
}
