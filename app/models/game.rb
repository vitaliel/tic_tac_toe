class Game < ApplicationRecord
  belongs_to :owner, class_name: 'User'
  belongs_to :player, optional: true, class_name: 'User'
  belongs_to :next_player, optional: true, class_name: 'User'
  belongs_to :win_player, optional: true, class_name: 'User'

  has_many :steps, -> { order(:id) }

  enum status: { created: 0, playing: 1, finished: 2 }
end
