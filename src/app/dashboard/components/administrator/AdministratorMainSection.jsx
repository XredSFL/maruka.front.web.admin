'use client'
import * as React from "react";
import { useState } from "react";

function AddDataModal({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email:'',
        password: '',
        country: '',
        status: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
      const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFormData(prev => ({ ...prev, photo: file }));
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
    
        try {
          const response = await fetch('/api/administrator', {
            method: 'POST',
            body: formDataToSend,
          });
    
          if (response.ok) {
            onSave();
            onClose();
          } else {
            console.error('Failed to save administrator data');
          }
        } catch (error) {
          console.error('Error saving administrator data:', error);
        }
      };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <form onSubmit={handleSubmit} className="flex overflow-hidden flex-col justify-center max-w-2xl bg-white rounded-3xl p-8" role="dialog" aria-labelledby="modalTitle">
          <div className="flex flex-col items-center self-center pb-8 w-full max-md:max-w-full">
            <div className="flex overflow-hidden flex-col pt-6 w-full text-3xl font-bold tracking-tight bg-white text-neutral-950 max-md:max-w-full">
              <div className="flex flex-wrap gap-5 justify-between mx-6 w-full max-w-[624px] max-md:mr-2.5 max-md:max-w-full">
                <h1 id="modalTitle">Add Group Company</h1>
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
              <div className="flex flex-col">
                <label htmlFor="companyName" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                  Name (*)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Input name"
                  className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px] text-neutral-500"
                  required
                />
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="address" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                  Phone Number (*)
                </label>
                <textarea
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Input Phone"
                  className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[80px] text-neutral-500"
                  required
                ></textarea>
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="linkMap" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                  Email (*)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Input Email"
                  className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px] text-neutral-500"
                  required
                />
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="description" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                  Password (*)
                </label>
                <textarea
                  id="description"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Input Password"
                  className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[80px] text-neutral-500"
                  required
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                  Country (*)
                </label>
                <textarea
                  id="description"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Input Country"
                  className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[80px] text-neutral-500"
                  required
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label htmlFor="status" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                  Status (*)
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px] text-neutral-500"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
  
            <div className="flex justify-end mt-6 w-full">
              <button
                type="submit"
                className="px-6 py-3 text-base font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

