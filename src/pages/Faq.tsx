
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { faqData, getFilteredFAQs, hasSearchResults } from "@/components/faq/FaqData";
import FaqHeader from "@/components/faq/FaqHeader";
import FaqQuickLinks from "@/components/faq/FaqQuickLinks";
import FaqCategories from "@/components/faq/FaqCategories";
import FaqContact from "@/components/faq/FaqContact";

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter FAQ based on search query
  const filteredFAQs = getFilteredFAQs(searchQuery, faqData);
  const hasResults = hasSearchResults(filteredFAQs);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section with Search */}
      <FaqHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Quick Links */}
      <FaqQuickLinks />

      {/* FAQ Content */}
      <FaqCategories 
        faqData={faqData}
        filteredFAQs={filteredFAQs}
        hasResults={hasResults}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Contact Section */}
      <FaqContact />

      <Footer />
    </div>
  );
};

export default Faq;
