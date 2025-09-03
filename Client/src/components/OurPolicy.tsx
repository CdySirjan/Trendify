import React from "react";
import { assets } from "../assets/assets";

const OurPolicy: React.FC = () => {
  return (
    <div className="flex flex-col justify-around gap-12 py-8 text-xs text-center text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base">
      {/* Return & Exchange */}
      <div>
        <img
          src={assets.exchange_icon}
          className="w-12 m-auto mb-3"
          alt="Exchange Policy"
        />
        <p className="mb-2 font-semibold">Easy Return & Exchange Policy</p>
        <p className="text-gray-400">Easy Returns/exchanges within 10 days.</p>
      </div>

      {/* Quality Policy */}
      <div>
        <img
          src={assets.quality_icon}
          className="w-12 m-auto mb-3"
          alt="Quality Policy"
        />
        <p className="mb-2 font-semibold">Our Quality Policy</p>
        <p className="text-gray-400">Trendify ensures top-quality products.</p>
      </div>

      {/* Customer Support */}
      <div>
        <img
          src={assets.support_img}
          className="w-12 m-auto mb-3"
          alt="Customer Support"
        />
        <p className="mb-2 font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We support via email, phone, or chat.</p>
      </div>
    </div>
  );
};

export default OurPolicy;
