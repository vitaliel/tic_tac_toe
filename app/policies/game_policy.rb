class GamePolicy < ApplicationPolicy
  def show?
    record.owner_id == user.id || record.player_id.blank? || record.player_id == user.id
  end

  class Scope < Scope
    def resolve
      scope.where('owner_id = :user_id and (player_id is null or player_id= :user_id)', user_id: user.id)
    end
  end
end
