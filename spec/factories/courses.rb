# frozen_string_literal: true

FactoryBot.define do
  factory :course do
    name { "MyString" }
    level { "MyString" }
    description { "MyText" }
    tuition_fee { "9.99" }
    institute { nil }
  end
end
