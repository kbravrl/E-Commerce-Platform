import InputField from "./InputField";

const ProductForm = ({ handleChange, handleFileChange }) => {
  return (
    <>
      <InputField id="name" label="Name" type="text" onChange={handleChange} />
      <InputField
        id="brand"
        label="Brand"
        type="text"
        onChange={handleChange}
      />
      <div>
        <label htmlFor="price" className="text-gray-800">
          Price
        </label>
        <input
          type="number"
          id="price"
          min="0"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-2"
        />
      </div>
      <div>
        <label htmlFor="inventory" className="text-gray-800">
          Inventory
        </label>
        <input
          type="number"
          id="inventory"
          min="0"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-2"
        />
      </div>
      <div>
        <label htmlFor="description" className="text-gray-800">
          Description
        </label>
        <textarea
          id="description"
          required
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-2"
          rows={4}
        ></textarea>
      </div>
      <InputField
        id="category"
        label="Category"
        type="text"
        onChange={handleChange}
      />
      <div>
        <label
          htmlFor="images"
          className="block text-gray-700 font-medium mb-1"
        >
          Images
        </label>
        <input
          type="file"
          id="images"
          multiple
          onChange={handleFileChange}
          className="
        block w-full mb-4
        text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-gray-700
        hover:file:bg-blue-100"
        />
      </div>
    </>
  );
};

export default ProductForm;
