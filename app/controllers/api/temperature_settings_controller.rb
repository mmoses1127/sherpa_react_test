class Api::TemperatureSettingsController < ApplicationController

  def create
    @temperature_setting = TemperatureSetting.new(temperate_settings_params)
    if @temperature_setting.save!
      render :show
    else
      render json: @temperature_setting.errors.full_messages, status: 422
    end
  end

  def update
    @temperature_setting = TemperatureSetting.find(params[:id])
    if @temperature_setting.update(temperate_settings_params)
      render :show
    else
      render json: @temperature_setting.errors.full_messages, status: 422
    end
  end

  def destroy
    @temperature_setting = TemperatureSetting.find(params[:id])
    @temperature_setting.destroy
    render :show
  end

  def show
    @temperature_setting = TemperatureSetting.find(params[:id])
    render :show
  end
  
  def index
    @temperature_settings = TemperatureSetting.all
    render :index
  end


  private

  def temperate_settings_params
    params.require(:temperature_setting).permit(:start_time, :end_time, :temperature)
  end

end
