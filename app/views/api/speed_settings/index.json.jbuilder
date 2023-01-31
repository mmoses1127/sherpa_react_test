@speed_settings.each do |speed_setting|
  json.set! speed_setting.id do
    json.extract! speed_setting, :id, :start_time, :end_time, :speed
  end
end