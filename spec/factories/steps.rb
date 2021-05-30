FactoryBot.define do
  factory :step do
    game
    association :player, factory: :user
    symbol { 'X' }
    position { 1 }
  end
end
