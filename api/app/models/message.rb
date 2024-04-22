class Message < ApplicationRecord

  validates :textMsg, length: { maximum: 200 }
  validate :schedule_date_cannot_be_in_the_past

  private

  # valida que scheduleDate não seja no passado
  def schedule_date_cannot_be_in_the_past

    if scheduleDate.present? && scheduleDate < 3.hours.ago.utc
      # como nao estou trazendo utc do front-end, teremos que realizar esta conversão
      puts scheduleDate
      puts 3.hours.ago.utc
      errors.add(:errors, "Hora de envio não pode ser no passado")
    end
  end

end