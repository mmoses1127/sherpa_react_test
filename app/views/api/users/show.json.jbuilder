json.extract! @user, :id, :email, :created_at, :updated_at
json.user_type @user.user_type.name
