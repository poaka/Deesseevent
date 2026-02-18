import React from 'react';
import { HeroSection, FeaturesSection } from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import GallerySection from '@/components/home/GallerySection';
import TestimonialSection from '@/components/home/TestimonialSection';
import CTASection from '@/components/home/CTASection';

/**
 * Home Page Component
 * Main landing page for DEESSE EVENT
 */
const Home = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <FeaturesSection />
            <ServicesSection />
            <GallerySection />
            <TestimonialSection />
            <CTASection />
        </div>
    );
};

export default Home;
