'use client';

import * as React from "react";
import { useState, useEffect, useCallback } from 'react';


const paginationButtons = [1, 2, 3, 4, "...", 40];


function AddGroupCompanyModal({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        companyName: '',
        address: '',
        linkMap: '',
        description: '',
        photo: null
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
          const response = await fetch('/api/group-companies', {
            method: 'POST',
            body: formDataToSend,
          });
    
          if (response.ok) {
            onSave();
            onClose();
          } else {
            console.error('Failed to save group company data');
          }
        } catch (error) {
          console.error('Error saving group company data:', error);
        }
      };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <form onSubmit={handleSubmit} className="flex overflow-hidden flex-col justify-center max-w-2xl bg-white rounded-3xl p-8" role="dialog" aria-labelledby="modalTitle">
          <div className="flex flex-col items-center self-center pb-8 w-full max-md:max-w-full">
            <div className="flex overflow-hidden flex-col pt-6 w-full text-3xl font-bold tracking-tight bg-white text-neutral-950 max-md:max-w-full">
              <div className="flex flex-wrap gap-5 justify-between w-full max-w-[624px] max-md:mr-2.5 max-md:max-w-full">
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
                  Company Name (*)
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Input Company Name"
                  className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px] text-neutral-500"
                  required
                />
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="address" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                  Address (*)
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Input Address"
                  className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[80px] text-neutral-500"
                  required
                ></textarea>
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="linkMap" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                  Link Map (*)
                </label>
                <input
                  type="text"
                  id="linkMap"
                  name="linkMap"
                  value={formData.linkMap}
                  onChange={handleInputChange}
                  placeholder="Input Link Map"
                  className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px] text-neutral-500"
                  required
                />
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="description" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                  Description (*)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Input Description"
                  className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[80px] text-neutral-500"
                  required
                ></textarea>
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="photo" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                  Photo (*)
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handlePhotoChange}
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100"
                  required
                />
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
  

  function GroupCompanyDetailsModal({ companyData, onClose }) {
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
              <div className="flex flex-row">
                <label className="font-medium text-xl text-black mb-1">
                  Company Name : &nbsp;
                </label>
                <p className='font-medium text-xl' style={{color:'#357049'}}>
                  {companyData.companyName}
                </p>
              </div>
  
              <div className="flex flex-row" >
                <label className="font-medium text-xl text-black mb-1">
                  Address : &nbsp;
                </label>
                <p className='font-medium text-xl' style={{color:'#357049'}}>
                  {companyData.address}
                </p>
              </div>
  
              <div className="flex flex-row">
                <label className="font-medium text-xl text-black mb-1">
                  Link Map : &nbsp;
                </label>
                <p className='font-medium text-xl' style={{color:'#357049'}}>
                  {companyData.linkMap}
                </p>
              </div>
  
              <div className="flex flex-row">
                <label className="font-medium text-xl text-black mb-1">
                  Description : &nbsp;
                </label>
                <p className='font-medium text-xl' style={{color:'#357049'}}>
                  {companyData.description}
                </p>
              </div>
  
              <div className="flex flex-col">
                <label className="font-medium text-xl text-black mb-1">
                  Photo
                </label>
                {companyData.photo ? (
                  <img src={companyData.photo} alt={companyData.companyName} className="w-full h-48 object-cover rounded-lg" />
                ) : (
                  <p className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px]">
                    No photo available
                  </p>
                )}
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

function CategoryActionMenu({ item, position, onEdit, onDelete, onClose }) {
  if (!item) return null;

  return (
    <div 
      className="absolute z-50 bg-white rounded-lg shadow-lg p-2 w-32"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <button
        onClick={() => onEdit(item)}
        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md text-black"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(item)}
        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md text-red-600"
      >
        Delete
      </button>
    </div>
  );
}

