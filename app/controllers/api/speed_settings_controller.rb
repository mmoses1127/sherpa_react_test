class Api::SpeedSettingsController < ApplicationController

  def create
    @speed_setting = SpeedSetting.new(temperate_settings_params)
    if @speed_setting.save!
      render :show
    else
      render json: @speed_setting.errors.full_messages, status: 422
    end
  end

  def update
    @speed_setting = SpeedSetting.find(params[:id])
    if @speed_setting.update(temperate_settings_params)
      render :show
    else
      render json: @speed_setting.errors.full_messages, status: 422
    end
  end

  def destroy
    @speed_setting = SpeedSetting.find(params[:id])
    @speed_setting.destroy
    render :show
  end

  def show
    @speed_setting = SpeedSetting.find(params[:id])
    render :show
  end
  
  def index
    @speed_settings = SpeedSetting.all
    render :index
  end


  private

  def temperate_settings_params
    params.require(:speed_setting).permit(:start_time, :end_time, :speed)
  end

end
