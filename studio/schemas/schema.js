// We import object and document schemas

// documents
import general from "./documents/general";
import product from "./documents/product";
import article from "./documents/article";
import about from "./documents/about";
import faq from "./documents/faq";
import faqQuestion from "./documents/faqQuestion";
import faqCategory from "./documents/faqCategory";
import shops from "./documents/shops";
import location from "./documents/location";
import onlineShop from "./documents/onlineShop";
import shopsCity from "./documents/shopsCity";
import shopsCountry from "./documents/shopsCountry";
import shopsCategory from "./documents/shopsCategory";
import articlesCategory from "./documents/articlesCategory";
import productCategory from "./documents/productCategory";
import frontpage from "./documents/frontpage";
import contactpage from "./documents/contactpage";
import productpage from "./documents/productpage";
import articlepage from "./documents/articlepage";
import person from "./documents/person";
import reseller from "./documents/reseller";
import privacy from "./documents/privacy";

// objects
import body from "./objects/body";
import figure from "./objects/figure";
import figureTwoColumn from "./objects/figureTwoColumn";
import imageGallery from "./objects/imageGallery";
import imageAndText from "./objects/imageAndText";
import simpleBody from "./objects/simpleBody";
import contact from "./objects/contact";
import newsletter from "./objects/newsletter";
import seo from "./objects/seo";
import shop from "./objects/shop";
import pageHeader from "./objects/pageHeader";
import pageContent from "./objects/pageContent";
import textBlock from "./objects/textBlock";
import bodyBlock from "./objects/bodyBlock";
import productInfo from "./objects/productInfo";
import customFeatureSection from "./objects/customFeatureSection";

// localized objects
import localeString from "./objects/localeString";
import localeText from "./objects/localeText";
import localeSimpleBody from "./objects/localeSimpleBody";
import localeBody from "./objects/localeBody";
import localeFigure from "./objects/localeFigure";
import localePageContent from "./objects/localePageContent";

// the complete schema
export default [
  // documents
  general,
  product,
  article,
  about,
  faq,
  faqQuestion,
  faqCategory,
  shops,
  location,
  onlineShop,
  shopsCity,
  shopsCountry,
  shopsCategory,
  articlesCategory,
  productCategory,
  frontpage,
  contactpage,
  productpage,
  articlepage,
  person,
  reseller,
  privacy,
  // objects
  // When added to this list, object types can be used as
  // { type: 'typename' } in other document schemas
  body,
  figure,
  figureTwoColumn,
  imageGallery,
  imageAndText,
  simpleBody,
  contact,
  newsletter,
  seo,
  shop,
  pageHeader,
  pageContent,
  textBlock,
  bodyBlock,
  productInfo,
  customFeatureSection,
  // localized objects
  localeString,
  localeText,
  localeSimpleBody,
  localeBody,
  localeFigure,
  localePageContent,
];
