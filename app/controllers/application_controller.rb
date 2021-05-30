class ApplicationController < ActionController::Base
  before_action :load_user_from_token
  protected

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
  end

  def jsend_success(data)
    render json: { status: 'success', data: data }
  end

  def jsend_error(msg)
    render json: { status: 'error', message: msg }
  end
end
