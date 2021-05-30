class GameEntity < Grape::Entity
  expose :id, :status
  expose :owner, using: UserEntity
  expose :player, using: UserEntity
  expose :next_player, using: UserEntity
  expose :win_player, using: UserEntity
  expose :steps, using: StepEntity
end