function EditGroupCompanyModal({ onClose, onSave, item }) {
    const [formData, setFormData] = useState({
        companyName: '',
        address: '',
        linkMap: '',
        description: '',
        photo: null
    });

    useEffect(() => {
        if (item) {
            setFormData({
                companyName: item.company_name || '',
                address: item.address || '',
                linkMap: item.link_map || '',
                description: item.description || '',
                photo: null // We don't set the file here, just show it separately
            });
        }
    }, [item]);

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
            if (key === 'photo' && formData[key] === null) {
                continue; // Don't append photo if it hasn't changed
            }
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch(`/api/group-companies/${item.id}`, {
                method: 'PUT',
                body: formDataToSend,
            });

            if (response.ok) {
                onSave();
                onClose();
            } else {
                console.error('Failed to update group company data');
            }
        } catch (error) {
            console.error('Error updating group company data:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit} className="flex overflow-hidden flex-col justify-center max-w-2xl bg-white rounded-3xl p-8" role="dialog" aria-labelledby="modalTitle">
                <div className="flex flex-col items-center self-center pb-8 w-full max-md:max-w-full">
                    <div className="flex overflow-hidden flex-col pt-6 w-full text-3xl font-bold tracking-tight bg-white text-neutral-950 max-md:max-w-full">
                        <div className="flex flex-wrap gap-5 justify-between w-full max-w-[624px] max-md:mr-2.5 max-md:max-w-full">
                            <h1 id="modalTitle">Edit Group Company</h1>
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
                                Company Name (*)
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="Input Company Name"
                                className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px] text-neutral-500"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="address" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                                Address (*)
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Input Address"
                                className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[80px] text-neutral-500"
                                required
                            ></textarea>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="linkMap" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                                Link Map (*)
                            </label>
                            <input
                                type="url"
                                id="linkMap"
                                name="linkMap"
                                value={formData.linkMap}
                                onChange={handleInputChange}
                                placeholder="Input Link Map"
                                className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px] text-neutral-500"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                                Description (*)
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Input Description"
                                className="px-4 py-3 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[80px] text-neutral-500"
                                required
                            ></textarea>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="photo" className="text-sm font-medium tracking-normal leading-none text-black mb-1">
                                Photo
                            </label>
                            {item && item.photo && (
                                <img src={item.photo} alt="Current company photo" className="mt-2 max-w-xs mb-2 w-[250] h-[250]" />
                            )}
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                onChange={handlePhotoChange}
                                accept="image/*"
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-green-50 file:text-green-700
                                    hover:file:bg-green-100"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 w-full">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-base font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 mr-4"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 text-base font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}


  function TableRow({ item }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

        const [isAddModalOpen, setIsAddModalOpen] = useState(false);
        const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
        const [selectedItem, setSelectedItem] = useState(null);
        const [editingCategory, setEditingCategory] = useState(null);
    
    
    
        const handleCategoryAction = useCallback((item, event) => {
          event.stopPropagation();
          const buttonRect = event.currentTarget.getBoundingClientRect();
          setMenuPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.right + window.scrollX -100,
          });
          setSelectedItem(item);
        }, []);
    
        const handleDelete = useCallback(async (item) => {
          if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
            try {
              const response = await fetch(`/api/group-companies/${item.id}`, {
                method: 'DELETE',
              });
              if (response.ok) {
                window.location.reload();
              } else {
                throw new Error('Failed to delete item');
              }
            } catch (error) {
              console.error('Error deleting category:', error);
              alert('Failed to delete category. Please try again.');
            }
          }
          setSelectedItem(null);
        }, []);
        
      
        const handleEdit = useCallback((item) => {
          setIsAddModalOpen(true);
        }, []);
    
        const handleSave = () => {
          window.location.reload();
        }
    
    return (
      <div className="flex flex-wrap w-full bg-white border-b border-solid border-b-zinc-100  min-h-[70px] w-full">
        <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal min-w-[240px]" onClick={() => setIsModalOpen(true)}>
          <p style={{color:'#357049'}}>{item.company_name}</p>
        </div>
        <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px]" onClick={() => setIsModalOpen(true)}>
        <p style={{color:'#357049'}}>{item.address.slice(0, 20)}</p>
        </div>
        <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px]" onClick={() => setIsModalOpen(true)}>
          {item.photo ? (
            <img 
              src={item.photo} 
              alt={item.companyName} 
              className="w-10 h-10 object-cover"
            />
          ) : (
            'No photo'
          )}
        </div>
        <div className="flex gap-2.5 items-center px-3 py-4 w-11 h-full">
            <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2399b6a0150de287525709f958419b7b533111b37e7393abef2b8847372ad4e6?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                  alt="Actions"
                  className="object-contain self-stretch my-auto w-5 aspect-square"
                  onClick={(e) => handleCategoryAction(item, e)}
            />
        </div>
        {isModalOpen && (
        <GroupCompanyDetailsModal
          companyData={{ id: item.id, companyName: item.companyName, address: item.address, photo: item.photo,description: item.description, description:item.linkMap, createdAt: item.createdAt, updatedAt: item.updatedAt }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
        <CategoryActionMenu
          item={selectedItem}
          position={menuPosition}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={() => setSelectedItem(null)}
        />
          {isAddModalOpen && (
          <EditGroupCompanyModal onClose={() => setIsAddModalOpen(false)} onSave={handleSave} item={item}/>
            )}
      </div>
    );
  }

function PaginationButton({ number, isActive }) {
  const baseClasses = "px-2.5 rounded border border-solid h-[25px] w-[25px]";
  const activeClasses = "text-white bg-green-700 border-green-700";
  const inactiveClasses = "bg-zinc-100 border-neutral-200";
  
  return (
    <button 
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? "page" : undefined}
    >
      {number}
    </button>
  );
}

