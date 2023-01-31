class TemperatureSetting < ApplicationRecord

  validates :temperature, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :start_time, :end_time, presence: true 


  # Custom validation to ensure that the start_time and end_time do not overlap with another temperature setting:

  # validate :cannot_overlap

  # def cannot_overlap
  #   if TemperatureSetting.where.not(id: id).where(start_time: start_time..end_time).or(TemperatureSetting.where.not(id: id).where(end_time: start_time..end_time)).exists?
  #     errors.add(:start_time, "Cannot overlap with another temperature setting")
  #   end
  # end

end
