@temperature_settings.each do |temperature_setting|
  json.set! temperature_setting.id do
    json.extract! temperature_setting, :id, :start_time, :end_time, :temperature
  end
end