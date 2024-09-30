import { useState } from "react";
import Navbar from "../Components/Navbar";

export default function Filter(){
    const [loading, setLoading] = useState(false);
    const [csvData, setCsvData] = useState(null);
    const [file, setFile] = useState(null);
    const [fileSelected, setFileSelected] = useState(false);

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
    
        setLoading(true);
        try {
          const response = await fetch('https://filter-be.vercel.app/user/upload', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            setCsvData(url);  // Set URL for downloading filtered CSV
          } else {
            console.error('Failed to upload file');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        } finally {
          setLoading(false);
        }
      };
    
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileSelected(true); // Set fileSelected to true
        setCsvData(null); // Reset CSV data when a new file is selected
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
          await handleUpload(file); // Pass the file to handleUpload
        }
      };
    
      const handleRefresh = () => {
        window.location.reload(); // Refresh the page
      };
    return(
        <>
        <div className="App w-full h-[100vh] flex flex-col justify-center items-center gap-5 bg-blue-800">
        <Navbar/>

        <div className='bg-blue-500 flex flex-col justify-center items-center w-3/4 md:w-1/2 border-4 border-slate-400 pt-10 pb-10 rounded-lg shadow-xl'>
            <div className='flex flex-col text-center items-center gap-4 mb-8 '>
            <img src="/logo.png" alt="logo digital of thinking" className='w-1/4 md:w-1/3' />
            <h1 className='text-2xl md:text-4xl font-black text-white italic'>CSV GENERATOR</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="bg-blue-800 hover:bg-blue-900 text-sm md:text-base transition-all duration-700 text-white flex justify-center items-center gap-3 py-2 px-4 rounded-lg shadow-lg ">
                <input type="file" accept=".csv" className='hidden' onChange={handleFileChange} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                Choose Your CSV File 
                </label>
            </div>

            {fileSelected && (
                <button
                type="submit"
                className={`bg-blue-800 hover:bg-blue-900 transition-all duration-700 text-white flex justify-center items-center gap-3 py-2 px-4 rounded-lg shadow-lg ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={loading}
                >
                {loading ? "Processing..." : (
                    <div className='flex justify-center items-center gap-2 text-sm md:text-base'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                    Upload File
                    </div>
                )}
                </button>
            )}
            </form>

            {loading && <p className="text-white">Loading...</p>}

            {csvData && (
            <>
            <div className='flex flex-col md:flex-row md:gap-4'>
                <a href={csvData} download="filtered_data.csv">
                <button className="bg-green-500 hover:bg-green-700 duration-500 text-white py-2 px-4 rounded mt-4">Download Filtered CSV</button>
                </a>
                <button onClick={handleRefresh} className="bg-red-500 hover:bg-red-700 duration-500 text-white py-2 px-4 rounded mt-4">Rewrite CSV File</button>
            </div>
            </>
            )}
        </div>
    </div>
        </>
    )
}