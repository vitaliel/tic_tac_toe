FactoryBot.define do
  factory :game do
    association :owner, factory: :user
  end
end
