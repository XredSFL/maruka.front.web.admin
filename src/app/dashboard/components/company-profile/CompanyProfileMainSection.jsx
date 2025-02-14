'use client';
import * as React from "react";

export function CompanyProfileMainSection() {
  const [formData, setFormData] = React.useState({
    companyName: "",
    presidentDirector: "",
    phone: "",
    address: "",
    establishment: "",
    paidCapital: "",
    fiscalYear: "",
    stockListings: "",
    businessBases: "",
    mainBankers: "",
    employees: "",
    linkMap: "",
    video: null
  });

  React.useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      const response = await fetch('/api/company-profile');
      if (response.ok) {
        const data = await response.json();
        setFormData(prevData => ({
          companyName: data.company_name || "",
          presidentDirector: data.president_director || "",
          phone: data.phone || "",
          address: data.address || "",
          establishment: data.establishment ? new Date(data.establishment).toISOString().split('T')[0] : "",
          paidCapital: data.paid_capital ? data.paid_capital.toString() : "",
          fiscalYear: data.fiscal_year || "",
          stockListings: data.stock_listings || "",
          businessBases: data.business_bases || "",
          mainBankers: data.main_bankers || "",
          employees: data.employees ? data.employees.toString() : "",
          linkMap: data.link_map || "",
          video: null // Reset video to null as we don't fetch it from the database
        }));
      } else {
        console.error('Failed to fetch company profile');
      }
    } catch (error) {
      console.error('Error fetching company profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'video/mp4' && file.size <= 5000000000) {
      setFormData(prev => ({
        ...prev,
        video: file
      }));
    } else {
      alert('Please select a valid MP4 file under 5GB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();

      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'video') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append video file if it exists
      if (formData.video instanceof File) {
        formDataToSend.append('video', formData.video);
      }

      const response = await fetch('/api/company-profile', {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header, let the browser set it with the boundary
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Data saved successfully:', result);
      alert('Company profile has been saved successfully!');
      
      // Refresh the data after saving
      fetchCompanyProfile();
    } catch (error) {
      console.error('Error saving company profile:', error);
      alert('Failed to save company profile. Please try again.');
    }
  };
  const formFields = [
    { id: 'companyName', label: 'Company Name (*)', type: 'text' },
    { id: 'presidentDirector', label: 'President Director (*)', type: 'text' },
    { id: 'phone', label: 'No Phone (*)', type: 'tel' },
    { id: 'address', label: 'Address (*)', type: 'textarea' },
    { id: 'establishment', label: 'Establishment (*)', type: 'date' },
    { id: 'paidCapital', label: 'Paid in Capital (*)', type: 'text' },
    { id: 'fiscalYear', label: 'Fiscal Year (*)', type: 'text' },
    { id: 'stockListings', label: 'Stock Listings (*)', type: 'text' },
    { id: 'businessBases', label: 'Business Bases (*)', type: 'text' },
    { id: 'mainBankers', label: 'Main Bankers (*)', type: 'text' },
    { id: 'employees', label: 'Number of Employees (*)', type: 'number' },
    { id: 'linkMap', label: 'Link Map (*)', type: 'url' }
  ];

  const renderFormField = ({ id, label, type }) => {
    const isTextarea = type === 'textarea';
    const InputComponent = isTextarea ? 'textarea' : 'input';
    
    return (
      <div key={id} className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
        <label htmlFor={id} className="text-sm font-medium tracking-normal leading-none text-black max-md:max-w-full">
          {label}
        </label>
        <InputComponent
          id={id}
          type={type}
          value={formData[id]}
          onChange={handleInputChange}
          placeholder={`Input ${label.replace(' (*)', '')}`}
          className={`flex-1 shrink gap-2 self-stretch px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 text-neutral-500 max-md:max-w-full ${
            isTextarea ? 'min-h-[80px] pb-11' : 'min-h-[48px]'
          }`}
          aria-label={label}
          required
        />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col shadow-[8px_8px_48px_rgba(0,0,0,0.08)] w-full">
      <div className="flex gap-10 items-center w-full text-base text-center max-md:max-w-full">
        <div className="flex gap-3 items-center self-stretch my-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf41593fcddd912cc50de58f569a81736fd55c6d4764a4baaff7ef5cc53fec72?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
            className="object-contain shrink-0 self-stretch my-auto w-12 shadow-2xl aspect-square"
            alt="Profile"
          />
          <div className="flex flex-col items-start self-stretch my-auto">
            <div className="font-semibold text-black">John Doe</div>
            <div className="text-black text-opacity-50">3rd year</div>
          </div>
        </div>
      </div>
      
      <div className="flex overflow-hidden flex-col pt-8 mt-12 w-full bg-white rounded-3xl border border-solid shadow-2xl border-neutral-200 max-md:mt-10 max-md:max-w-full">
        <div className="flex justify-between items-center self-center px-3 w-full text-2xl font-semibold tracking-tight text-black max-w-[1058px] max-md:max-w-full">
          <div className="flex-1 shrink self-stretch my-auto w-full min-w-[240px] max-md:max-w-full">
            Company Profile
          </div>
        </div>
        
        <div className="flex flex-wrap self-start mt-5 w-full">
          <div className="flex flex-col grow shrink-0 px-6 basis-0 min-h-[694px] w-fit max-md:px-5 max-md:mr-0 w-full">
            <div className="flex flex-col w-full">
              {[0, 2, 4, 6, 8, 10].map((index) => (
                <div key={index} className="flex flex-wrap gap-4 items-start mt-4 w-full max-md:max-w-full">
                  {renderFormField(formFields[index])}
                  {renderFormField(formFields[index + 1])}
                </div>
              ))}
                            <div className="flex gap-4 items-start mt-4 w-full text-sm tracking-normal text-zinc-400 max-md:max-w-full">
                <div className="flex flex-col min-w-[240px] w-[508px]">
                  <label htmlFor="video" className="font-medium leading-none text-black max-md:max-w-full">
                    Video (*)
                  </label>
                  <label 
                    htmlFor="video-upload"
                    className="flex flex-wrap gap-2 justify-center items-center px-4 py-3 mt-1 w-full text-base tracking-normal rounded-lg border border-dashed bg-zinc-100 border-zinc-400 max-md:max-w-full cursor-pointer"
                  >
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc8839dd63e3771eb7db189a467dba98fb1d960daa42ad99e7d719d5dfedfbd7?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                      className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                      alt="Upload icon"
                    />
                    <div className="self-stretch my-auto">
                      {formData.video ? formData.video.name : "Drop or Browse file"}
                    </div>
                    <input
                      type="file"
                      id="video-upload"
                      accept="video/mp4"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                  <div className="mt-1 leading-none max-md:max-w-full">
                    Size Maximum: 5 GB. Format file: Mp4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex overflow-hidden flex-col justify-center pe-4 pb-20 bg-white max-md:mr-2 max-md:max-w-full">
          <div className="flex gap-4 justify-end mt-8 w-full max-md:flex-wrap max-md:max-w-full">
            <button 
              type="button"
              onClick={() => fetchCompanyProfile()}
              className="justify-center px-4 py-3 text-base font-medium tracking-normal leading-none text-center text-black bg-white rounded-lg border border-solid border-stone-300 max-md:px-5 hover:bg-gray-100 transition-colors duration-300"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="justify-center px-4 py-3 text-base font-medium tracking-normal leading-none text-center text-white bg-green-900 rounded-lg border border-solid border-green-900 max-md:px-5 hover:bg-green-800 transition-colors duration-300"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CompanyProfileMainSection;