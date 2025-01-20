import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";

function MpesaPayment() {
  const { cartItems } = useSelector((state) => state.shopCart); // Access cart items from Redux store
  const [phone, setPhone] = useState("");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const { toast } = useToast();

  // Calculate the total cart amount using useMemo
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

  const payHandler = (event) => {
    event.preventDefault();

    // Validation for phone number and cart items
    if (!phone) {
      toast({
        title: "Phone number is required.",
        variant: "destructive",
      });
      return;
    }
    if (!cartItems?.items?.length) {
      toast({
        title: "Your cart is empty. Please add items to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Set payment processing state
    setIsPaymentProcessing(true);

    // Make API call to initiate M-Pesa payment
    Axios.post(`${import.meta.env.VITE_API_URL}/token`, {
      amount: totalCartAmount,
      phone,
    })
      .then((res) => {
        console.log("Payment successful", res);
        toast({
          title: "Payment initiated successfully!",
          description: "Please complete the payment on your phone.",
          variant: "default",
        });
        setIsPaymentProcessing(false);
      })
      .catch((error) => {
        console.error("Payment failed", error);
        toast({
          title: "Payment failed.",
          description: "Please try again.",
          variant: "destructive",
        });
        setIsPaymentProcessing(false);
      });
  };

  return (
    <Card className="p-10">
      <CardHeader className="p-11">
        <h1 className="text-2xl">
          Pay with <span className="text-green-600 p-2 font-bold">M-Pesa</span>
        </h1>
        <form className="flex flex-col space-y-7" onSubmit={payHandler}>
          <input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-slate-100 text-center rounded-xl py-3"
            type="tel"
            required
          />
          <div className="bg-slate-100 text-center py-3 rounded-xl">
            <span className="text-gray-500">Total Amount: </span>
            <span className="font-bold text-black">${totalCartAmount}</span>
          </div>
          <Button
            type="submit"
            className="bg-green-600 text-white px-2 py-3 rounded-2xl"
            disabled={isPaymentProcessing}
          >
            {isPaymentProcessing ? "Processing Payment..." : "Pay Now"}
          </Button>
        </form>
      </CardHeader>
    </Card>
  );
}

export default MpesaPayment;
