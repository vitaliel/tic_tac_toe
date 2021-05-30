class UsersController < ApplicationController
  before_action :authenticated, only: :me

  def login
    login = user_params[:login]
    password = user_params[:password]

    if login.present? && password.present?
      record = User.where('lower(login) = ?', login.downcase).first

      if record
        user = record.authenticate(password)

        if user
          api_key = ApiKey.for_user(user)
          jsend_success ApiKeyEntity.new(api_key).as_json
        else
          jsend_error 'login or password is incorrect'
        end
      else
        jsend_error 'login or password is incorrect'
      end
    else
      jsend_error 'login and password are required'
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