function AdministratorMainSection() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState("name");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [administrators, setAdministrators] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const headers = ["Name", "Phone Number", "Email", "Password", "Country", "Status"];
  const pages = [1, 2, 3, 4];

  const fetchCompanyData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/group-companies');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCompanyData(data);
      } else {
        console.error('Failed to fetch company data');
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    async function fetchAdministrators() {
      try {
        const response = await fetch('/api/administrator');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAdministrators(data);
      } catch (error) {
        console.error('Failed to fetch administrators:', error);
      }
    }

    fetchAdministrators();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    setSortBy(sortBy === "name" ? "email" : "name");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSave = () => {
    fetchCompanyData();
  }
  return (
    <div className="flex overflow-hidden flex-wrap self-stretch pt-8 bg-white rounded-3xl border border-solid shadow-2xl border-neutral-200 w-full">
      <div className="flex z-10 flex-col grow shrink-0 basis-0 w-fit max-md:-mr-0.5 max-md:max-w-full px-8">
          <div className="flex flex-wrap justify-between items-center mx-4 max-md:mr-2.5 max-md:max-w-full">

            <div className="flex-1 shrink self-stretch my-auto text-2xl font-semibold tracking-tight text-black min-w-[240px] max-md:max-w-full">
              Group Company
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
                onClick={() => setIsModalOpen(true)}
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
        <div className="flex flex-col mt-12 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
          <div className="flex flex-wrap w-full bg-white border-b border-solid border-b-zinc-100 min-h-[70px] w-full">
            {headers.map((header, index) => (
              <div key={index} className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap text-zinc-400">
                {header}
              </div>
            ))}
            <div className="flex gap-2.5 items-center px-3 py-4 w-11 h-full opacity-0">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/64062426a268969a97c90bf9032ab1c03b24ba5f50c4360a6dde31d9409527e0?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                alt=""
                className="object-contain self-stretch my-auto w-5 aspect-square"
              />
            </div>
          </div>
          {administrators.map((admin, index) => (
            <div key={index} className="flex flex-wrap w-full bg-white border-b border-solid border-b-zinc-100 min-h-[70px] max-md:max-w-full">
              <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal text-stone-950">
                {admin.name}
              </div>
              <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal text-stone-950">
                {admin.phone}
              </div>
              <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap text-stone-950 w-[213px]">
                {admin.email}
              </div>
              <div className="flex flex-1 shrink items-center px-3 py-4 h-full basis-0">
                <div className="flex gap-2 items-center self-stretch my-auto">
                  <div className="flex gap-1 items-center self-stretch px-2 py-2 my-auto w-24 min-h-[21px]">
                    {Array(7).fill(null).map((_, i) => (
                      <img
                        key={i}
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c31d77599bd7bebec01490dd4329b6a10adbbbde4173cbb262fd276f44ad3ea?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                        alt=""
                        className="object-contain shrink-0 self-stretch my-auto w-2 aspect-square"
                      />
                    ))}
                                    </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb058900b22263ce0f2d7de8c17802fc6efc303b4ce70aeee1852cf23e653852?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  />
                </div>
              </div>
              <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal text-stone-950">
                {admin.country}
              </div>
              <div className="flex flex-1 shrink gap-2.5 items-center px-3 py-4 h-full text-xs tracking-normal whitespace-nowrap basis-0">
                <div className={`gap-2.5 self-stretch px-3 py-1 my-auto rounded-3xl border border-solid ${
                  admin.status === 'active' 
                    ? 'w-20 border-green-500 bg-green-500 bg-opacity-40 text-emerald-600' 
                    : 'border-red-600 bg-red-600 bg-opacity-20 text-red-600'
                }`}>
                  {admin.status === 'active' ? 'Active' : 'Inactive'}
                </div>
              </div>
              <div className="flex gap-2.5 items-center px-3 py-4 w-11 h-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/64062426a268969a97c90bf9032ab1c03b24ba5f50c4360a6dde31d9409527e0?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                  alt=""
                  className="object-contain self-stretch my-auto w-5 aspect-square"
                />
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
        <AddDataModal onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    )}
        {/* <div className="flex mt-4 font-medium max-md:pr-5">
          <div className="flex z-10 flex-col items-center px-6 pt-6 pb-9 mr-0 w-full bg-white border-t border-solid border-t-zinc-100 min-h-[85px] max-md:px-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-w-[1020px] max-md:max-w-full">
              <div className="self-stretch my-auto text-sm tracking-normal text-neutral-200">
                Showing data 1 to 8 of 256K entries
              </div>
              <div className="flex gap-3 self-stretch my-auto text-xs tracking-normal leading-none whitespace-nowrap rounded min-w-[240px] text-neutral-900 w-[271px]">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page" 
                  className="px-2.5 py-1.5 rounded border border-solid bg-zinc-100 border-neutral-200"
                >
                  &lt;
                </button>
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    aria-label={`Page ${page}`}
                    className={`px-2.5 h-[25px] w-[25px] rounded border border-solid ${
                      page === currentPage
                        ? 'text-white bg-green-700 border-green-700'
                        : 'bg-zinc-100 border-neutral-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <div className="my-auto text-black">...</div>
                <button 
                  onClick={() => handlePageChange(40)}
                  aria-label="Page 40" 
                  className="px-1.5 py-1.5 rounded border border-solid bg-zinc-100 border-neutral-200"
                >
                  40
                </button>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === 40}
                  aria-label="Next page" 
                  className="px-2.5 py-1.5 rounded border border-solid bg-zinc-100 border-neutral-200"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 self-start h-1.5 bg-stone-300 rounded-[100px] w-[129px]" />
        </div> */}
      </div>
      <div className="flex flex-col px-0.5 pt-3 pb-96 my-auto bg-white max-md:pb-24">
        <div className="flex shrink-0 h-11 bg-stone-300 rounded-[100px]" />
      </div>
    </div>
  );
}

export default AdministratorMainSection;