function GroupCompanyMainSection() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companyData, setCompanyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
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
  
    useEffect(() => {
      fetchCompanyData();
    }, []);
  
    const handleSave = () => {
      fetchCompanyData();
    };
  
    // Filter companies based on search term
    const filteredCompanies = companyData.filter(company =>
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Pagination
    const itemsPerPage = 8;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const [modalForm, setModalForm] = React.useState({
    companyName: '',
    address: '',
    linkMap: '',
    description: '',
    photo: null
  });

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setModalForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    setModalForm(prev => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', modalForm);
    // Here you would typically send the data to your backend
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col shadow-[8px_8px_48px_rgba(0,0,0,0.08)] w-full">
      <div className="flex gap-10 items-center w-full text-base text-center">
        <div className="flex gap-3 items-center self-stretch my-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf41593fcddd912cc50de58f569a81736fd55c6d4764a4baaff7ef5cc53fec72?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
            alt="Profile"
            className="object-contain shrink-0 self-stretch my-auto w-12 shadow-2xl aspect-square"
          />
          <div className="flex flex-col items-start self-stretch my-auto">
            <div className="font-semibold text-black">John Doe</div>
            <div className="text-black text-opacity-50">3rd year</div>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden flex-wrap pt-8 mt-12 w-full bg-white rounded-3xl border border-solid shadow-2xl border-neutral-200 max-md:mt-10 max-md:max-w-full">
        <div className="flex z-10 flex-col grow shrink-0 basis-0 w-fit max-md:-mr-0.5 max-md:max-w-full">
          {/* header */}
          <div className="flex flex-wrap justify-between items-center px-3 mx-4 max-md:mr-2.5 max-md:max-w-full">

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* content */}
          <div className="flex flex-col mx-4 mt-12 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
            <div className="flex flex-wrap w-full bg-white border-b border-solid border-b-zinc-100 min-h-[70px] w-full">
              <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal min-w-[240px] text-zinc-400">
                Company Name
              </div>
              <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px] text-zinc-400">
                Address
              </div>
              <div className="flex-1 shrink px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px] text-zinc-400">
                Photo
              </div>
              <div className="flex gap-2.5 items-center px-3 py-4 w-11 h-full opacity-0">
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
                currentCompanies.map((item) => (
                  <TableRow 
                    key={item.id}
                    item={item}
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
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="px-2.5 py-1.5 rounded border border-solid bg-zinc-100 border-neutral-200"
                  aria-label="Previous page"
                >
                  &lt;
                </button>
                {paginationButtons.map((num, index) => (
                  <PaginationButton 
                    key={index} 
                    number={num} 
                    isActive={num === currentPage}
                  />
                ))}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(40, prev + 1))}
                  className="px-2.5 py-1.5 rounded border border-solid bg-zinc-100 border-neutral-200"
                  aria-label="Next page"
                >
                  &gt;
                </button>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-0.5 pt-3 pb-96 my-auto bg-white max-md:pb-24">
          <div className="flex shrink-0 h-11 bg-stone-300 rounded-[100px]" />
        </div>
      </div>

      {isModalOpen && (
        <AddGroupCompanyModal onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    )}

    </div>
  );
}

export default GroupCompanyMainSection;