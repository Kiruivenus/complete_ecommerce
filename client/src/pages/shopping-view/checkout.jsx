import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import Axios from "axios";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal"); // Default method is PayPal
  const [phone, setPhone] = useState(""); // For M-Pesa phone number
  const { toast } = useToast();
  const dispatch = useDispatch();

  const totalCartAmount = useMemo(() => {
    if (cartItems?.items?.length > 0) {
      return cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
            currentItem?.quantity,
        0
      );
    }
    return 0;
  }, [cartItems]);

  const mpesaAmount = useMemo(() => totalCartAmount * 130, [totalCartAmount]);

  const validateCheckout = () => {
    if (!cartItems?.items?.length) {
      toast({ title: "Your cart is empty. Please add items to proceed.", variant: "destructive" });
      return false;
    }
    if (!currentSelectedAddress) {
      toast({ title: "Please select an address to proceed.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handlePayPalPayment = () => {
    if (!validateCheckout()) return;

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        toast({ title: "Payment failed.", description: "Please try again.", variant: "destructive" });
        setIsPaymentStart(false);
      }
    });
  };

  const handleMpesaPayment = (event) => {
    event.preventDefault();

    if (!validateCheckout() || !phone) {
      if (!phone) {
        toast({ title: "Phone number is required for M-Pesa payment.", variant: "destructive" });
      }
      return;
    }

    // Create the order before initiating the M-Pesa payment
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "mpesa",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);

        // Initiate the M-Pesa payment
        Axios.post(`${import.meta.env.VITE_API_URL}/token`, {
          amount: mpesaAmount,
          phone,
        })
          .then((res) => {
            // M-Pesa payment initiated successfully
            toast({
              title: "Payment initiated successfully!",
              description: "Please complete the payment on your phone.",
              variant: "default",
            });

            // Redirect to M-Pesa checkout page
            window.location.href = "/shop/mpesa-checkout";

            setIsPaymentStart(false);
          })
          .catch((error) => {
            toast({ title: "Payment failed.", description: "Please try again.", variant: "destructive" });
            setIsPaymentStart(false);
          });
      } else {
        toast({ title: "Order creation failed.", description: "Please try again.", variant: "destructive" });
        setIsPaymentStart(false);
      }
    });
  };

  // Ensure redirection happens only when using PayPal
  if (paymentMethod === "paypal" && approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col py-9">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.map((item, index) => (
            <UserCartItemsContent key={item.productId || index} cartItem={item} />
          ))}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <div className="flex flex-col space-y-4">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />
                Pay with PayPal
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mpesa"
                  checked={paymentMethod === "mpesa"}
                  onChange={() => setPaymentMethod("mpesa")}
                />
                Pay with M-Pesa
              </label>
            </div>
            {paymentMethod === "mpesa" && (
              <div className="mt-4">
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-slate-100 text-center rounded-xl py-3 w-full"
                />
                <div className="mt-2">
                  <span className="text-gray-500">M-Pesa Amount: </span>
                  <span className="font-bold text-black">KES{mpesaAmount}</span>
                </div>
                <Button
                  onClick={handleMpesaPayment}
                  className="bg-green-600 text-white w-full mt-4"
                  disabled={isPaymentStart}
                >
                  {isPaymentStart ? "Processing M-Pesa Payment..." : "Pay Now"}
                </Button>
              </div>
            )}
            {paymentMethod === "paypal" && (
              <Button
                onClick={handlePayPalPayment}
                className="bg-blue-600 text-white w-full mt-4"
                disabled={isPaymentStart}
              >
                {isPaymentStart ? "Processing PayPal Payment..." : "Checkout with PayPal"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
