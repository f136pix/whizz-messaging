class MessagesController < ApplicationController
  before_action :set_message, only: [:show, :update, :destroy]

  # GET /messages
  def index
    if params[:nextHour] == 'true'
      #now = puts Time.parse(3.hours.ago.utc)
      #      MyModel.where("created_at < ?", 2.days.ago)
      
      @messages = Message.where('"scheduleDate" < ?', 2.hours.ago.utc).order(:scheduleDate)
      #puts Time.parse(@messages.first.scheduleDate.to_s) < Time.parse(3.hours.ago.utc.to_s)
      return render json: @messages

    end
    @messages = Message.all.order(:scheduleDate)
    render json: @messages
  end

  # GET /messages/:id
  def show
    render json: @message
  end

  # POST /messages
  def create
    @message = Message.new(message_params)
    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /messages/:id
  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/:id
  def destroy
    @message.destroy
    head :no_content
  end

  private

  def set_message
    @message = Message.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Mensagem não encontrada' }, status: :not_found
  end

  def message_params
    params.require(:message).permit(:textMsg, :createDate, :scheduleDate, :whatsappNumber)
  end
end