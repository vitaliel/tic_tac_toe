class ApplicationController < ActionController::Base
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  before_action :load_user_from_token

  protected

  attr_reader :current_user

  def load_user_from_token
    token = request.headers['X-Token']

    if token.present?
      @api_key = ApiKey.where(token: token).first
      logger.info('User token is valid') if @api_key
    end
  end

  def authenticated
    if @api_key.blank?
      jsend_error 'Access denied: need to login'
      return false
    end

    @current_user = @api_key.user
  end

  def jsend_success(data)
    render json: { status: 'success', data: data }
  end

  def jsend_error(msg)
    render json: { status: 'error', message: msg }
  end

  def user_not_authorized(exception)
    policy_name = exception.policy.class.to_s.underscore
    msg = "You cannot perform this action: #{policy_name}.#{exception.query}"

    logger.error("403 - #{msg} #{policy_name} #{exception.query}")

    jsend_error(msg)
  end
end
