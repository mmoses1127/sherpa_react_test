json.user do
  json.extract! @user, :id, :email, :created_at, :updated_at
  json.user_type do
    json.extract! @user.user_type, :id, :name
  end
end