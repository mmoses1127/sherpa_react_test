class UserType < ApplicationRecord

  has_many :users,
    foreign_key: :user_type_id,
    class_name: :User

end
