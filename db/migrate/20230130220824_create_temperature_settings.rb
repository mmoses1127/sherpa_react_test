class CreateTemperatureSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :temperature_settings do |t|
      t.time :start_time, null: false
      t.time :end_time, null: false
      t.integer :temperature, null: false
      t.timestamps
    end
  end
end
