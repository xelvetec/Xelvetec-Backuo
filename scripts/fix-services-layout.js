const fs = require('fs');
const path = require('path');

const filePath = 'components/services-section.tsx';

let content = fs.readFileSync(filePath, 'utf8');

// Replace the old grid with the new structure
const oldGrid = `        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <PricingCard
            titleKey="basic_title"
            descKey="basic_desc"
            featureKeys={["basic_f1", "basic_f2", "basic_f3", "basic_f4", "basic_f5"]}
            priceKey="basic"
            delay={0}
          />
          <PricingCard
            titleKey="business_title"
            descKey="business_desc"
            featureKeys={[
              "business_f1",
              "business_f2",
              "business_f3",
              "business_f4",
              "business_f5",
              "business_f6",
            ]}
            priceKey="business"
            popular
            delay={150}
          />
          <PricingCard
            titleKey="ecommerce_title"
            descKey="ecommerce_desc"
            featureKeys={[
              "ecommerce_f1",
              "ecommerce_f2",
              "ecommerce_f3",
              "ecommerce_f4",
              "ecommerce_f5",
              "ecommerce_f6",
            ]}
            priceKey="ecommerce"
            delay={300}
          />
        </div>

        {/* Individuelle Lösungen – mittig darunter */}
        <div className="flex justify-center mt-10">
          <div className="w-full md:max-w-sm">
            <PricingCard
              titleKey="hourly_title"
              descKey="hourly_desc"
              featureKeys={["hourly_f1", "hourly_f2", "hourly_f3", "hourly_f4", "hourly_f5"]}
              priceKey="hourly"
              delay={450}
            />
          </div>
        </div>`;

const newGrid = `        {/* Top 3 Cards - equal height on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <PricingCard
            titleKey="basic_title"
            descKey="basic_desc"
            featureKeys={["basic_f1", "basic_f2", "basic_f3", "basic_f4", "basic_f5"]}
            priceKey="basic"
            delay={0}
          />
          <PricingCard
            titleKey="business_title"
            descKey="business_desc"
            featureKeys={[
              "business_f1",
              "business_f2",
              "business_f3",
              "business_f4",
              "business_f5",
              "business_f6",
            ]}
            priceKey="business"
            popular
            delay={150}
          />
          <PricingCard
            titleKey="ecommerce_title"
            descKey="ecommerce_desc"
            featureKeys={[
              "ecommerce_f1",
              "ecommerce_f2",
              "ecommerce_f3",
              "ecommerce_f4",
              "ecommerce_f5",
              "ecommerce_f6",
            ]}
            priceKey="ecommerce"
            delay={300}
          />
        </div>

        {/* Individuelle Lösungen – centered below on desktop */}
        <div className="flex justify-center">
          <div className="w-full md:w-96">
            <PricingCard
              titleKey="hourly_title"
              descKey="hourly_desc"
              featureKeys={["hourly_f1", "hourly_f2", "hourly_f3", "hourly_f4", "hourly_f5"]}
              priceKey="hourly"
              delay={450}
            />
          </div>
        </div>`;

content = content.replace(oldGrid, newGrid);

// Also update container max-width for better desktop spacing
content = content.replace('max-w-6xl', 'max-w-7xl');

fs.writeFileSync(filePath, content);
console.log('✅ Services layout fixed successfully!');
