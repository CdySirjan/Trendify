import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { assets } from "../assets/assets";
import { productAPI } from "../services/api";

const Add: React.FC = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [bestSeller, setBestSeller] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validate form
    if (!image1) {
      setError("At least one image is required");
      setLoading(false);
      return;
    }

    if (sizes.length === 0) {
      setError("At least one size must be selected");
      setLoading(false);
      return;
    }

    try {
      // Create FormData object
      const formData = new FormData();
      
      // Add images
      if (image1) formData.append('images', image1);
      if (image2) formData.append('images', image2);
      if (image3) formData.append('images', image3);
      if (image4) formData.append('images', image4);
      
      // Add other product details
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('price', price);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestSeller', bestSeller.toString());
      
      // Send to API
      await productAPI.addProduct(formData);
      
      setSuccess(true);
      resetForm();
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setName("");
    setDescription("");
    setCategory("");
    setSubCategory("");
    setPrice("");
    setSizes([]);
    setBestSeller(false);
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start w-full gap-3"
    >
      {/* Upload Images */}
      <div>
        <p className="mb-2 text-lg font-semibold">Upload Product Image(s)</p>
        <div className="flex gap-2">
          {[setImage1, setImage2, setImage3, setImage4].map((setImg, index) => {
            const img = [image1, image2, image3, image4][index];
            return (
              <label key={index} htmlFor={`image${index + 1}`}>
                <img
                  className="w-20 border-2 border-gray-500 rounded-lg cursor-pointer"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt="Upload"
                />
                <input
                  type="file"
                  id={`image${index + 1}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setImg)}
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full mt-2">
        <p className="mb-2 text-lg font-semibold">Product Item Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-500 rounded max-w-[500px]"
          type="text"
          placeholder="Enter Product Name"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full mt-2">
        <p className="mb-2 text-lg font-semibold">Product Item Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-500 rounded max-w-[500px]"
          placeholder="Enter Product Description"
          required
        />
      </div>

      {/* Category, Sub Category, Price */}
      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <div>
          <p className="mb-2 text-lg font-semibold">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-500 rounded max-w-[500px]"
            required
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 text-lg font-semibold">Product Sub Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-500 rounded max-w-[500px]"
            required
          >
            <option value="">Select Sub Category</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2 text-lg font-semibold">Product Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-500 rounded max-w-[500px]"
            type="number"
            placeholder="Enter Product Price"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 text-lg font-semibold">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size)
                    ? "bg-gray-500 text-white rounded-md"
                    : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <label htmlFor="bestSeller" className="ml-2 cursor-pointer">
          Add to Best Seller
        </label>
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="w-full p-2 mt-2 text-white bg-red-500 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="w-full p-2 mt-2 text-white bg-green-500 rounded">
          Product added successfully!
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col w-full gap-2 sm:flex-row sm:gap-8">
        <button
          type="submit"
          className="px-5 py-2 mt-2 text-white rounded-lg bg-slate-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
        <button
          type="button"
          className="px-5 py-2 mt-2 text-white rounded-lg bg-slate-700 disabled:bg-gray-400"
          onClick={resetForm}
          disabled={loading}
        >
          Reset Details
        </button>
      </div>
    </form>
  );
};

export default Add;
