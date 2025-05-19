// src/app/dashboard/components/product/ProductMainSection.jsx
'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
function PaginationButton({ text, isActive = false, onClick }) {
  return (
    <button
      className={`px-3 py-1 text-sm rounded-md ${
        isActive
          ? 'bg-green-600 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
function ActionMenu({ item, position, onEdit, onDelete, onClose }) {
  if (!item) return null;

  return (
    <div 
      className="absolute z-50 bg-white rounded-lg shadow-lg p-2 w-32"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <button
        onClick={() => onEdit(item)}
        className="block w-full text-left px-2 py-1 text-black text-sm hover:bg-gray-100 rounded-md"
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
// src/app/dashboard/components/product/AddProductModal.jsx
function AddProductModal({ isOpen, onClose, onSave, categories, editingProduct }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState([]);
  const [models, setModels] = useState(['']);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingProduct) {
      setProductName(editingProduct.name);
      setCategory(editingProduct.category_id);
      setDescription(editingProduct.description);
      setModels(editingProduct.models ? editingProduct.models.split(',') : ['']);
      // For media, we might need to fetch the existing files or just prepare for new uploads
    } else {
      // Reset form when not editing
      setProductName('');
      setCategory('');
      setDescription('');
      setMedia([]);
      setModels(['']);
    }
  }, [editingProduct]);

  const handleMediaUpload = (event) => {
    const files = Array.from(event.target.files);
    setMedia(prevMedia => [...prevMedia, ...files]);
  };

  const handleAddModel = () => {
    setModels(prevModels => [...prevModels, '']);
  };

  const handleModelChange = (index, value) => {
    const newModels = [...models];
    newModels[index] = value;
    setModels(newModels);
  };

  const handleSubmit = useCallback(() => {
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('category_id', category);
    formData.append('description', description);
    models.forEach((model, index) => {
      if (model.trim() !== '') {
        formData.append(`models[]`, model.trim());
      }
    });
    media.forEach((file, index) => {
      formData.append(`media[]`, file);
    });

    onSave(formData);
  }, [productName, category, description, models, media, onSave]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[700px] rounded-lg shadow-lg p-8">
        <div className="flex flex-wrap gap-5 justify-between w-full max-w-[624px] max-md:mr-2.5 max-md:max-w-full">
        <h2 className="text-lg font-bold text-black">
            {editingProduct ? 'Edit Product' : 'Add Product'}
          </h2>
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

        <div className="mt-4 space-y-4">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter Product Name"
              className="mt-1 text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Photo/Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo / Video Product <span className="text-red-500">*</span>
            </label>
            <div 
              className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md py-8 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <p className="text-sm">Drop or Browse file</p>
              <p className="text-xs">
                Size Maximum: 5 GB. Format file: MP4, PNG, or JPG.
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleMediaUpload}
              multiple
              accept="image/*,video/*"
              className="hidden"
            />
            <div className="mt-2">
              {media.map((file, index) => (
                <p key={index} className="text-sm text-gray-600">{file.name}</p>
              ))}
              {editingProduct && editingProduct.media_paths && (
                <p className="text-sm text-gray-600">Existing media: {editingProduct.media_paths}</p>
              )}
            </div>
            <button 
              type="button"
              className="mt-2 text-sm text-green-600 hover:underline"
              onClick={() => fileInputRef.current.click()}
            >
              Add Photo / Video Product +
            </button>
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model <span className="text-red-500">*</span>
            </label>
            {models.map((model, index) => (
              <input
                key={index}
                type="text"
                value={model}
                onChange={(e) => handleModelChange(index, e.target.value)}
                className="mt-1 text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
            <button 
              type="button"
              className="mt-2 text-sm text-green-600 hover:underline"
              onClick={handleAddModel}
            >
              Add Model +
            </button>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              className="mt-1 text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 border-t px-4 py-2">
          <button
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
            onClick={handleSubmit}
          >
            {editingProduct ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductMainSection() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const paginationNumbers = [1, 2, 3, 4, 5];
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const actionButtonRef = useRef(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category-product');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedProduct && !event.target.closest('.product-action-button')) {
        setSelectedProduct(null);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedProduct]);

  const handleProductAction = useCallback((product, event) => {
    event.stopPropagation();
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX - 100,
    });
    setSelectedProduct(product);
  }, []);

  const handleEdit = useCallback((product) => {
    setEditingProduct(product);
    setIsAddingProduct(true);
    setSelectedProduct(null);
  }, []);

  const handleDelete = useCallback(async (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        const response = await fetch(`/api/products/${product.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchProducts(); // Refresh the product list
        } else {
          throw new Error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
    setSelectedProduct(null);
  }, []);

  const handleAddOrUpdateProduct = useCallback(async (formData) => {
    const url = editingProduct 
      ? `/api/products/${editingProduct.id}` 
      : '/api/products';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      await fetchProducts(); // Refresh the product list
      setIsAddingProduct(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  }, [editingProduct, fetchProducts]);

  const handleAddProduct = useCallback(async (formData) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      await fetchProducts(); // Refresh the product list
      setIsAddingProduct(false);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  }, []);

  const handleCategoryAction = useCallback((category, event) => {
      event.stopPropagation();
      const buttonRect = event.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX - 100,
      });
      setSelectedProduct(category);
    }, []);

  return (
    <div className="flex overflow-hidden overflow-x-auto flex-col pt-8 mt-12 w-full bg-white rounded-3xl border border-solid shadow-2xl border-neutral-200 max-md:mt-10 w-full h-100%" >
      {/* header */}
      <div className="flex flex-wrap justify-between items-center px-3 mx-4 max-md:mr-2.5 max-md:max-w-full">
        <div className="flex-1 shrink self-stretch my-auto text-2xl font-semibold tracking-tight text-black min-w-[240px] max-md:max-w-full">
          Product
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
            onClick={() => setIsAddingProduct(true)}
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
      
      <div className="grid grid-cols-6 w-full bg-white border-b px-8 border-solid border-b-zinc-100 min-h-[70px] w-full">
        <div className="span-col-1 py-4 h-full text-sm tracking-normal min-w-[240px] text-zinc-400">
          Product Name
        </div>
        <div className="span-col-1 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px] text-zinc-400">
          Category
        </div>
        <div className="span-col-1 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px] text-zinc-400">
          Photo/Video
        </div>
        <div className="span-col-1 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px] text-zinc-400">
          Model
        </div>
        <div className="span-col-1 py-4 h-full text-sm tracking-normal whitespace-nowrap min-w-[240px] text-zinc-400">
          Description
        </div>
        <div className="flex span-col-1 gap-2.5 items-center px-3 py-4 w-11 h-full opacity-0">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2399b6a0150de287525709f958419b7b533111b37e7393abef2b8847372ad4e6?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
            alt="Actions"
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        </div>
      </div>
      {products.map((item) => (
        <div key={item.id} className="flex flex-col w-full bg-white border-b border-solid border-b-zinc-100 min-h-[70px] w-full">
          <div className="grid grid-cols-6 justify-between px-8 py-4 w-full max-md:flex-wrap max-md:px-5 w-full">
            <div className="span-col-1  items-center">
              <div className="text-base font-medium text-zinc-900">{item.name}</div>
            </div>
            <div className="span-col-1 items-center">
              <div className="text-base font-medium text-zinc-900">{item.category_name}</div>
            </div>
            <div className="span-col-1 items-center">
            {item.media_paths?.split(',')[0] && (
              (() => {
                const mediaPath = item.media_paths.split(',')[0];
                const fileExtension = mediaPath.split('.').pop().toLowerCase();
                
                if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(fileExtension)) {
                  return <img src={mediaPath} alt={item.name} className="w-10 h-10 object-cover" />;
                } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
                  return (
                    <video className="w-10 h-10 object-cover">
                      <source src={mediaPath} type={`video/${fileExtension}`} />
                      Your browser does not support the video tag.
                    </video>
                  );
                } else {
                  return <div className="w-10 h-10 bg-gray-200 flex items-center justify-center">Unsupported</div>;
                }
              })()
            )}
            </div>
            <div className="span-col-1 items-center">
              <div className="text-base font-medium text-zinc-900">{item.models?.split(',').join(', ')}</div>
            </div>
            <div className="span-col-1 items-center">
              <div className="text-base font-medium text-zinc-900">{item.description}</div>
            </div>

            <button
                onClick={(event) => handleCategoryAction(item, event)}
                className="focus:outline-none product-action-button span-col-1"
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

      <ActionMenu
        item={selectedProduct}
        position={menuPosition}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClose={() => setSelectedProduct(null)}
      />

      {/* <div className="flex justify-between items-center w-full px-6 py-4">
        <div className="flex items-center">
          <span className="mr-4 text-sm text-gray-600">
            Showing {products.length} of {products.length} entries
          </span>
          <nav className="flex gap-2">
            <PaginationButton text="<" />
            {paginationNumbers.map((num) => (
              <PaginationButton
                key={num}
                text={num.toString()}
                isActive={num === 1}
                />
              ))}
              <PaginationButton text=">" />
            </nav>
          </div>
        </div> */}
  
        <AddProductModal 
          isOpen={isAddingProduct}
          onClose={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
          onSave={handleAddOrUpdateProduct}
          categories={categories}
          editingProduct={editingProduct}
        />
      </div>
    );
  }
  
  export default ProductMainSection;
                