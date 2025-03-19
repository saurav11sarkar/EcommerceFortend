import { useDispatch } from "react-redux";
import OrderSummery from "./OrderSummery";
import {
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";

const CartModel = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleQuentity = (type, id) => {
    const payload = { type, id };
    dispatch(updateQuantity(payload));
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ id }));
  };

  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black opacity-80 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms", opacity: 0.85 }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 300ms cubic-bezier(0.25,0.46,,0.45,0.94)",
        }}
      >
        <div style={{ padding: "16px", marginTop: "16px" }}>
          <div
            className="flex justify-between items-center"
            style={{ marginBottom: "16px" }}
          >
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <button
              onClick={() => onClose()}
              className="text-gray-600 hover:text-gray-900"
            >
              <i
                className="ri-xrp-fill bg-black text-white"
                style={{ padding: "4px" }}
              ></i>
            </button>
          </div>

          {/* cart details */}
          <div className="cart-item">
            {products.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              products.map((item, index) => (
                <div
                  style={{ padding: "8px", marginBottom: "16px" }}
                  key={index}
                  className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4"
                >
                  <div className="flex items-center">
                    <span
                      style={{ marginRight: "16px", padding: "0px 4px" }}
                      className=" bg-primary text-white rounded-full"
                    >
                      0{index + 1}
                    </span>
                    <img
                      src={item.image}
                      alt=""
                      className="w-12 h-12 object-cover"
                      style={{
                        marginRight: "16px",
                        width: "48px",
                        height: "48px",
                      }}
                    />

                    <div>
                      <h5 className="text-lg font-medium">{item.name}</h5>
                      <p className="text-gray-600 text-sm">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>

                    <div
                      style={{ marginTop: "8px" }}
                      className="flex flex-row md:justify-start justify-end items-center"
                    >
                      <button
                        onClick={() => handleQuentity("decrement", item._id)}
                        style={{ padding: "0px 6px", marginLeft: "24px" }}
                        className="size-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                      >
                        -
                      </button>
                      <span
                        style={{ padding: "0px 8px", margin: "0px 4px" }}
                        className=""
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuentity("increment", item._id)}
                        style={{ padding: "0px 6px" }}
                        className="size-6 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                      >
                        +
                      </button>

                      <div style={{ marginLeft: "20px" }}>
                        <button
                          onClick={(e) => handleRemove(e, item._id)}
                          className="text-red-500 hover:text-red-800"
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* products */}
          {products.length > 0 && <OrderSummery />}
        </div>
      </div>
    </div>
  );
};

export default CartModel;
