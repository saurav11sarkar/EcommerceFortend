import { useNavigate, useParams } from "react-router";
import {
  useFetchProductByIdQuery,
  useUpdateproductMutation,
} from "../../../../redux/features/products/productApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextInputs from "../addProduct/TextInputs";
import UploadImages from "../addProduct/UploadImages";
import SelectInput from "../addProduct/SelectInput";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
  { label: "Skill Care", value: "skill-care" },
];

const colors = [
  { label: "Select Color", value: "" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Gold", value: "gold" },
  { label: "Blue", value: "blue" },
  { label: "Silver", value: "silver" },
  { label: "Beige", value: "beige" },
  { label: "Green", value: "green" },
];

const UpdatedProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    price: "",
    description: "",
    image: "",
  });

  const {
    data: productId,
    error: fetchError,
    isLoading: isProductLoading,
    refetch,
  } = useFetchProductByIdQuery(id);

  const [newImage, setNewImage] = useState(null);

  const productData = productId?.data;
  const {
    category,
    color,
    name,
    price,
    rating,
    image: imageURL,
    description,
  } = productData?.result || {};

  const [updateproduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateproductMutation();

  useEffect(() => {
    if (productData) {
      setProduct({
        name: name || "",
        category: category || "",
        color: color || "",
        price: price || "",
        description: description || "",
        image: imageURL || "",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImage = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      image: newImage ? newImage : product.image,
      author: user?._id,
    };

    try {
      await updateproduct({ id: id, ...updatedProduct }).unwrap();
      alert("Product updated successfully");
      await refetch();
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error("Faild to update product:", error);
    }
  };

  if (isProductLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error fetching product...</div>;

//   console.log(productData?.result);
  return (
    <div style={{ margin: "0 auto", marginTop: "32px" }} className="container">
      <h2 style={{ marginBottom: "24px" }} className="text-2xl font-bold">
        Update Product
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ marginBlockStart: "16px", marginBlock: "16px" }}
      >
        <TextInputs
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
          placeholder="Product name"
        />
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />

        <TextInputs
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
          placeholder="50"
        />

        <UploadImages
          name="image"
          id="image"
          value={newImage || product?.image}
          placeholder="Upload Image"
          setImage={handleImage}
        />

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="add-product-InputCSS"
            value={product.description}
            placeholder="Write a product description"
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit" className="add-product-btn">
            {isUpdating ? "updating..." : "updated product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatedProduct;
