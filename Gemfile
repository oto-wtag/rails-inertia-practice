source "https://rubygems.org"

gem "authentication-zero"
gem "bcrypt", "~> 3.1.7"
gem "bootsnap", require: false
gem "inertia_rails", "~> 3.9"
gem "jbuilder"
gem "js-routes"
gem "kamal", require: false, group: [:development, :deploy]
gem "pagy", "~> 9.1"
gem "pg", "~> 1.6"
gem "propshaft"
gem "puma", ">= 5.0"
gem "ransack", "~> 4.3"
gem "rails", "~> 8.0.2"
gem "solid_cable"
gem "solid_cache"
gem "solid_queue"
gem "thruster", require: false
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "vite_rails", "~> 3.0"

group :development, :test do
  gem "brakeman", require: false
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "factory_bot_rails"
  gem "rspec-rails", "~> 8.0"
  gem "rubocop-rails-omakase", require: false
end

group :development do
  gem "letter_opener"
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
