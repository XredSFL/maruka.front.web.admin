'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

function CustomModal({ companyData, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="flex overflow-hidden flex-col justify-center max-w-2xl bg-white rounded-3xl p-8" role="dialog" aria-labelledby="modalTitle">
          <div className="flex flex-col items-center self-center pb-8 w-full max-md:max-w-full">
            <div className="flex overflow-hidden flex-col pt-6 w-full text-3xl font-bold tracking-tight bg-white text-neutral-950 max-md:max-w-full">
              <div className="flex flex-wrap gap-5 justify-between mx-6 w-full max-w-[624px] max-md:mr-2.5 max-md:max-w-full">
                <h1 id="modalTitle">Group Company Details</h1>
                <button type="button" onClick={onClose} aria-label="Close modal" className="cursor-pointer">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb13128979ca9bfd94fd7e8bcbc4eb6c89939d0493b05acd2c5b150048db041c?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                    alt=""
                    className="object-contain shrink-0 my-auto w-6 aspect-square"
                  />
                </button>
              </div>
              <div className="mt-4 w-full border border-solid bg-neutral-200 border-neutral-200 min-h-[1px] max-md:max-w-full" />
            </div>
  
            <div className="flex flex-col gap-4 mt-6 max-w-full w-[624px]">
  
              <div className="flex flex-row" >
                <label className="font-medium text-xl text-black mb-1">
                  Continent : &nbsp;
                </label>
                <p className='font-medium text-xl' style={{color:'#357049'}}>
                  {companyData.companyContinent}
                </p>
              </div>
  
              <div className="flex flex-row">
                <label className="font-medium text-xl text-black mb-1">
                  Region : &nbsp;
                </label>
                <p className='font-medium text-xl' style={{color:'#357049'}}>
                  {companyData.companyRegion}
                </p>
              </div>
              <div className="flex flex-row">
                <label className="font-medium text-xl text-black mb-1">
                  Group Company : &nbsp;
                </label>
                <p className='font-medium text-xl' style={{color:'#357049'}}>
                  {companyData.groupCompanyName}
                </p>
              </div>
              <div className='flex flex-col ms-16'>
              
                {companyData.companies.map((company, index) => {
                  return(
                    <div key={index}>
                        <div className="flex flex-row">
                          <label className="font-medium text-xl text-black mb-1">
                            Company : &nbsp;
                          </label>
                          <div>
                            <p className='font-medium text-xl' style={{color:'#357049'}}>
                              {company.company_name}
                            </p>
                            <p className='text-light text-black'>
                              Address : {company.address} <br/>
                              Phone : {company.phone} <br/>
                              Fax : {company.fax}
                            </p>
                          </div>
                        </div>
                    </div>
                  )
                })}
              </div>
          </div>

          <div className="flex justify-end mt-6 w-full">
            <button
              onClick={onClose}
              className="px-6 py-3 text-base font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const InputField = React.memo(({ label, name, placeholder, type = "text", value, onChange }) => (
    <div className="flex flex-1 shrink gap-4 items-start basis-0 min-w-[240px] max-md:max-w-full">
      <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
        <label htmlFor={name} className="text-sm font-medium tracking-normal leading-none text-black max-md:max-w-full">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 shrink gap-2 px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[80px] pb-11 text-neutral-500 max-md:max-w-full"
            aria-label={label}
          />
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 shrink gap-2 px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px] text-neutral-500 max-md:max-w-full"
            aria-label={label}
          />
        )}
      </div>
    </div>
  ));

const CompanyForm = React.memo(({ company, index, onChange }) => {
    return (
      <div className="flex flex-col ml-5 max-md:ml-0 w-full mb-8">
        <div className="flex flex-col grow max-md:mt-8 w-full">
          <InputField 
            label="Company Name" 
            name="companyName" 
            placeholder="Enter company name" 
            value={company.companyName}
            onChange={(e) => onChange(e, index)}
          />
          <InputField 
            label="Address" 
            name="address" 
            placeholder="Enter address" 
            type="textarea"
            value={company.address}
            onChange={(e) => onChange(e, index)}
          />
          <InputField 
            label="Phone" 
            name="phone" 
            placeholder="Enter phone number" 
            type="tel"
            value={company.phone}
            onChange={(e) => onChange(e, index)}
          />
          <InputField 
            label="Fax" 
            name="fax" 
            placeholder="Enter fax number"
            value={company.fax}
            onChange={(e) => onChange(e, index)}
          />
        </div>
      </div>
    );
  });
