import Navbar from "../../components/navbar/Navbar";
import AdminOrdersView from "../../components/DashboardPage/AdminOrdersView";

const Orders = () => {
  return (
    <div>
      <Navbar />
      <AdminOrdersView showSummary={false} />
    </div>
  );
};

export default Orders;
