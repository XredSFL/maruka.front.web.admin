'use client';

import * as React from "react";
import './style.css';
function NavigationItem({ label, isActive, onClick }) {
    return (
      <div 
        className="flex overflow-hidden flex-col flex-1 shrink basis-0 cursor-pointer"
        onClick={onClick}
      >
        <div className="overflow-hidden flex-1 self-stretch px-4 size-full">
          {label}
        </div>
        <div className={`flex w-full rounded min-h-[3px] ${isActive ? 'bg-stone-950' : ''}`} />
      </div>
    );
  }
  
  function SectionHeader({ title }) {
    return (
      <div className="flex flex-wrap gap-2 items-center w-full text-xl font-medium tracking-tight leading-tight text-black bg-white rounded-lg min-h-[48px] max-md:max-w-full">
        <div className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full">
          {title}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f86792f3d0592bc5f5c4cb7615ec5bbfb516416a050ab7acb708be8a94efad5b?apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1&"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
        />
      </div>
    );
  }

  export function LandingPageMainSection() {
    const [activeItem, setActiveItem] = React.useState("Home");
    const [sections, setSections] = React.useState({
      Home: [{ title: "We Are Here To Serve You", description: "", clientTitle: "Our Client", photo: null }],
      "About Us": [{ title: "", description: "", clientTitle: "Our Client", photo: null }],
      "Product": [{ title1: "", description1: "", title2: "", description2: "" }],
      "News": [{ title: "", description: "", clientTitle: "Our Client", photo: null }],
      "Contact Us": [{ title1: "", title2: "", description: "", address: "", phone: "", email: "" }]
    });
  
    const handleNavClick = (label) => {
      setActiveItem(label);
    };
  
    const handleInputChange = (index, field, value) => {
      setSections(prevSections => ({
        ...prevSections,
        [activeItem]: prevSections[activeItem].map((section, i) => 
          i === index ? { ...section, [field]: value } : section
        )
      }));
    };
  
    const handleFileUpload = (event, index) => {
      const file = event.target.files[0];
      if (file) {
        const isValidType = ['image/png', 'image/jpeg'].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
        
        if (!isValidType || !isValidSize) {
          alert('Please upload a PNG or JPG file under 5MB');
          return;
        }
  
        handleInputChange(index, 'photo', file);
      }
    };
  
    const addSection = () => {
      setSections(prevSections => ({
        ...prevSections,
        [activeItem]: [...prevSections[activeItem], { title: "", description: "", clientTitle: "", photo: null }]
      }));
    };
  
  
    const handleSave = async () => {
      try {
        if (activeItem === "Contact Us") {
          // Handle Contact Us separately
          const contactUsData = sections["Contact Us"][0]; // Assuming there's only one contact us section
          const response = await fetch('/api/contact-us', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactUsData),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            alert("Contact Us information saved successfully");
          } else {
            alert(`Error: ${data.message}\n${data.error || ''}`);
          }
        } else if (activeItem === "Product") {
          const productData = sections["Product"][0];
          const response = await fetch('/api/product-page', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert("Product information saved successfully");
          } else {
            alert(`Error: ${data.message}\n${data.error || ''}`);
          }
        } else {
          // Original save logic for other sections
          const formData = new FormData();
          formData.append('page', activeItem);
      
          sections[activeItem].forEach((section, index) => {
            formData.append(`sections[${index}][title]`, section.title || '');
            formData.append(`sections[${index}][description]`, section.description || '');
            formData.append(`sections[${index}][clientTitle]`, section.clientTitle || '');
            if (section.photo instanceof File) {
              formData.append(`sections[${index}][photo]`, section.photo);
            }
          });
      
          const response = await fetch('/api/landing-page', {
            method: 'POST',
            body: formData,
          });
      
          const data = await response.json();
      
          if (response.ok) {
            alert(data.message);
          } else {
            alert(`Error: ${data.message}\n${data.error || ''}`);
          }
        }
      } catch (error) {
        console.error('Error saving data:', error);
        alert(`An error occurred while saving the data: ${error.message}`);
      }
    };

    return (
      <div className="flex overflow-hidden flex-col justify-center rounded-3xl w-full">
        <div className="flex flex-col flex-1 self-center w-full">
          <header className="flex overflow-hidden flex-col pt-5 w-full text-3xl font-bold tracking-tight bg-white text-neutral-950 max-md:max-w-full">
            <h1 className="self-start ml-6 max-md:ml-2.5">Landing Page</h1>
            <div className="mt-5 w-full border border-solid bg-neutral-200 border-neutral-200 min-h-[1px] w-full" />
          </header>
          
          <nav className="flex overflow-hidden flex-col justify-center items-center px-56 py-6 w-full text-base leading-5 text-center bg-white text-neutral-400 max-md:px-5 max-md:max-w-full" role="navigation">
            <div className="flex overflow-hidden flex-wrap gap-8 justify-center max-w-full min-h-[34px] w-[598px]">
              {Object.keys(sections).map((item, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer ${activeItem === item ? 'text-neutral-950' : ''}`}
                  onClick={() => handleNavClick(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </nav>
  
          <main className="flex overflow-hidden flex-col flex-1 w-full bg-white w-full">
          <div className="flex flex-col px-8 py-5 w-full bg-white max-md:px-5 w-full">
            {sections[activeItem].map((section, index) => (
              <section key={index+section} className="flex flex-col w-full w-full mb-8">
                {/* <h2 className="text-xl font-semibold mb-4 text-black">Section {index + 1}</h2> */}
                <form className="flex flex-col justify-center p-5 w-full rounded-3xl border border-solid border-stone-300 max-md:max-w-full">
                  <div className="flex flex-col w-full max-md:max-w-full">

                  {(() => {
                  switch(activeItem) {
                    case "Contact Us":
                      return (
                        <>
                        <label htmlFor="title 1" className="text-black">Title 1</label>
                        <input
                          type="text"
                          label="title 1"
                          value={section.title1 || ''}
                          className="text-black flex-1 shrink gap-2 self-stretch px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px]"
                          onChange={(e) => handleInputChange(index, 'title1', e.target.value)}
                        />
                        <label htmlFor="title 2" className="text-black">Title 2</label>
                        <input
                          label="title 2"
                          value={section.title2 || ''}
                          className="text-black flex-1 shrink gap-2 self-stretch px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px]"
                          onChange={(e) => handleInputChange(index, 'title2', e.target.value)}
                        />
                        <label htmlFor="description" className="text-black">Description</label>
                        <textarea
                          placeholder="Enter description"
                          type="text"
                          className="text-black flex-1 shrink gap-2 self-stretch px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[128px]"
                          label="description"
                          value={section.description || ''}
                          onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                        />
                        <label htmlFor="address" className="text-black">Address</label>
                        <input
                          type="text"
                          label="address"
                          value={section.address || ''}
                          onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                          className="text-black flex-1 shrink gap-2 self-stretch px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px]"
                        />
                        <label htmlFor="phone_number" className="text-black">Phone Number</label>
                        <input
                          type='text'
                          label="phone_number"
                          value={section.phone || ''}
                          onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                          className="text-black flex-1 shrink gap-2 self-stretch px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px]"
                        />
                        <input
                          type="email"
                          label="Email"
                          value={section.email || ''}
                          onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                        />
                      </>
                      );
                    case "Product":
                      return (
                        <>
                          <div className="flex flex-col mt-4 w-full">
                            <label htmlFor="title1" className="text-sm font-medium tracking-normal leading-none text-black">
                              Title 1
                            </label>
                            <input
                              id="title1"
                              type="text"
                              value={section.title1 || ''}
                              onChange={(e) => handleInputChange(0, 'title1', e.target.value)}
                              className="flex-1 text-black shrink gap-2 self-stretch px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px]"
                            />
                          </div>
                          <div className="flex flex-col mt-4 w-full">
                            <label htmlFor="description1" className="text-sm font-medium tracking-normal leading-none text-black">
                              Description 1
                            </label>
                            <textarea
                              id="description1"
                              value={section.description1 || ''}
                              onChange={(e) => handleInputChange(0, 'description1', e.target.value)}
                              className="flex-1 text-black shrink gap-2 px-4 py-3 mt-1 text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[120px] w-full"
                            />
                          </div>
                          <div className="flex flex-col mt-4 w-full">
                            <label htmlFor="title2" className="text-sm font-medium tracking-normal leading-none text-black">
                              Title 2
                            </label>
                            <input
                              id="title2"
                              type="text"
                              value={section.title2 || ''}
                              onChange={(e) => handleInputChange(0, 'title2', e.target.value)}
                              className="flex-1 shrink text-black gap-2 self-stretch px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px]"
                            />
                          </div>
                          <div className="flex flex-col mt-4 w-full">
                            <label htmlFor="description2" className="text-sm text-black font-medium tracking-normal leading-none text-black">
                              Description 2
                            </label>
                            <textarea
                              id="description2"
                              value={section.description2 || ''}
                              onChange={(e) => handleInputChange(0, 'description2', e.target.value)}
                              className="flex-1 text-black shrink gap-2 px-4 py-3 mt-1 text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[120px] w-full"
                            />
                          </div>
                      </>
                      );
                    default:
                      return (
                        <>
                        {/* Original fields for other sections */}
                        <div className="flex gap-4 items-start w-full text-black max-md:max-w-full">
                          <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
                            <label htmlFor={`title-${index}`} className="text-sm font-medium tracking-normal leading-none">
                              Title
                            </label>
                            <input
                              id={`title-${index}`}
                              type="text"
                              value={section.title}
                              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                              className="flex-1 shrink gap-2 self-stretch px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 min-h-[48px]"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col mt-4 w-full min-h-[120px]">
                          <label htmlFor={`description-${index}`} className="text-sm font-medium tracking-normal leading-none text-black">
                            Description
                          </label>
                          <textarea
                            id={`description-${index}`}
                            value={section.description}
                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                            placeholder="Enter description"
                            className="flex-1 shrink gap-2 px-4 py-3 mt-1 text-base tracking-normal bg-white rounded-lg border border-solid border-stone-300 size-full text-neutral-500"
                          />
                        </div>
                        <div>
                          <label htmlFor={`image-${index}`} className="text-sm font-medium tracking-normal leading-none text-black">
                            Photo
                          </label>
                          <input
                            id={`image-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, index)}
                            className="file-input text- flex-1 gap-2 self-stretch px-4 py-3 mt-1 w-full text-base tracking-normal bg-white rounded-lg border border-dashed border-stone-300 min-h-[48px]"
                          />
                          <span className="text-xs text-gray-500">Size Maximum: 5 MB. Format file: PNG or JPG.</span>
                        </div>       
                      </>
                      );
                  }
                })()}
                  </div>
                </form>
              </section>
            ))}
  
              {/* <div className="flex justify-center mt-6">
                <button 
                  onClick={addSection}
                  className="px-6 py-3 text-base font-medium tracking-normal leading-none text-center text-white bg-green-900 rounded-lg border border-solid border-green-900 hover:bg-green-800 transition-colors duration-300"
                >
                  Add Section
                </button>
              </div> */}
  
              <div className="flex gap-4 justify-end mt-8 w-full max-md:flex-wrap max-md:max-w-full">
                <button className="justify-center px-4 py-3 text-base font-medium tracking-normal leading-none text-center text-black bg-white rounded-lg border border-solid border-stone-300 max-md:px-5 hover:bg-gray-100 transition-colors duration-300">
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="justify-center px-4 py-3 text-base font-medium tracking-normal leading-none text-center text-white bg-green-900 rounded-lg border border-solid border-green-900 max-md:px-5 hover:bg-green-800 transition-colors duration-300"
                >
                  Save
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }