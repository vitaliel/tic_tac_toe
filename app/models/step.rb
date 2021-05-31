class Step < ApplicationRecord
  belongs_to :game
  belongs_to :player, class_name: 'User', optional: true
  validates_presence_of :position
end
