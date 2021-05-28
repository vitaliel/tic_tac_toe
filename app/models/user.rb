class User < ApplicationRecord
  has_secure_password
  validates_uniqueness_of :login, case_sensitive: false
end
