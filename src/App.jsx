import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense } from "react";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import Loading from "./components/loading/Loading";
import ApiLoader from "./components/loading/ApiLoader";
const Layout = lazy(() => import("./layout/Layout"));
const ShopPage = lazy(() => import("./pages/shopPage/ShopPage"));
const HomePage = lazy(() => import("./pages/home/Home"));
const ProductDetailsPage = lazy(() =>
  import("./pages/productDetails/ProductDetails")
);
const AdminOrdersPage = lazy(() => import("./pages/adminOrder/AdminOrderPage"));
const AboutUsPage = lazy(() => import("./pages/aboutusPage/AboutUsPage"));
const ViewCartPage = lazy(() => import("./pages/viewCartPage/ViewCartPage"));
const WishlistPage = lazy(() => import("./pages/wishlistPage/WishListPage"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminProductPage = lazy(() =>
  import("./pages/adminProductPage/AdminProductPage")
);
const AdminCreateFormPage = lazy(() =>
  import("./pages/adminCreateForm/AdminCreateFormPage")
);
const NotFound = lazy(() => import("./pages/notFound/NotfoundPage"));
import JewelryCareGuidePage from "./pages/helpPage/jewelryCareGuidePage";
import TermsAndConditionPage from "./pages/helpPage/TermsAndConditionPage";
import ReturnAndExchangePage from "./pages/helpPage/ReturnAndExchangePage";
import PrivacyPolicyPage from "./pages/helpPage/PrivacyPolicyPage";
import ShipingPolicyPage from "./pages/helpPage/ShippingPage";
import ContactUsPage from "./pages/contactusPage/ContactUsPage";
import FaqPage from "./pages/faqPage/FaqPage";
import AdminInvoicePage from "./pages/adminInvoice/AdminInvoicePage";
import GenerateInvoiceForm from "./components/admin/GenerateInvoiceForm";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Tell pdfjs where to load the worker file from (CDN)
function App() {


  return (
    <>
      <ToastContainer />
      <ApiLoader />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="product/:category/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="shop" element={<ShopPage />} />
            <Route path="aboutus" element={<AboutUsPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route
              path="viewcart"
              element={
                <ProtectedRoute>
                  <ViewCartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="wishlist"
              element={
                <ProtectedRoute>
                  <WishlistPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="jewelry-careguide"
              element={<JewelryCareGuidePage />}
            />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditionPage />}
            />
            <Route
              path="return-and-exchange"
              element={<ReturnAndExchangePage />}
            />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="shiping" element={<ShipingPolicyPage />} />
            <Route path="contact-us" element={<ContactUsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route
              path="products"
              element={
                <AdminProtectedRoute>
                  <AdminProductPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="create-product"
              element={
                <AdminProtectedRoute>
                  <AdminCreateFormPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="order"
              element={
                <AdminProtectedRoute>
                  <AdminOrdersPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="invoice"
              element={
                <AdminProtectedRoute>
                  <AdminInvoicePage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="generate-invoice"
              element={
                <AdminProtectedRoute>
                  <GenerateInvoiceForm />
                </AdminProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
