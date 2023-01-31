class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token

  validates :email, presence: true, uniqueness: true
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  belongs_to :user_type,
    foreign_key: :user_type_id,
    class_name: :UserType
  

  def self.find_by_credentials(email, password)
    user = nil
    user = User.find_by(email: email)

    if user && user.authenticate(password)
      return user
    else
      return nil 
    end
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  private

  def generate_session_token
    while true
      token = SecureRandom::urlsafe_base64(16)
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end


end
