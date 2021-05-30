class ApiKeyEntity < Grape::Entity
  expose :token
  expose :user, using: UserEntity
end
