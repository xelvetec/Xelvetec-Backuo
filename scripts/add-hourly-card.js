const { readFileSync, writeFileSync } = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../components/services-section.tsx')
let content = readFileSync(filePath, 'utf-8')

const hourlyBlock = `
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
        </div>`

if (content.includes('hourly_title')) {
  console.log('Hourly card already exists, skipping.')
} else {
  const target = `        </div>\n      </div>\n    </section>\n  )\n}`
  const replacement = `        </div>\n${hourlyBlock}\n      </div>\n    </section>\n  )\n}`
  content = content.replace(target, replacement)
  writeFileSync(filePath, content, 'utf-8')
  console.log('Hourly card successfully added!')
}
