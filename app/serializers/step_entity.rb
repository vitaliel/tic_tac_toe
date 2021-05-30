class StepEntity < Grape::Entity
  expose :symbol, :position
  expose :player, using: UserEntity
end