function TableRow({ id, companyContinent, companyRegion, companies, groupCompanyName }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
      <div className="flex flex-wrap w-full bg-white border-b border-solid border-b-zinc-100  min-h-[70px] w-full">
        <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px]" onClick={() => setIsModalOpen(true)}>
            <p style={{color:'#357049'}}>{companyContinent}</p>
        </div>
        <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px]" onClick={() => setIsModalOpen(true)}>
            <p style={{color:'#357049'}}>{companyRegion}</p>
        </div>
        <div className="flex gap-2.5 items-center px-3 py-4 w-11 h-full">
            <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2399b6a0150de287525709f958419b7b533111b37e7393abef2b8847372ad4e6?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                  alt="Actions"
                  className="object-contain self-stretch my-auto w-5 aspect-square"
            />
        </div>
        {isModalOpen && (
        <CustomModal
          companyData={{ id, companyContinent, companyRegion, companies, groupCompanyName }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      </div>
    );
  }

function GlobalNetworkMainSection() {
    const [showForm, setShowForm] = useState(false);
    const [globalNetwork, setGlobalNetwork] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchGlobalNetwork();
    }, []);

    

    const fetchGlobalNetwork = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/global-network');
            if (response.ok) {
                const data = await response.json();
                setGlobalNetwork(data);
            } else {
                console.error('Failed to fetch global network data');
            }
            console.log('Global network data:', response);
        } catch (error) {
            console.error('Error fetching global network data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        console.log('Global network:', globalNetwork);
    }, [globalNetwork]);
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCompany(null);
    };

    return (
        <div className="flex flex-col shadow-[8px_8px_48px_rgba(0,0,0,0.08)] w-full">
            {showForm ? (
                <GlobalNetworkForm onCancel={() => setShowForm(false)} onSuccess={() => {
                    setShowForm(false);
                    fetchGlobalNetwork();
                }} />
            ) : (
                <>
                    <div className="flex gap-10 items-center w-full text-base text-center">
                        <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
                            <form className="overflow-hidden self-stretch px-14 py-3.5 my-auto whitespace-nowrap bg-white rounded-3xl shadow-2xl min-w-[240px] w-[394px] max-md:px-5">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <input
                                    type="search"
                                    id="search"
                                    placeholder="Search"
                                    className="w-full bg-transparent text-black text-opacity-50 outline-none"
                                    onClick={toggleForm}
                                />
                            </form>
                            
                            <div className="flex gap-3 items-center self-stretch my-auto">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ec5732d6df394edf0e6c8af0fd060efd25d2e80f74014841e12bc27c66bff4d?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                                    alt="John Doe profile picture"
                                    className="object-contain shrink-0 self-stretch my-auto w-12 shadow-2xl aspect-square"
                                />
                                <div className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-neutral-950">
                                    John Doe
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex overflow-hidden flex-wrap pt-8 mt-12 w-full bg-white rounded-3xl border border-solid shadow-2xl border-neutral-200 max-md:mt-10 max-md:max-w-full">
                        <div className="flex flex-col w-full max-md:max-w-full">
                        <div className="flex flex-wrap justify-between items-center px-3 mx-4 max-md:mr-2.5 max-md:max-w-full">
                            <div className="flex-1 shrink self-stretch my-auto text-2xl font-semibold tracking-tight text-black min-w-[240px] max-md:max-w-full">
                                Global Network
                            </div>


                            <div className="flex flex-wrap flex-1 shrink justify-end gap-4 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                            <div className="flex flex-col justify-center self-stretch my-auto text-xs tracking-normal text-gray-400 whitespace-nowrap rounded-none w-[216px]">
                                <div className="flex gap-2 px-2 py-2 bg-green-50 rounded-xl">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b3628f50168ac9cfcb6caaf94511367f7e576e4ce67e1fb238d8d451716aa47?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                                    alt="Search icon"
                                    className="object-contain shrink-0 w-6 aspect-square"
                                />
                                <label htmlFor="searchInput" className="sr-only">Search companies</label>
                                <input 
                                    id="searchInput"
                                    type="search"
                                    // value={searchTerm}
                                    // onChange={(e) => setSearchTerm(e.target.value)}
                                    className="grow shrink w-[163px] bg-transparent outline-none"
                                    placeholder="Search"
                                />
                                </div>
                            </div>
                            <div className="flex flex-col self-stretch my-auto text-xs tracking-normal rounded-none text-zinc-500 w-[154px]">
                                <div className="flex gap-5 px-3.5 py-2.5 bg-green-50 rounded-xl">
                                <div>
                                    <span className="">Sort by : </span>
                                    <span className="text-zinc-700">Name</span>
                                </div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4eb81f5d81fb7a614919c0adbcfe89ca703759b063618fa61739ac70eb8ddd7d?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                                    alt="Sort icon"
                                    className="object-contain shrink-0 aspect-square w-[18px]"
                                />
                                </div>
                            </div>
                            <button 
                                className="flex gap-2 justify-center items-center self-stretch px-1.5 my-auto w-9 h-9 bg-green-50 rounded-md"
                                aria-label="Filter"
                                onClick={() => toggleForm()}
                            >
                                <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1af4dacfcbdb4d983832d3030e78637f469e47c7b8ace5056aa60851ee69693c?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                                alt=""
                                className="object-contain self-stretch my-auto w-6 aspect-square"
                                />
                            </button>
                        </div>

                        </div>
                            <div className="flex flex-col mx-4 mt-12 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                                <div className="flex flex-wrap w-full bg-white border-b border-solid border-b-zinc-100 min-h-[70px] w-full">
                                    <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal min-w-[240px] text-zinc-400">
                                        Continent
                                    </div>
                                    <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px] text-zinc-400">
                                        Region
                                    </div>
                                    <div className="flex gap-2.5 items-center px-3 py-4 w-11 h-full">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2399b6a0150de287525709f958419b7b533111b37e7393abef2b8847372ad4e6?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                                            alt="Actions"
                                            className="object-contain self-stretch my-auto w-5 aspect-square"
                                        />
                                    </div>
                                </div>

                                {isLoading ? (
                            <div className="text-center py-4">Loading...</div>
                        ) : (
                            globalNetwork.map((company, index) => (
                                <TableRow 
                                    key={company.id + index}
                                    id={company.id}
                                    companyContinent={company.continent}
                                    companyRegion={company.region}
                                    companies={company.companies}
                                    groupCompanyName = {company.group_company_name}
                                />
                            ))
                        )}

                            </div>
                            <div className="flex flex-col justify-center items-start px-6 py-0.5 mt-72 bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
                                <div className="flex shrink-0 bg-stone-300 h-[5px] rounded-[100px] w-[129px]" />
                                </div>
                            <div className="flex z-10 flex-col items-center px-6 pt-6 pb-9 mt-0 w-full font-medium bg-white border-t border-solid border-t-zinc-100 min-h-[85px] max-md:px-5 max-md:max-w-full">
                                <div className="flex flex-wrap gap-10 justify-between items-center w-full max-w-[1020px] max-md:max-w-full">
                                    <div className="self-stretch my-auto text-sm tracking-normal text-neutral-200">
                                        Showing data 1 to 8 of 256K entries
                                    </div>
                                    <nav aria-label="Pagination" className="flex gap-3 self-stretch my-auto text-xs tracking-normal leading-none whitespace-nowrap rounded min-w-[240px] text-neutral-900 w-[271px]">
                                        <button 
                                            className="px-2.5 py-1.5 rounded border border-solid bg-zinc-100 border-neutral-200"
                                            aria-label="Previous page"
                                        >
                                            &lt;
                                        </button>
                                        <button 
                                            className="px-2.5 py-1.5 rounded border border-solid bg-zinc-100 border-neutral-200"
                                            aria-label="Next page"
                                        >
                                            &gt;
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function GlobalNetworkForm({ onCancel, onSuccess }) {
    const [formData, setFormData] = useState({
        continent: "",
        region: "",
        country: "",
        group: "",
        companies: [{ companyName: "", address: "", phone: "", fax: "" }]
    });

    const regionCountries = {
      'East Asia': ['China', 'Japan', 'South Korea', 'Taiwan', 'Hong Kong', 'Macau', 'Mongolia', 'North Korea'],
      'South Asia': ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Bhutan', 'Maldives', 'Afghanistan'],
      'Southeast Asia': ['Indonesia', 'Malaysia', 'Philippines', 'Singapore', 'Thailand', 'Vietnam', 'Myanmar', 'Cambodia', 'Laos', 'Brunei', 'Timor-Leste'],
      // 'Europe': ['United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Sweden', 'Poland', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria', 'Greece', 'Portugal', 'Ireland', 'Czech Republic', 'Romania', 'Hungary'],
      // 'North America': ['United States', 'Canada', 'Mexico'],
      // 'South America': ['Brazil', 'Argentina', 'Colombia', 'Peru', 'Chile', 'Venezuela', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay', 'Guyana', 'Suriname'],
      // 'Africa': ['Nigeria', 'Egypt', 'South Africa', 'Kenya', 'Ethiopia', 'Ghana', 'Ivory Coast', 'Tanzania', 'Morocco', 'Algeria', 'Tunisia', 'Senegal', 'Uganda', 'Cameroon', 'Zimbabwe', 'Rwanda', 'Zambia'],
      'Oceania': ['Australia', 'New Zealand', 'Papua New Guinea', 'Fiji', 'Solomon Islands', 'Vanuatu', 'Samoa', 'Tonga', 'Palau', 'Micronesia']
    };
    const [isLoading, setIsLoading] = useState(true);
    const [groupCompanies, setGroupCompanies] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchGroupCompanies();
    }, []);

    const fetchGroupCompanies = async () => {
        try {
            const response = await fetch('/api/group-companies');
            if (response.ok) {
                const data = await response.json();
                setGroupCompanies(data);
            }
        } catch (error) {
            console.error('Error fetching group companies:', error);
        }
    };

    const handleInputChange = useCallback((e, index = null) => {
      const { name, value } = e.target;
      setFormData(prev => {
          if (index !== null) {
              return {
                  ...prev,
                  companies: prev.companies.map((company, i) => 
                      i === index ? { ...company, [name]: value } : company
                  )
              };
          } else {
              if (name === 'region') {
                  // Reset country when region changes
                  return { ...prev, [name]: value, country: '' };
              }
              return { ...prev, [name]: value };
          }
      });
  }, []);

      const handleAddCompany = useCallback(() => {
        setFormData(prev => ({
          ...prev,
          companies: [...prev.companies, { companyName: "", address: "", phone: "", fax: "" }]
        }));
      }, []);

      const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
          const response = await fetch('/api/global-network', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          console.log('Data saved successfully:', result);
          alert('Global network data has been saved successfully!');
          
          // Reset form or fetch updated data here if needed
        } catch (error) {
          console.error('Error saving global network data:', error);
          alert('Failed to save global network data. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }, [formData]);


    const handleCancel = () => {
        setFormData({
            continent: "",
            region: "",
            country: "",
            group: "",
            companies: [{ companyName: "", address: "", phone: "", fax: "" }]
        });
        onCancel();
    };
    const handleRemoveCompany = useCallback((index) => {
        setFormData(prev => ({
          ...prev,
          companies: prev.companies.filter((_, i) => i !== index)
        }));
      }, []);

      const isFormValid = useMemo(() => {
        return formData.continent && formData.region && formData.country && formData.group &&
               formData.companies.every(company => 
                 company.companyName && company.address && company.phone && company.fax
               );
      }, [formData]);

    const SelectField = ({ label, name, placeholder, options, formData, onChange }) => (
        <div className="flex flex-1 shrink gap-4 items-start basis-0 min-w-[240px] max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
                <label htmlFor={name} className="text-sm font-medium tracking-normal leading-none text-black max-md:max-w-full">
                    {label}
                </label>
                <div className="flex flex-wrap gap-2 items-center px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px] text-neutral-500 max-md:max-w-full">
                    <select
                        id={name}
                        name={name}
                        value={formData[name] || ''}
                        onChange={onChange}
                        className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full bg-transparent border-none outline-none"
                        aria-label={label}
                    >
                        <option value="">{placeholder}</option>
                        {options.map((option, index) => (
                            <option 
                                key={typeof option === 'object' ? option.id : `${name}-${index}`} 
                                value={typeof option === 'object' ? option.id : option}
                            >
                                {typeof option === 'object' ? option.name : option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );

    const InputField = ({ label, name, placeholder, type = "text", value, onChange }) => (
        <div className="flex flex-1 shrink gap-4 items-start basis-0 min-w-[240px] max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
                <label htmlFor={name} className="text-sm font-medium tracking-normal leading-none text-black max-md:max-w-full">
                    {label}
                </label>
                {type === "textarea" ? (
                <textarea
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="flex-1 shrink gap-2 px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[80px] pb-11 text-neutral-500 max-md:max-w-full"
                        aria-label={label}
                    />
                ) : (
                    <input
                        id={name}
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="flex-1 shrink gap-2 px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px] text-neutral-500 max-md:max-w-full"
                        aria-label={label}
                    />
                )}
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col shadow-[8px_8px_48px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col px-6 pt-6 w-full max-md:px-5 max-md:max-w-full">
                <div className="flex flex-wrap gap-5 justify-between items-start max-md:max-w-full">
                    <div className="flex flex-col flex-1 self-stretch my-auto">
                        <div className="text-2xl font-bold tracking-tight text-neutral-950">Add Global Network</div>
                        <div className="mt-1 text-base tracking-normal leading-6 text-neutral-500">Fill up the form below to add a new global network</div>
                    </div>
                    <button 
                        type="button" 
                        onClick={handleCancel}
                        className="flex gap-2 justify-center items-center px-4 py-2.5 text-base font-medium tracking-normal leading-6 text-center whitespace-nowrap rounded-lg border border-solid shadow-sm bg-zinc-50 border-neutral-200 text-neutral-950"
                    >
                        Cancel
                    </button>
                </div>
                <div className="shrink-0 mt-6 h-px bg-neutral-200 max-md:max-w-full" />
            </div>
            <div className="flex flex-col px-6 py-12 w-full max-md:px-5 max-md:max-w-full">
                <div className="flex flex-wrap gap-8 max-md:flex-col max-md:gap-0 max-md:">
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow max-md:mt-8">
                        <SelectField 
                            label="Continent" 
                            name="continent" 
                            placeholder="Select continent" 
                            options={['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania']}
                            formData={formData}
                            onChange={handleInputChange}
                        />
                        <SelectField 
                          label="Region" 
                          name="region" 
                          placeholder="Select region" 
                          options={Object.keys(regionCountries)}
                          formData={formData}
                          onChange={handleInputChange}
                      />

                      <SelectField 
                          label="Country" 
                          name="country" 
                          placeholder="Select country" 
                          options={formData.region ? regionCountries[formData.region] : []}
                          formData={formData}
                          onChange={handleInputChange}
                          disabled={!formData.region}
                      />
                        <SelectField 
                            label="Group-company" 
                            name="group" 
                            placeholder="Select group" 
                            options={groupCompanies.map(gc => ({ id: gc.id, name: gc.company_name }))}
                            formData={formData}
                            onChange={handleInputChange}
                        />
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                        {formData.companies.map((company, index) => (
                            <div key={index} className="relative">
                                <CompanyForm
                                company={company}
                                index={index}
                                onChange={handleInputChange}
                                />
                                {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveCompany(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                    &times;
                                </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddCompany}
                            className="flex gap-2 justify-center items-center px-4 py-2.5 mt-4 text-base font-medium tracking-normal leading-6 text-center whitespace-nowrap rounded-lg border border-solid shadow-sm bg-green-600 border-green-600 text-white"
                        >
                            Add Company +
                        </button>
                    </div>
                </div>
            </div>
            {error && (
                <div className="text-red-500 mb-4 px-6">{error}</div>
            )}
            <div className="flex justify-end gap-4 px-6 py-6 w-full border-t border-solid border-neutral-200 max-md:px-5 max-md:max-w-full">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="flex gap-2 justify-center items-center px-4 py-2.5 text-base font-medium tracking-normal leading-6 text-center whitespace-nowrap rounded-lg border border-solid shadow-sm bg-zinc-50 border-neutral-200 text-neutral-950"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex gap-2 justify-center items-center px-4 py-2.5 text-base font-medium tracking-normal leading-6 text-center text-white whitespace-nowrap rounded-lg border border-solid shadow-sm bg-green-600 border-green-600"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}


export default GlobalNetworkMainSection;
