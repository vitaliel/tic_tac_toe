class Step < ApplicationRecord
  belongs_to :game
  belongs_to :player, class_name: 'User'
  validates_presence_of :symbol, :position
end
