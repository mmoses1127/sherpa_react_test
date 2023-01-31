class ChangeTemps < ActiveRecord::Migration[7.0]
  def change
    change_column :temperature_settings, :temperature, :decimal, precision: 3, scale: 1
  end
end
