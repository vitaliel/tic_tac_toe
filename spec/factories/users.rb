FactoryBot.define do
  sequence :login do |n|
    "alice-#{n}"
  end

  factory :user do
    login { generate(:login) }
    password { '123' }
  end
end
