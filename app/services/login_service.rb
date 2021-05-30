require "dry/transaction"

class LoginService
  include Dry::Transaction

  step :validate
  step :find_user
  step :authenticate

  private

  def validate(input)
    login = input[:login]
    password = input[:password]

    if login.present? && password.present?
      Success(input)
    else
      Failure('login and password are required')
    end
  end

  def find_user(input)
    record = User.where('lower(login) = ?', input[:login].downcase).first

    if record
      Success(input.merge(record: record))
    else
      Failure('login or password is incorrect')
    end
  end

  def authenticate(input)
    user = input[:record].authenticate(input[:password])

    if user
      api_key = ApiKey.for_user(user)
      Success(api_key)
    else
      Failure('login or password is incorrect')
    end
  end
end
