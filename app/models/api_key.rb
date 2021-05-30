class ApiKey < ApplicationRecord
  belongs_to :user

  validates_presence_of :token

  def self.for_user(user)
    chars = ('a'..'z').to_a
    token = ''
    32.times do
      token << chars.sample
    end

    create!(user: user, token: token)
  end
end
