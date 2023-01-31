class LinkUserType < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :user_type, index: true
  end
end
