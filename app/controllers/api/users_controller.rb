module Api
  class UsersController < ApplicationController
    before_action :authenticated, only: :me

    def login
      result = LoginService.new.call(user_params)

      if result.success?
        jsend_success ApiKeyEntity.new(result.value!).as_json
      else
        jsend_error result.failure
      end
    end

    def me
      jsend_success ApiKeyEntity.new(@api_key).as_json
    end

    private

    def user_params
      params.require(:user).permit(:login, :password)
    end
  end
end
