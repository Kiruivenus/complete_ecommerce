import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalCartAmount);

  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      {/* Scrollable Cart Items */}
      <div className="mt-4 flex-1 overflow-y-auto space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.id} cartItem={item} />
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty!</p>
        )}
      </div>

      {/* Fixed Total and Checkout Button */}
      <div className="bg-white border-t p-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold">Total</span>
          <span className="font-bold">{formattedTotal}</span>
        </div>
        <Button
          onClick={() => {
            if (cartItems.length > 0) {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }
          }}
          className="w-full"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
