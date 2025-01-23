import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import Shoes from "../../assets/shoes.png";
import {
  Airplay,
  Ambulance,
  ChevronLeftIcon,
  ChevronRightIcon,
  Sofa,
  Tv,
  Smartphone,
  ShirtIcon,
  Refrigerator,
  Coffee,
  Headphones,
  Footprints,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "Phones", label: "Phones", icon: Smartphone },
  { id: "Furniture", label: "Furniture", icon: Sofa },
  { id: "Health", label: "Health", icon: Ambulance },
  { id: "Shoes", label: "Shoes", icon: Footprints },
  { id: "Fashion", label: "Fashion", icon: ShirtIcon },
];

const brandsWithIcon = [
  { id: "Appliances", label: "Appliance", icon: Refrigerator },
  { id: "TV", label: "TVs", icon: Tv },
  { id: "Kitchen", label: "Kitchen", icon: Coffee },
  { id: "laptops", label: "laptop", icon: Airplay },
  { id: "accessories", label: "accessories", icon: Headphones },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col py-11 min-h-screen">
      <div className="relative w-full rounded-sm h-[170px] sm:h-[250px] lg:h-[380px]  overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-1 w- p-2 rounded-lg h-[160px] sm:h-[240px] lg:h-[480px] object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-4 bg-gray-50">
  <div className="container mx-auto px-3">
    <div className="grid grid-cols-5  sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4">
      {categoriesWithIcon && categoriesWithIcon.length > 0 ? (
        categoriesWithIcon.map((categoryItem) => (
          <div
            key={categoryItem.label}
            className="flex flex-col items-center"
          >
            <Card
              onClick={() =>
                handleNavigateToListingPage(categoryItem, "category")
              }
              className="cursor-pointer hover:shadow-lg transition-shadow"
              role="button"
              aria-label={`Navigate to ${categoryItem.label}`}
            >
              <CardContent className="flex flex-col items-center justify-center p-4">
                {categoryItem.icon ? (
                  <categoryItem.icon className=" mb-4 text-primary" />
                ) : (
                  <div className=" bg-gray-200" />
                )}
              </CardContent>
            </Card>
            <span className="font-bold mt-2 text-center">
              {categoryItem.label}
            </span>
          </div>
        ))
      ) : (
        <p className="col-span-5 text-center text-gray-500">
          No categories available.
        </p>
      )}
    </div>
  </div>
</section>

<section className="py-1 bg-gray-50">
  <div className="container mx-auto px-3">
    <div className="grid grid-cols-5  sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4">
      {brandsWithIcon && brandsWithIcon.length > 0 ? (
        brandsWithIcon.map((brandItem) => (
          <div
            key={brandItem.label}
            className="flex flex-col  items-center"
          >
            <Card
              onClick={() => handleNavigateToListingPage(brandItem, "brand")}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              role="button"
              aria-label={`Navigate to ${brandItem.label}`}
            >
              <CardContent className="flex flex-col items-center justify-center p-4">
                {brandItem.icon ? (
                  <brandItem.icon className="mb-4 text-primary" />
                ) : (
                  <div className=" bg-gray-200 rounded-full" />
                )}
              </CardContent>
            </Card>
            <span className="font-bold mt-2 text-center">
              {brandItem.label}
            </span>
          </div>
        ))
      ) : (
        <p className="col-span-5 text-center text-gray-500">
          No brands available.
        </p>
      )}
    </div>
  </div>
</section>


      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
