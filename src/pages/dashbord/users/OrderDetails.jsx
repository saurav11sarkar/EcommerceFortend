import { useSelector } from "react-redux";
import { useGetOrderByIdQuery } from "../../../redux/features/orders/orderApi";
import { useParams } from "react-router";
import TimeLineStep from "../../../components/TimeLineStep";

const OrderDetails = () => {
  //   const { data: user } = useSelector((state) => state.auth);
  const { orderId } = useParams();

  const { data: userData, error, isLoading } = useGetOrderByIdQuery(orderId);
  const order = userData?.data;
  console.log(order);
  if (isLoading) return <div>Lodding...</div>;
  if (error) return <div>No order data</div>;

  const isCompleted = (status) => {
    const statuses = [
      "pending",
      "processing",
      "shipped",
      "completed",
      "failed",
    ];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;

  const steps = [
    {
      status: "pending",
      label: "Pending",
      description: "Your order has been created and is awaiting processing.",
      icon: {
        iconName: "time-line",
        bgColor: "red-500",
        textColor: "gray-800",
      },
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is currently being processed.",
      icon: {
        iconName: "loader-line",
        bgColor: "yellow-700",
        textColor: "yellow-800",
      },
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been shipped.",
      icon: {
        iconName: "truck-line",
        bgColor: "blue-800",
        textColor: "blue-800",
      },
    },
    {
      status: "completed",
      label: "Completed",
      description: "Your order has been successfully completed.",
      icon: {
        iconName: "check-line",
        bgColor: "green-800",
        textColor: "green-900",
      },
    },
    // {
    //   status: "failed",
    //   label: "Failed",
    //   description: "Your order has been Failed.",
    //   icon: {
    //     iconName: "check-line",
    //     bgColor: "red-800",
    //     textColor: "white-900",
    //   },
    // },
  ];

  return (
    <section style={{ padding: "24px" }} className="section__container rounded">
      <h2 style={{ marginBottom: "16px" }} className="text-2xl font-semibold">
        Payment {order?.status}
      </h2>
      <p style={{ marginBottom: "16px" }}>Order Id: {order?.orderId}</p>
      <p style={{ marginBottom: "32px" }}>Status: {order?.status}</p>

      <ol className="sm:flex items-center relative">
        {steps.map((step, index) => (
          <TimeLineStep
            key={index}
            order={order}
            step={step}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === step.length - 1}
            icon={step.icon}
            description={step.description}
          />
        ))}
      </ol>
    </section>
  );
};

export default OrderDetails;
