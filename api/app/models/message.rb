class Message < ApplicationRecord
 

  validates :textMsg, length: { maximum: 200 }
  validate :schedule_date_cannot_be_in_the_past

  private

  # valida que scheduleDate não seja no passado
  def schedule_date_cannot_be_in_the_past
    if scheduleDate.present? && scheduleDate < Time.now
      errors.add(:errors, "ScheduleTime não pode ser no passado")
    end
  end
  
  
end