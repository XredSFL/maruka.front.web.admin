// src/app/dashboard/components/category-product/CategoryProductMainSection.jsx
'use client';
import React, { useState, useEffect, useCallback,useRef } from 'react';

function CategoryActionMenu({ category, position, onEdit, onDelete, onClose }) {
  if (!category) return null;

  return (
    <div 
      className="absolute z-50 bg-white rounded-lg shadow-lg p-2 w-32"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <button
        onClick={() => onEdit(category)}
        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md text-black"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(category)}
        className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md text-red-600"
      >
        Delete
      </button>
    </div>
  );
}

function TableRow({ id, companyName, address, photo, description, linkMap, createdAt, updatedAt }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
      <div className="grid grid-cols-4 w-full bg-white border-b border-solid border-b-zinc-100  min-h-[70px] w-full">
        <div className="span-col-1 px-3 py-4 h-full text-sm tracking-normal min-w-[240px]" onClick={() => setIsModalOpen(true)}>
          <p style={{color:'#357049'}}>{companyName}</p>
        </div>
        <div className="span-col-1 px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px]" onClick={() => setIsModalOpen(true)}>
        <p style={{color:'#357049'}}>{address}</p>
        </div>
        <div className="span-col-1 px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px]" onClick={() => setIsModalOpen(true)}>
          {photo ? (
            <img 
              src={photo} 
              alt={companyName} 
              className="w-10 h-10 object-cover"
            />
          ) : (
            'No photo'
          )}
        </div>
        <div className="flex span-col-1 gap-2.5 items-center px-3 py-4 w-11 h-full">
            <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2399b6a0150de287525709f958419b7b533111b37e7393abef2b8847372ad4e6?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                  alt="Actions"
                  className="object-contain self-stretch ms-auto w-5 aspect-square"
            />
        </div>
        {isModalOpen && (
        <GroupCompanyDetailsModal
          companyData={{ id, companyName, address, photo, description, linkMap, createdAt, updatedAt }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      </div>
    );
  }

  
function CategoryProductMainSection() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', total_product: '' });
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category-product');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddOrUpdateCategory = useCallback(async (categoryData) => {
    const url = editingCategory 
      ? `/api/category-product/${editingCategory.id}` 
      : '/api/category-product';
    const method = editingCategory ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to save category');
      }

      await fetchCategories(); // Refresh the category list
      setIsAddingCategory(false);
      setEditingCategory(null);
      setNewCategory({ name: '', total_product: '' });
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category. Please try again.');
    }
  }, [editingCategory]);

  const handleDelete = useCallback(async (category) => {
    if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
      try {
        const response = await fetch(`/api/category-product/${category.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchCategories(); // Refresh the category list
        } else {
          throw new Error('Failed to delete category');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please try again.');
      }
    }
    setSelectedCategory(null);
  }, []);

  const handleEdit = useCallback((category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, total_product: category.total_product });
    setIsAddingCategory(true);
    setSelectedCategory(null);
  }, []);

  const handleCategoryAction = useCallback((category, event) => {
    event.stopPropagation();
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.right + window.scrollX -100,
    });
    setSelectedCategory(category);
  }, []);

  return (
    <div className="flex overflow-hidden overflow-x-auto flex-col pt-8 mt-12 w-full bg-white rounded-3xl border border-solid shadow-2xl border-neutral-200 max-md:mt-10 max-md:max-w-full">
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
                aria-label="Add Global Network"
                onClick={() => {
                  setIsAddingCategory(true);
                  setEditingCategory(null);
                  setNewCategory({ name: '', total_product: '' });
                }}
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

      <div className="grid-cols-3 grid w-full bg-white border-b px-8 border-solid border-b-zinc-100 min-h-[70px]">
        <div className="span-col-1 shrink py-4 h-full text-sm tracking-normal min-w-[240px] text-zinc-400">
          Category Name
        </div>
        <div className="span-col-1 flex justify-center shrink px-3 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px] text-zinc-400">
          Total Product
        </div>
        <div className="span-col-1 flex items-center px-3 py-4 w-11 h-full opacity-0">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2399b6a0150de287525709f958419b7b533111b37e7393abef2b8847372ad4e6?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
            alt="Actions"
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="flex flex-col w-full bg-white border-b border-solid border-b-zinc-100 min-h-[70px] w-full">
          <div className="grid grid-cols-3 justify-between px-8 py-4 w-full max-md:flex-wrap max-md:px-5 w-full">
            <div className="span-col-1 items-center">
              <div className="text-base font-medium text-zinc-900">{category.name}</div>
            </div>
            <div className="span-col-1 flex justify-center items-center">
              <div className="text-base font-medium text-zinc-500">{category.total_product} Product</div>
            </div>
            <button
                onClick={(event) => handleCategoryAction(category, event)}
                className="focus:outline-none product-action-button span-col-1 flex"
              >
                <img
                  loading="lazy"
                  src="/img/icons/hamburger_button.svg"
                  alt="Category actions"
                  className="object-contain self-stretch ms-auto w-5 aspect-square"
                />
              </button>
          </div>
        </div>
      ))}

      {isAddingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b px-4 py-2">
              <h2 className="text-lg font-bold text-black">
                {editingCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsAddingCategory(false);
                  setEditingCategory(null);
                  setNewCategory({ name: '', total_product: '' });
                }}
              >
                &times;
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="categoryName"
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter Category Name"
                  className="mt-1 text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="p-4">
              <label
                htmlFor="total_products"
                className="block text-sm font-medium text-gray-700"
              >
                Total Products <span className="text-red-500">*</span>
              </label>
              <input
                id="total_products"
                type="number"
                onChange={(e) => setNewCategory({ ...newCategory, total_product: e.target.value })}
                required
                min="0"
                placeholder="Enter total products"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>

            <div className="flex justify-end space-x-2 border-t px-4 py-2">
              <button
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => {
                  setIsAddingCategory(false);
                  setEditingCategory(null);
                  setNewCategory({ name: '', total_product: '' });
                }}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                onClick={() => handleAddOrUpdateCategory(newCategory)}
              >
                {editingCategory ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      <CategoryActionMenu
        category={selectedCategory}
        position={menuPosition}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClose={() => setSelectedCategory(null)}
      />
    </div>
  );
}

export default CategoryProductMainSection;